-- Invoice To Recipe System - Database Schema v2 (Recipes & Changelog)
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    selling_price NUMERIC(10, 2) NOT NULL,
    target_margin NUMERIC(5, 2) NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_name TEXT NOT NULL, -- using name as a loosely coupled id for MVP
    quantity TEXT,
    cost_override NUMERIC(10, 2) -- manual cost or fetched cost
);

CREATE TABLE IF NOT EXISTS changelog_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipe_slug TEXT NOT NULL,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    action TEXT NOT NULL,
    description TEXT NOT NULL,
    before_state TEXT,
    after_state TEXT
);
