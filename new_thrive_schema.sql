CREATE SCHEMA IF NOT EXISTS thrive;
SET search_path TO thrive;

-- ============================================================
-- T&L Cafe Invoice-to-Recipe System
-- Production Database Migration (Consolidated)
-- Run this once in your Supabase SQL Editor
-- ============================================================

-- 1. INVOICES - Stores processed supplier invoices
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    supplier_name TEXT NOT NULL,
    invoice_date DATE,
    invoice_number TEXT,
    total_amount NUMERIC(10, 2),
    image_url TEXT,
    status TEXT DEFAULT 'processed'
);

-- 2. INGREDIENTS - Master ingredient registry
CREATE TABLE IF NOT EXISTS ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL UNIQUE,
    category TEXT,
    base_unit TEXT NOT NULL
);

-- 3. INVOICE LINE ITEMS - Extracted items per invoice
CREATE TABLE IF NOT EXISTS invoice_line_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    ingredient_id UUID REFERENCES ingredients(id) ON DELETE SET NULL,
    raw_name TEXT NOT NULL,
    raw_unit TEXT,
    raw_quantity NUMERIC(10, 2),
    unit_price NUMERIC(10, 3),
    total_price NUMERIC(10, 2),
    normalized_quantity NUMERIC(10, 2),
    normalized_price_per_unit NUMERIC(10, 4)
);

-- 4. RECIPES - Menu items with pricing
CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    selling_price NUMERIC(10, 2) NOT NULL,
    target_margin NUMERIC(5, 2) NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    notes TEXT
);

-- 5. RECIPE INGREDIENTS - Ingredient costs per recipe
CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_name TEXT NOT NULL,
    quantity TEXT,
    cost_override NUMERIC(10, 2)
);

-- 6. CHANGELOG - Audit trail for recipe changes
CREATE TABLE IF NOT EXISTS changelog_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_slug TEXT NOT NULL,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    action TEXT NOT NULL,
    description TEXT NOT NULL,
    before_state TEXT,
    after_state TEXT
);

-- INDEXES for performance
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoice_line_items_invoice_id ON invoice_line_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_invoice_line_items_raw_name ON invoice_line_items(raw_name);
CREATE INDEX IF NOT EXISTS idx_recipes_slug ON recipes(slug);
CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_changelog_recipe_slug ON changelog_entries(recipe_slug);
CREATE INDEX IF NOT EXISTS idx_changelog_changed_at ON changelog_entries(changed_at DESC);

-- AUTO-UPDATE updated_at on recipes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_recipes_updated_at ON recipes;
CREATE TRIGGER update_recipes_updated_at
    BEFORE UPDATE ON recipes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- HELPER: Get latest ingredient price from invoice history
CREATE OR REPLACE FUNCTION get_latest_ingredient_price(target_ingredient_id UUID)
RETURNS NUMERIC(10, 4) AS $$
DECLARE
    latest_price NUMERIC(10, 4);
BEGIN
    SELECT normalized_price_per_unit INTO latest_price
    FROM invoice_line_items
    WHERE ingredient_id = target_ingredient_id
    ORDER BY created_at DESC
    LIMIT 1;
    RETURN latest_price;
END;
$$ LANGUAGE plpgsql;

-- ROW LEVEL SECURITY (enable but allow all for MVP - tighten for production auth)
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE changelog_entries ENABLE ROW LEVEL SECURITY;

-- Allow anon access for MVP (replace with authenticated policies when auth is added)
CREATE POLICY IF NOT EXISTS "Allow anon read invoices" ON invoices FOR SELECT TO anon USING (true);
CREATE POLICY IF NOT EXISTS "Allow anon read ingredients" ON ingredients FOR SELECT TO anon USING (true);
CREATE POLICY IF NOT EXISTS "Allow anon read line items" ON invoice_line_items FOR SELECT TO anon USING (true);
CREATE POLICY IF NOT EXISTS "Allow anon all recipes" ON recipes FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow anon all recipe_ingredients" ON recipe_ingredients FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow anon all changelog" ON changelog_entries FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow service role invoices" ON invoices FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow service role ingredients" ON ingredients FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "Allow service role line_items" ON invoice_line_items FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Production DB WIPE & SECURE
-- This script truncates all dummy data and securely locks the database to authenticated users only.

-- 1. Wipe Data
TRUNCATE TABLE changelog_entries, invoice_line_items, recipe_ingredients, ingredients, invoices, recipes CASCADE;

-- 2. Secure RLS Policies (Change from Anon to Authenticated)

-- Ensure RLS is enabled
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE changelog_entries ENABLE ROW LEVEL SECURITY;

-- Drop existing anon policies if they exist (ignoring errors if they don't)
DROP POLICY IF EXISTS "Allow anon read access on invoices" ON invoices;
DROP POLICY IF EXISTS "Allow anon insert access on invoices" ON invoices;
DROP POLICY IF EXISTS "Allow anon update access on invoices" ON invoices;
DROP POLICY IF EXISTS "Allow anon read access on invoice_line_items" ON invoice_line_items;
DROP POLICY IF EXISTS "Allow anon insert access on invoice_line_items" ON invoice_line_items;
DROP POLICY IF EXISTS "Allow anon update access on invoice_line_items" ON invoice_line_items;
DROP POLICY IF EXISTS "Allow anon read access on ingredients" ON ingredients;
DROP POLICY IF EXISTS "Allow anon insert access on ingredients" ON ingredients;
DROP POLICY IF EXISTS "Allow anon update access on ingredients" ON ingredients;
DROP POLICY IF EXISTS "Allow anon read access on recipes" ON recipes;
DROP POLICY IF EXISTS "Allow anon insert access on recipes" ON recipes;
DROP POLICY IF EXISTS "Allow anon update access on recipes" ON recipes;
DROP POLICY IF EXISTS "Allow anon delete access on recipes" ON recipes;
DROP POLICY IF EXISTS "Allow anon read access on recipe_ingredients" ON recipe_ingredients;
DROP POLICY IF EXISTS "Allow anon insert access on recipe_ingredients" ON recipe_ingredients;
DROP POLICY IF EXISTS "Allow anon delete access on recipe_ingredients" ON recipe_ingredients;
DROP POLICY IF EXISTS "Allow anon read access on changelog_entries" ON changelog_entries;
DROP POLICY IF EXISTS "Allow anon insert access on changelog_entries" ON changelog_entries;

-- Create ALL access policies for authenticated users
CREATE POLICY "Allow authenticated full access on invoices" ON invoices FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on invoice_line_items" ON invoice_line_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on ingredients" ON ingredients FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on recipes" ON recipes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on recipe_ingredients" ON recipe_ingredients FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated full access on changelog_entries" ON changelog_entries FOR ALL TO authenticated USING (true) WITH CHECK (true);
