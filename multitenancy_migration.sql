-- ============================================================
-- ProfitPulse Multi-Tenancy Migration
-- Run in Supabase SQL Editor (thrive schema)
-- PREREQUISITE: Existing T&L Cafe data must be preserved.
--   This script will:
--   1. Create organizations + organization_members tables
--   2. Add organization_id to all data tables
--   3. Seed T&L Cafe as Org #1 and assign all existing rows to it
--   4. Drop old blanket RLS policies
--   5. Implement tenant-isolated RLS policies
-- ============================================================

SET search_path TO thrive;

-- ============================================================
-- PART 1: TENANT REGISTRY
-- ============================================================

-- Organizations: one row per FnB business tenant
CREATE TABLE IF NOT EXISTS organizations (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW(),
    name        TEXT NOT NULL,               -- Display name: "T&L Cafe"
    slug        TEXT NOT NULL UNIQUE,        -- URL-safe: "tl-cafe"
    plan        TEXT NOT NULL DEFAULT 'trial', -- 'trial' | 'starter' | 'pro'
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    owner_id    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    -- Optional metadata
    business_type   TEXT,                    -- 'cafe' | 'restaurant' | 'cloud_kitchen' | 'bakery'
    outlet_count    INT DEFAULT 1,
    contact_email   TEXT,
    contact_phone   TEXT
);

-- Members: maps Supabase auth users to organizations + their role
CREATE TABLE IF NOT EXISTS organization_members (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role            TEXT NOT NULL DEFAULT 'member', -- 'owner' | 'admin' | 'member'
    joined_at       TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

-- Indexes for member lookups (hot path on every request)
CREATE INDEX IF NOT EXISTS idx_org_members_user_id
    ON organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org_id
    ON organization_members(organization_id);

-- Auto-update updated_at on organizations
DROP TRIGGER IF EXISTS update_organizations_updated_at ON organizations;
CREATE TRIGGER update_organizations_updated_at
    BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- PART 2: ADD organization_id TO ALL DATA TABLES
-- ============================================================

-- invoices
ALTER TABLE invoices
    ADD COLUMN IF NOT EXISTS organization_id UUID
        REFERENCES organizations(id) ON DELETE CASCADE;

-- ingredients
ALTER TABLE ingredients
    ADD COLUMN IF NOT EXISTS organization_id UUID
        REFERENCES organizations(id) ON DELETE CASCADE;

-- invoice_line_items (inherits via invoice, but also stamped for RLS efficiency)
ALTER TABLE invoice_line_items
    ADD COLUMN IF NOT EXISTS organization_id UUID
        REFERENCES organizations(id) ON DELETE CASCADE;

-- recipes
ALTER TABLE recipes
    ADD COLUMN IF NOT EXISTS organization_id UUID
        REFERENCES organizations(id) ON DELETE CASCADE;

-- recipe_ingredients (inherits via recipe, also stamped)
ALTER TABLE recipe_ingredients
    ADD COLUMN IF NOT EXISTS organization_id UUID
        REFERENCES organizations(id) ON DELETE CASCADE;

-- changelog_entries
ALTER TABLE changelog_entries
    ADD COLUMN IF NOT EXISTS organization_id UUID
        REFERENCES organizations(id) ON DELETE CASCADE;

-- ============================================================
-- PART 3: SEED T&L CAFE AS ORG #1 + ASSIGN EXISTING DATA
-- ============================================================

-- Create T&L Cafe organization
-- NOTE: owner_id will be set to the admin user UUID after creation
-- Run: SELECT id FROM auth.users WHERE email = 'admin@tlcafe.com';
-- Then: UPDATE thrive.organizations SET owner_id = '<uuid>' WHERE slug = 'tl-cafe';
INSERT INTO organizations (name, slug, plan, business_type, outlet_count)
VALUES ('T&L Cafe', 'tl-cafe', 'pro', 'cafe', 1)
ON CONFLICT (slug) DO NOTHING;

-- Assign all existing rows (orphaned pre-migration data) to T&L Cafe
-- Safe to run multiple times due to WHERE clause
UPDATE invoices
SET organization_id = (SELECT id FROM organizations WHERE slug = 'tl-cafe')
WHERE organization_id IS NULL;

UPDATE ingredients
SET organization_id = (SELECT id FROM organizations WHERE slug = 'tl-cafe')
WHERE organization_id IS NULL;

UPDATE invoice_line_items
SET organization_id = (SELECT id FROM organizations WHERE slug = 'tl-cafe')
WHERE organization_id IS NULL;

UPDATE recipes
SET organization_id = (SELECT id FROM organizations WHERE slug = 'tl-cafe')
WHERE organization_id IS NULL;

UPDATE recipe_ingredients
SET organization_id = (SELECT id FROM organizations WHERE slug = 'tl-cafe')
WHERE organization_id IS NULL;

UPDATE changelog_entries
SET organization_id = (SELECT id FROM organizations WHERE slug = 'tl-cafe')
WHERE organization_id IS NULL;

-- Now add NOT NULL constraint (all rows are populated above)
-- Run these AFTER the UPDATE statements confirm 0 NULL rows remain
-- ALTER TABLE invoices ALTER COLUMN organization_id SET NOT NULL;
-- ALTER TABLE ingredients ALTER COLUMN organization_id SET NOT NULL;
-- ALTER TABLE invoice_line_items ALTER COLUMN organization_id SET NOT NULL;
-- ALTER TABLE recipes ALTER COLUMN organization_id SET NOT NULL;
-- ALTER TABLE recipe_ingredients ALTER COLUMN organization_id SET NOT NULL;
-- ALTER TABLE changelog_entries ALTER COLUMN organization_id SET NOT NULL;

-- ============================================================
-- PART 4: ADD PERFORMANCE INDEXES (critical at 100 tenants)
-- AND FIX UNIQUE CONSTRAINTS FOR MULTI-TENANCY
-- ============================================================

-- FIX: ingredients.name was UNIQUE globally (single-tenant).
-- Each org must be able to have their own "Salt", "Butter", etc.
-- Drop the old global unique constraint and replace with a composite one.
ALTER TABLE ingredients DROP CONSTRAINT IF EXISTS ingredients_name_key;
CREATE UNIQUE INDEX IF NOT EXISTS uq_ingredients_org_name
    ON ingredients(organization_id, name);

-- FIX: recipes.name and recipes.slug were globally UNIQUE.
-- Each org must be able to have their own "Avocado Toast" recipe.
ALTER TABLE recipes DROP CONSTRAINT IF EXISTS recipes_name_key;
ALTER TABLE recipes DROP CONSTRAINT IF EXISTS recipes_slug_key;
CREATE UNIQUE INDEX IF NOT EXISTS uq_recipes_org_name
    ON recipes(organization_id, name);
CREATE UNIQUE INDEX IF NOT EXISTS uq_recipes_org_slug
    ON recipes(organization_id, slug);

CREATE INDEX IF NOT EXISTS idx_invoices_org_id
    ON invoices(organization_id);
CREATE INDEX IF NOT EXISTS idx_ingredients_org_id
    ON ingredients(organization_id);
CREATE INDEX IF NOT EXISTS idx_invoice_line_items_org_id
    ON invoice_line_items(organization_id);
CREATE INDEX IF NOT EXISTS idx_recipes_org_id
    ON recipes(organization_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_org_id
    ON recipe_ingredients(organization_id);
CREATE INDEX IF NOT EXISTS idx_changelog_org_id
    ON changelog_entries(organization_id);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_invoices_org_created
    ON invoices(organization_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recipes_org_category
    ON recipes(organization_id, category);

-- ============================================================
-- PART 5: RLS HELPER FUNCTION
-- ============================================================

-- Returns the set of organization_ids the current auth user belongs to.
-- SECURITY DEFINER: runs as the function owner, bypasses RLS on org_members.
-- STABLE: cached within a single transaction for performance.
CREATE OR REPLACE FUNCTION get_user_org_ids()
RETURNS SETOF UUID AS $$
    SELECT organization_id
    FROM organization_members
    WHERE user_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ============================================================
-- PART 6: DROP OLD BLANKET POLICIES + APPLY TENANT-ISOLATED RLS
-- ============================================================

-- Drop existing blanket authenticated policies
DROP POLICY IF EXISTS "Allow authenticated full access on invoices" ON invoices;
DROP POLICY IF EXISTS "Allow authenticated full access on invoice_line_items" ON invoice_line_items;
DROP POLICY IF EXISTS "Allow authenticated full access on ingredients" ON ingredients;
DROP POLICY IF EXISTS "Allow authenticated full access on recipes" ON recipes;
DROP POLICY IF EXISTS "Allow authenticated full access on recipe_ingredients" ON recipe_ingredients;
DROP POLICY IF EXISTS "Allow authenticated full access on changelog_entries" ON changelog_entries;

-- Drop old anon policies if lingering
DROP POLICY IF EXISTS "Allow anon read invoices" ON invoices;
DROP POLICY IF EXISTS "Allow anon read ingredients" ON ingredients;
DROP POLICY IF EXISTS "Allow anon read line items" ON invoice_line_items;
DROP POLICY IF EXISTS "Allow anon all recipes" ON recipes;
DROP POLICY IF EXISTS "Allow anon all recipe_ingredients" ON recipe_ingredients;
DROP POLICY IF EXISTS "Allow anon all changelog" ON changelog_entries;

-- INVOICES: tenant-isolated
CREATE POLICY "Tenant isolated invoices"
    ON invoices FOR ALL TO authenticated
    USING (organization_id IN (SELECT get_user_org_ids()))
    WITH CHECK (organization_id IN (SELECT get_user_org_ids()));

-- INGREDIENTS: tenant-isolated
CREATE POLICY "Tenant isolated ingredients"
    ON ingredients FOR ALL TO authenticated
    USING (organization_id IN (SELECT get_user_org_ids()))
    WITH CHECK (organization_id IN (SELECT get_user_org_ids()));

-- INVOICE LINE ITEMS: tenant-isolated
CREATE POLICY "Tenant isolated invoice line items"
    ON invoice_line_items FOR ALL TO authenticated
    USING (organization_id IN (SELECT get_user_org_ids()))
    WITH CHECK (organization_id IN (SELECT get_user_org_ids()));

-- RECIPES: tenant-isolated
CREATE POLICY "Tenant isolated recipes"
    ON recipes FOR ALL TO authenticated
    USING (organization_id IN (SELECT get_user_org_ids()))
    WITH CHECK (organization_id IN (SELECT get_user_org_ids()));

-- RECIPE INGREDIENTS: tenant-isolated
CREATE POLICY "Tenant isolated recipe ingredients"
    ON recipe_ingredients FOR ALL TO authenticated
    USING (organization_id IN (SELECT get_user_org_ids()))
    WITH CHECK (organization_id IN (SELECT get_user_org_ids()));

-- CHANGELOG: tenant-isolated
CREATE POLICY "Tenant isolated changelog"
    ON changelog_entries FOR ALL TO authenticated
    USING (organization_id IN (SELECT get_user_org_ids()))
    WITH CHECK (organization_id IN (SELECT get_user_org_ids()));

-- ORGANIZATIONS: users can only see orgs they are members of
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members can view their org"
    ON organizations FOR SELECT TO authenticated
    USING (id IN (SELECT get_user_org_ids()));

-- ORGANIZATION MEMBERS: users can only see members in their own orgs
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "See members in same org"
    ON organization_members FOR SELECT TO authenticated
    USING (organization_id IN (SELECT get_user_org_ids()));

-- Service role keeps unrestricted access (used by API routes)
CREATE POLICY IF NOT EXISTS "Service role full access on organizations"
    ON organizations FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Service role full access on org members"
    ON organization_members FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================================
-- VERIFICATION QUERIES (run after migration to confirm)
-- ============================================================
-- SELECT COUNT(*) FROM invoices WHERE organization_id IS NULL;          -- should be 0
-- SELECT COUNT(*) FROM recipes WHERE organization_id IS NULL;           -- should be 0
-- SELECT COUNT(*) FROM ingredients WHERE organization_id IS NULL;       -- should be 0
-- SELECT * FROM organizations;                                          -- should show T&L Cafe
-- SELECT * FROM organization_members;                                   -- should show admin user linked
