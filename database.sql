-- Invoice To Recipe System - Database Schema
-- Run this in your Supabase SQL Editor

-- Table to store processed invoices
CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    supplier_name TEXT NOT NULL,
    invoice_date DATE,
    invoice_number TEXT,
    total_amount NUMERIC(10, 2),
    image_url TEXT,
    status TEXT DEFAULT 'processed' -- e.g., 'pending', 'processed', 'error'
);

-- Table to store all unique ingredients base data
CREATE TABLE IF NOT EXISTS ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL UNIQUE,
    category TEXT, -- e.g., 'produce', 'meat', 'dairy', 'dry goods'
    base_unit TEXT NOT NULL -- The normalized unit for recipes (e.g., 'gram', 'ml', 'piece')
);

-- Table connecting an invoice to its extracted line items
CREATE TABLE IF NOT EXISTS invoice_line_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    ingredient_id UUID REFERENCES ingredients(id) ON DELETE SET NULL,
    
    raw_name TEXT NOT NULL, -- The original name printed on the invoice
    raw_unit TEXT, -- E.g., 'box', 'crate', 'kg'
    raw_quantity NUMERIC(10, 2),
    unit_price NUMERIC(10, 3), -- Price per raw unit from this invoice
    total_price NUMERIC(10, 2),
    
    -- Normalized data mapped to base unit for recipe calculations
    normalized_quantity NUMERIC(10, 2),
    normalized_price_per_unit NUMERIC(10, 4) -- Cost per base_unit (e.g., cost per gram)
);

-- Function to get the latest price for an ingredient
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
