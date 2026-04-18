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
