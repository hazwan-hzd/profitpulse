# T&L Cafe Invoice Intelligence - User Guide

## Welcome

This system helps T&L Bakery Cafe track ingredient costs, analyze recipe profitability, and make smarter pricing decisions using your actual supplier invoices.

---

## Getting Started

### Login
Open the app at your deployment URL. No login is required for the current version.

### Navigation
Use the sidebar on the left to access these sections:

| Section | What It Does |
|---------|-------------|
| **Dashboard** | Overview of all recipes, average margins, and overhead settings |
| **Invoice Upload** | Upload supplier invoices for AI processing |
| **Invoice History** | Review all past invoices with line item details |
| **Recipes & Costing** | View, search, sort, and export your recipe catalog |
| **Price Monitor** | Track ingredient price trends over time |

---

## Key Workflows

### 1. Upload a Supplier Invoice
1. Go to **Invoice Upload** from the sidebar
2. Click the upload area or drag-and-drop your invoice image (JPG, PNG, or PDF)
3. The AI will extract supplier name, invoice date, and all line items automatically
4. Review the extracted data and confirm

### 2. View Recipe Profitability
1. Go to **Recipes & Costing**
2. Each recipe card shows the selling price, ingredient cost breakdown, and margin status
3. Green badge = healthy margin, Red badge = below target
4. Use the search bar to find specific recipes or ingredients
5. Use sort controls to rank by name, margin, cost, or price

### 3. Add a New Recipe
1. Go to **Recipes & Costing** and click the purple **+ Add Recipe** button
2. Fill in: Recipe Name, Category, Selling Price, Target Margin (%)
3. Add ingredients one by one with name, quantity, and cost
4. The **Cost Preview** section shows your real-time margin calculation
5. If your margin is below target, a warning will suggest a better price
6. Click **Save Recipe** when done

### 4. Edit an Existing Recipe
1. Click on any recipe card to open its detail page
2. Click **Edit** on the Ingredients panel to modify costs
3. Click the pencil icon next to the selling price to update it
4. Use the **What-If Pricing** simulator to test different margin targets
5. Click **Apply** to save the simulated price

### 5. Export Data
- On the **Recipes & Costing** page, click **Export CSV** to download a profitability report
- On the **Invoice History** page, click **Export CSV** to download invoice records
- Share these with your accountant (Diana) for monthly reporting

### 6. Configure Overhead
1. Go to **Dashboard**
2. Scroll to the overhead configuration section
3. Adjust the overhead percentage (rent, utilities, gas, labor)
4. This affects all margin calculations across the system

---

## Understanding Margins

| Term | Meaning |
|------|---------|
| **Ingredient Cost** | Total cost of all ingredients in one serving |
| **Overhead** | Operating costs (rent, gas, utilities) as a % added to ingredient cost |
| **True Cost** | Ingredient Cost + Overhead |
| **Net Margin** | (Selling Price - True Cost) / Selling Price x 100 |
| **Target Margin** | Your ideal margin goal (default: 65%) |
| **Healthy** | Actual margin >= Target margin |
| **Watch** | Actual margin < Target margin |

### Margin Health Colors
- 🟢 **Green** = Healthy (margin meets or exceeds target)
- 🔴 **Red** = Watch (margin below target - consider raising price or reducing cost)

---

## Tips for Best Results

1. **Upload invoices regularly** - weekly is ideal for accurate cost tracking
2. **Check the Price Monitor** after each upload to spot price increases early
3. **Use the What-If simulator** before changing menu prices
4. **Export CSV monthly** for accounting and tax purposes
5. **Review the "Below Target" count** on the Dashboard to catch underperforming items

---

## Need Help?

Contact Neuramerge Sdn Bhd for support:
- System support and training
- Custom feature requests
- Data migration assistance
