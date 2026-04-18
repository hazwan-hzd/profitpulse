-- Migration: Validation Layer Additions
-- Run this in the Supabase SQL Editor

-- 1. Add status columns to invoice_line_items
-- Possible statuses: 'verified', 'flagged_anomaly'
ALTER TABLE "thrive"."invoice_line_items" 
ADD COLUMN IF NOT EXISTS "status" text DEFAULT 'verified',
ADD COLUMN IF NOT EXISTS "anomaly_reason" text;

-- 2. Add status columns to recipes
-- Possible statuses: 'active', 'flagged_anomaly'
ALTER TABLE "thrive"."recipes" 
ADD COLUMN IF NOT EXISTS "status" text DEFAULT 'active',
ADD COLUMN IF NOT EXISTS "anomaly_reason" text;

-- 3. Create historical index for fast rolling average lookups
-- Useful for Price Anomaly Detection
CREATE INDEX IF NOT EXISTS "idx_invoice_line_items_ingredient"
ON "thrive"."invoice_line_items" (ingredient_id, created_at DESC)
WHERE status = 'verified';

-- Verify schema changes
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'thrive' 
AND table_name IN ('invoice_line_items', 'recipes') 
AND column_name IN ('status', 'anomaly_reason');
