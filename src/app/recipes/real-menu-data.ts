// AUTO-GENERATED from tl-fp-recipes-full.json + proxy resolution
// Generated: 2026-04-17T19:27:00+08:00
// Total recipes: 190

import { Recipe } from "./recipe-data";

export interface RealIngredient {
  name: string;
  cost: number;
  quantity?: string;
  source: "Invoice" | "HoReCa Proxy" | "B2B Proxy" | "Catering Proxy" | "Wholesale Proxy" | "Knorr Proxy" | "Supplier Proxy" | "Google Proxy" | "OEM Proxy" | "Invoice Proxy" | "Missing";
}

export interface RealRecipe extends Omit<Recipe, "ingredients"> {
  ingredients: RealIngredient[];
}

export const REAL_MENU_DATA: RealRecipe[] = [
  {
    "name": "NASI AYAM PENYET",
    "slug": "nasi-ayam-penyet",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "SUP KOSONG",
        "cost": 0.2991,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "NASI PUTIH",
        "cost": 0.4308,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "Tempe",
        "cost": 0.375,
        "quantity": "0.25pkt",
        "source": "Invoice"
      },
      {
        "name": "AYAM PENYET FROZEN 1 PCS",
        "cost": 5.0,
        "quantity": "1#N/A",
        "source": "Supplier Proxy"
      },
      {
        "name": "Kobis Bulat 1kg",
        "cost": 0.02,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Timun Jepun 500 g",
        "cost": 0.1,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Tauhu keras 1pcs",
        "cost": 0.0,
        "quantity": "10s",
        "source": "Invoice"
      },
      {
        "name": "SAMBAL AYAM PENYET 2KG",
        "cost": 0.75,
        "quantity": "50#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.6912,
        "quantity": "100g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "NASI AYAM PENYET (NEW RECIPE)",
    "slug": "nasi-ayam-penyet-new-recipe",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "SUP KOSONG",
        "cost": 0.2991,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "NASI PUTIH",
        "cost": 0.4308,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "Tempe",
        "cost": 0.375,
        "quantity": "0.25pkt",
        "source": "Invoice"
      },
      {
        "name": "AYAM PENYET FROZEN 1 PCS (NEW RECIPE)",
        "cost": 5.0,
        "quantity": "1#N/A",
        "source": "Supplier Proxy"
      },
      {
        "name": "Kobis Bulat 1kg",
        "cost": 0.02,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Timun Jepun 500 g",
        "cost": 0.1,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Tauhu keras 1pcs",
        "cost": 0.0,
        "quantity": "10s",
        "source": "Invoice"
      },
      {
        "name": "SAMBAL AYAM PENYET 2KG",
        "cost": 0.75,
        "quantity": "50#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.6912,
        "quantity": "100g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "FRIED CHICKEN CREAMY BUTTER FETTUCINE",
    "slug": "fried-chicken-creamy-butter-fettucine",
    "sellingPrice": 19,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "BREADED CHICKEN",
        "cost": 2.7707,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "CREAMY BUTTER SAUCE",
        "cost": 5.0,
        "quantity": "200#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "Anchor Unsalted Butter 5 kg",
        "cost": 0.23,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Daun Kari 1 kg",
        "cost": 0.0105,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Cili Padi Merah 1 kg",
        "cost": 0.045,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.1425,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Prego Fettucine 500 g",
        "cost": 1.98,
        "quantity": "180g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CREAMY BUTTER CHICKEN WITH RICE",
    "slug": "creamy-butter-chicken-with-rice",
    "sellingPrice": 20,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "BREADED CHICKEN",
        "cost": 2.7707,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "NASI PUTIH",
        "cost": 0.4308,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "CREAMY BUTTER SAUCE",
        "cost": 5.0,
        "quantity": "200#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "Romaine lettuce",
        "cost": 0.009,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Cili Padi Merah 1 kg",
        "cost": 0.015,
        "quantity": "1g",
        "source": "Invoice"
      },
      {
        "name": "Daun Kari 1 kg",
        "cost": 0.007,
        "quantity": "2g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HONEY GLAZED CHICKEN CHOP - BLACKPEPPER SAUCE",
    "slug": "honey-glazed-chicken-chop-blackpepper-sauce",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "COLESLAW",
        "cost": 1.1121,
        "quantity": "150gram",
        "source": "Invoice"
      },
      {
        "name": "FROZEN HONEY GLAZED CHICKEN CHOP 30PCS",
        "cost": 5.5,
        "quantity": "1#N/A",
        "source": "Supplier Proxy"
      },
      {
        "name": "Romaine lettuce",
        "cost": 0.09,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "CREAMY BLACKPEPPER SAUCE 9KG",
        "cost": 1.35,
        "quantity": "90#N/A",
        "source": "B2B Proxy"
      },
      {
        "name": "C&G Crincle Fries 1 kg",
        "cost": 0.9828,
        "quantity": "120g",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.3456,
        "quantity": "50g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "FISH & CHIPS",
    "slug": "fish-and-chips",
    "sellingPrice": 30,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "SALAD DRESSING",
        "cost": 0.2795,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "DORY FILLET",
        "cost": 7.6059,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "TARTAR SAUCE 1KG",
        "cost": 0.3,
        "quantity": "20#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "Mesclune Mix",
        "cost": 1.35,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "C&G Crincle Fries 1 kg",
        "cost": 0.9828,
        "quantity": "120g",
        "source": "Invoice"
      },
      {
        "name": "lemon 1 nos",
        "cost": 1.0,
        "quantity": "0.5pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BEEF LASAGNA",
    "slug": "beef-lasagna",
    "sellingPrice": 60,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "Minced Beef 2.5 kg",
        "cost": 2.147,
        "quantity": "71g",
        "source": "Invoice"
      },
      {
        "name": "Carrot 3 kg",
        "cost": 0.0044,
        "quantity": "1g",
        "source": "Invoice"
      },
      {
        "name": "Celery 1 kg",
        "cost": 0.232,
        "quantity": "29g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Besar Merah 1 kg",
        "cost": 0.006,
        "quantity": "1g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0229,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Kasar Gula Pasir 1 kg",
        "cost": 0.0037,
        "quantity": "1g",
        "source": "Invoice"
      },
      {
        "name": "Knorr Chicken Stock 1 kg",
        "cost": 0.025,
        "quantity": "1g",
        "source": "Invoice"
      },
      {
        "name": "Gud Bay Leaf 500g",
        "cost": 0.0055,
        "quantity": "0.1g",
        "source": "Invoice"
      },
      {
        "name": "Tepung Gandum Cap Sauh 1 kg",
        "cost": 0.049,
        "quantity": "14g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Unsalted Butter 5 kg",
        "cost": 0.644,
        "quantity": "14g",
        "source": "Invoice"
      },
      {
        "name": "Eagle Kasar Serbuk Lada Hitam 250 g",
        "cost": 0.012,
        "quantity": "0.1g",
        "source": "Invoice"
      },
      {
        "name": "Lasagna sheet 250g",
        "cost": 7.5,
        "quantity": "1pkt",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "NORWEGIAN GRILLED SALMON WITH CREAMY SAUCE",
    "slug": "norwegian-grilled-salmon-with-creamy-sauce",
    "sellingPrice": 45,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "MASH POTATO",
        "cost": 1.2302,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "200gm norwegian salmon steak cut 1 pkt",
        "cost": 15.9,
        "quantity": "200.0g [AUTO-FIXED]",
        "source": "Invoice"
      },
      {
        "name": "CREAMY SAUCE",
        "cost": 2.25,
        "quantity": "90#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "Carrot 3 kg",
        "cost": 0.0132,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Cauliflower",
        "cost": 0.1,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Broccoli",
        "cost": 0.4,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "lemon 1 nos",
        "cost": 1.0,
        "quantity": "0.5pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "FRIED CHICKEN SALTED EGG BUTTER SPAGHETTI",
    "slug": "fried-chicken-salted-egg-butter-spaghetti",
    "sellingPrice": 20,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "BREADED CHICKEN",
        "cost": 2.7707,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "CREAMY BUTTER SAUCE",
        "cost": 5.0,
        "quantity": "200#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "Anchor Unsalted Butter 5 kg",
        "cost": 0.23,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Daun Kari 1 kg",
        "cost": 0.0105,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Cili Padi Merah 1 kg",
        "cost": 0.045,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.1425,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 0.44,
        "quantity": "40g",
        "source": "Invoice"
      },
      {
        "name": "MASHED SALTED EGG",
        "cost": 1.5,
        "quantity": "20#N/A",
        "source": "Google Proxy"
      }
    ]
  },
  {
    "name": "CHICKEN & MUSHROOM AGLIO OLIO SPAGHETTI",
    "slug": "chicken-and-mushroom-aglio-olio-spaghetti",
    "sellingPrice": 19,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "Basso Olive oil 3L",
        "cost": 0.25,
        "quantity": "3ml",
        "source": "Invoice"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.57,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Capsicum Merah 1 kg",
        "cost": 0.3,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Capsicum Hijau 1 kg",
        "cost": 0.18,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "450ml black olive 1 tin",
        "cost": 0.3756,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 1.98,
        "quantity": "180g",
        "source": "Invoice"
      },
      {
        "name": "Knorr Chicken Stock 1 kg",
        "cost": 0.075,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0137,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Eagle Kasar Serbuk Lada Hitam 250 g",
        "cost": 0.36,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.039,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Chicken Breast 2 kg",
        "cost": 0.552,
        "quantity": "40g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HARAJUKU TERIYAKI CHICKEN CHOP",
    "slug": "harajuku-teriyaki-chicken-chop",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "MASH POTATO",
        "cost": 1.2302,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "PLAIN CHICKEN CHOP (FOR TERIYAKI )",
        "cost": 5.5,
        "quantity": "1#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "Carrot 3 kg",
        "cost": 0.0132,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Cauliflower",
        "cost": 0.1,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Broccoli",
        "cost": 0.4,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Unsalted Butter 5 kg",
        "cost": 0.92,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.039,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0137,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Knorr Chicken Stock 1 kg",
        "cost": 0.075,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Eagle Kasar Serbuk Lada Hitam 250 g",
        "cost": 0.36,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "TERIYAKI SAUCE",
        "cost": 2.25,
        "quantity": "90#N/A",
        "source": "B2B Proxy"
      }
    ]
  },
  {
    "name": "AUSTRALIAN LAMB CHOP",
    "slug": "australian-lamb-chop",
    "sellingPrice": 48,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "MASH POTATO",
        "cost": 1.2302,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "BROWN BUTTON MUSHROOM",
        "cost": 2.2953,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "Aus Lamb Shoulder 1 kg",
        "cost": 6.82,
        "quantity": "220g",
        "source": "Invoice"
      },
      {
        "name": "Thyme flakes Gud 500gm",
        "cost": 0.143,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Knorr Chicken Stock 1 kg",
        "cost": 0.075,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Eagle Kasar Serbuk Lada Hitam 250 g",
        "cost": 0.24,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0091,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Mesclune Mix",
        "cost": 2.025,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Unsalted Butter 5 kg",
        "cost": 0.46,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Grand'Or Holland Blue Cheese 100 g",
        "cost": 0.305,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "HUSKEY SAUCE",
        "cost": 1.35,
        "quantity": "90#N/A",
        "source": "Google Proxy"
      }
    ]
  },
  {
    "name": "MUSHROOM SOUP",
    "slug": "mushroom-soup",
    "sellingPrice": 8,
    "targetMargin": 55,
    "category": "Sides & Components",
    "ingredients": [
      {
        "name": "MUHSROOM SOUP",
        "cost": 0,
        "quantity": "200#N/A",
        "source": "Missing"
      },
      {
        "name": "Frozen Baguette 1 pcs",
        "cost": 1.4,
        "quantity": "2pcs",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.013,
        "quantity": "1g",
        "source": "Invoice"
      },
      {
        "name": "Daun parsley segar",
        "cost": 0.0245,
        "quantity": "1g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BREADED CHICKEN CHOP - BLACKPEPPER SAUCE",
    "slug": "breaded-chicken-chop-blackpepper-sauce",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "BREADED CHICKEN CHOP",
        "cost": 6.5862,
        "quantity": "250gram",
        "source": "Invoice"
      },
      {
        "name": "C&G Crincle Fries 1 kg",
        "cost": 0.819,
        "quantity": "100g",
        "source": "Invoice"
      },
      {
        "name": "Mesclune Mix",
        "cost": 2.025,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "CREAMY BLACKPEPPER SAUCE 9KG",
        "cost": 1.35,
        "quantity": "90#N/A",
        "source": "B2B Proxy"
      },
      {
        "name": "HONEY LEMON DRESSING 1KG",
        "cost": 0.22,
        "quantity": "10#N/A",
        "source": "Wholesale Proxy"
      }
    ]
  },
  {
    "name": "PARMIGIANA CHICKEN CHOP",
    "slug": "parmigiana-chicken-chop",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "SALAD DRESSING",
        "cost": 0.2795,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "BREADED CHICKEN CHOP",
        "cost": 6.5862,
        "quantity": "250gram",
        "source": "Invoice"
      },
      {
        "name": "POTATO WEDGES",
        "cost": 1.541,
        "quantity": "250gram",
        "source": "Invoice"
      },
      {
        "name": "Mozarella Cheese 2 kg",
        "cost": 1.29,
        "quantity": "40g",
        "source": "Invoice"
      },
      {
        "name": "Mesclune Mix",
        "cost": 1.35,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "MARINARA SAUCE 20KG",
        "cost": 0.24,
        "quantity": "40#N/A",
        "source": "B2B Proxy"
      }
    ]
  },
  {
    "name": "CHICKEN CARBONARA SPAGHETTI",
    "slug": "chicken-carbonara-spaghetti",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "Chicken Breast 2 kg",
        "cost": 0.552,
        "quantity": "40g",
        "source": "Invoice"
      },
      {
        "name": "White Mushroom 1 kg",
        "cost": 0.57,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.57,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Parmesan Cheese 1kg",
        "cost": 0.4066,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.039,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 1.98,
        "quantity": "180g",
        "source": "Invoice"
      },
      {
        "name": "Daun parsley segar",
        "cost": 0.1225,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Culinary Cream 1 l",
        "cost": 4.9,
        "quantity": "200ml",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.0207,
        "quantity": "3g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HONEY GLAZED CHICKEN CHOP-MUSHROOM SAUCE",
    "slug": "honey-glazed-chicken-chop-mushroom-sauce",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "COLESLAW",
        "cost": 1.1121,
        "quantity": "150gram",
        "source": "Invoice"
      },
      {
        "name": "FROZEN HONEY GLAZED CHICKEN CHOP 30PCS",
        "cost": 5.5,
        "quantity": "1#N/A",
        "source": "Supplier Proxy"
      },
      {
        "name": "Romaine lettuce",
        "cost": 0.09,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "MUSHROOM SAUCE",
        "cost": 2.52,
        "quantity": "90#N/A",
        "source": "Catering Proxy"
      },
      {
        "name": "C&G Crincle Fries 1 kg",
        "cost": 0.9828,
        "quantity": "120g",
        "source": "Invoice"
      },
      {
        "name": "Palm Oil 8.5 kg",
        "cost": 0.7353,
        "quantity": "100g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "SEAFOOD AGLIO OLIO SPAGHETTI",
    "slug": "seafood-aglio-olio-spaghetti",
    "sellingPrice": 25,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "Basso Olive oil 3L",
        "cost": 0.25,
        "quantity": "3ml",
        "source": "Invoice"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.57,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Capsicum Merah 1 kg",
        "cost": 0.3,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Capsicum Hijau 1 kg",
        "cost": 0.18,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "450ml black olive 1 tin",
        "cost": 0.3756,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 1.98,
        "quantity": "180g",
        "source": "Invoice"
      },
      {
        "name": "Knorr Chicken Stock 1 kg",
        "cost": 0.075,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0137,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Eagle Kasar Serbuk Lada Hitam 250 g",
        "cost": 0.36,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.039,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Udang Fresh 1kg",
        "cost": 3.15,
        "quantity": "70g",
        "source": "Invoice"
      },
      {
        "name": "Sotong fresh 1 kg",
        "cost": 2.16,
        "quantity": "45g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CHICKEN & MUSHROOM BALADO SALTED EGG SPAGHETTI",
    "slug": "chicken-and-mushroom-balado-salted-egg-spaghetti",
    "sellingPrice": 19,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "Anchor Unsalted Butter 5 kg",
        "cost": 0.23,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Daun Kari 1 kg",
        "cost": 0.0018,
        "quantity": "0.5g",
        "source": "Invoice"
      },
      {
        "name": "Chicken Breast 2 kg",
        "cost": 0.552,
        "quantity": "40g",
        "source": "Invoice"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.855,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "BALADO PASTE 8.4KG",
        "cost": 0.72,
        "quantity": "40#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "MASHED SALTED EGG",
        "cost": 1.125,
        "quantity": "15#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "Chili Flake 500 g",
        "cost": 0.2125,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Air Selangor Water 1000 L",
        "cost": 0.0001,
        "quantity": "20ml",
        "source": "Invoice"
      },
      {
        "name": "Knorr Chicken Stock 1 kg",
        "cost": 0.075,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Lada Hitam 1kg",
        "cost": 0.1425,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0137,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 1.98,
        "quantity": "180g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BREADED CHICKEN CHOP - MUSHROOM SAUCE",
    "slug": "breaded-chicken-chop-mushroom-sauce",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "BREADED CHICKEN CHOP",
        "cost": 6.5862,
        "quantity": "250gram",
        "source": "Invoice"
      },
      {
        "name": "C&G Crincle Fries 1 kg",
        "cost": 0.9828,
        "quantity": "120g",
        "source": "Invoice"
      },
      {
        "name": "Mesclune Mix",
        "cost": 2.025,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "MUSHROOM SAUCE",
        "cost": 2.52,
        "quantity": "90#N/A",
        "source": "Catering Proxy"
      },
      {
        "name": "HONEY LEMON DRESSING 1KG",
        "cost": 0.22,
        "quantity": "10#N/A",
        "source": "Wholesale Proxy"
      }
    ]
  },
  {
    "name": "CHICKEN MAC & CHEESE",
    "slug": "chicken-mac-and-cheese",
    "sellingPrice": 30,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "ALFREDO SAUCE",
        "cost": 7.0,
        "quantity": "200#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "Prego Macaroni 500 g",
        "cost": 1.8,
        "quantity": "180g",
        "source": "Invoice"
      },
      {
        "name": "Mozarella Cheese 2 kg",
        "cost": 0.3225,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.57,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Chicken Breast 2 kg",
        "cost": 0.552,
        "quantity": "40g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "STREAKY BEEF AGLIO OLIO SPAGHETTI",
    "slug": "streaky-beef-aglio-olio-spaghetti",
    "sellingPrice": 19,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "Basso Olive oil 3L",
        "cost": 0.25,
        "quantity": "3ml",
        "source": "Invoice"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.57,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Capsicum Merah 1 kg",
        "cost": 0.3,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Capsicum Hijau 1 kg",
        "cost": 0.18,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "450ml black olive 1 tin",
        "cost": 0.3756,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 1.98,
        "quantity": "180g",
        "source": "Invoice"
      },
      {
        "name": "Knorr Chicken Stock 1 kg",
        "cost": 0.075,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0137,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Lada Hitam 1kg",
        "cost": 0.1425,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.039,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Hennies Streaky Beef 500 g",
        "cost": 1.48,
        "quantity": "40g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TOKYO TERIYAKI SALMON",
    "slug": "tokyo-teriyaki-salmon",
    "sellingPrice": 45,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "SALAD DRESSING",
        "cost": 0.2795,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "MASH POTATO",
        "cost": 1.2302,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "200gm norwegian salmon steak cut 1 pkt",
        "cost": 15.9,
        "quantity": "200.0g [AUTO-FIXED]",
        "source": "Invoice"
      },
      {
        "name": "Cauliflower",
        "cost": 0.1,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Broccoli",
        "cost": 0.4,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Carrot 3 kg",
        "cost": 0.0132,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "TERIYAKI SAUCE",
        "cost": 0.5,
        "quantity": "20#N/A",
        "source": "B2B Proxy"
      }
    ]
  },
  {
    "name": "STREAKY BEEF CARBONARA SPAGHETTI",
    "slug": "streaky-beef-carbonara-spaghetti",
    "sellingPrice": 19,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.0207,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Hennies Streaky Beef 500 g",
        "cost": 1.48,
        "quantity": "40g",
        "source": "Invoice"
      },
      {
        "name": "White Mushroom 1 kg",
        "cost": 0.57,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.57,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Parmesan Cheese 1kg",
        "cost": 0.4066,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.039,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 1.98,
        "quantity": "180g",
        "source": "Invoice"
      },
      {
        "name": "Daun parsley segar",
        "cost": 0.1225,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Culinary Cream 1 l",
        "cost": 4.9,
        "quantity": "200ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "STREAKY BEEF MAC & CHEESE",
    "slug": "streaky-beef-mac-and-cheese",
    "sellingPrice": 30,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "ALFREDO SAUCE",
        "cost": 7.0,
        "quantity": "200#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "Prego Macaroni 500 g",
        "cost": 1.8,
        "quantity": "180g",
        "source": "Invoice"
      },
      {
        "name": "Mozarella Cheese 2 kg",
        "cost": 0.3225,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.57,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Hennies Streaky Beef 500 g",
        "cost": 1.48,
        "quantity": "40g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BREADED CHICKEN CHOP - ORIENTAL SAUCE",
    "slug": "breaded-chicken-chop-oriental-sauce",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "BREADED CHICKEN CHOP",
        "cost": 6.5862,
        "quantity": "250gram",
        "source": "Invoice"
      },
      {
        "name": "C&G Crincle Fries 1 kg",
        "cost": 0.819,
        "quantity": "100g",
        "source": "Invoice"
      },
      {
        "name": "Mesclune Mix",
        "cost": 2.025,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "SOS ORIENTAL",
        "cost": 1.8,
        "quantity": "90#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "HONEY LEMON DRESSING 1KG",
        "cost": 0.22,
        "quantity": "10#N/A",
        "source": "Wholesale Proxy"
      }
    ]
  },
  {
    "name": "TNL MEATBALLS - MUSHROOM SAUCE",
    "slug": "tnl-meatballs-mushroom-sauce",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "MASH POTATO",
        "cost": 1.2302,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "Blue Pacific Meatball 1 kg",
        "cost": 6.34,
        "quantity": "200g",
        "source": "Invoice"
      },
      {
        "name": "MUSHROOM SAUCE",
        "cost": 2.52,
        "quantity": "90#N/A",
        "source": "Catering Proxy"
      },
      {
        "name": "Romaine lettuce",
        "cost": 0.009,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "tomato ceri 1 kg",
        "cost": 0.135,
        "quantity": "10g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "PRAWN CREAMY  BUTTER FETTUCINE",
    "slug": "prawn-creamy-butter-fettucine",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "CREAMY BUTTER SAUCE PLUS (WITH CHILLI AND CURRY LEAF)",
        "cost": 5.0,
        "quantity": "200#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "Anchor Unsalted Butter 5 kg",
        "cost": 0.23,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Daun Kari 1 kg",
        "cost": 0.0105,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Cili Padi Hijau 1kg",
        "cost": 0.0441,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Udang Fresh 1kg",
        "cost": 3.15,
        "quantity": "70g",
        "source": "Invoice"
      },
      {
        "name": "White Mushroom 1 kg",
        "cost": 0.1425,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Prego Fettucine 500 g",
        "cost": 1.98,
        "quantity": "180g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TNL MEATBALLS - BLACKPEPPER SAUCE",
    "slug": "tnl-meatballs-blackpepper-sauce",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "MASH POTATO",
        "cost": 1.2302,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "Blue Pacific Meatball 1 kg",
        "cost": 6.34,
        "quantity": "200g",
        "source": "Invoice"
      },
      {
        "name": "CREAMY BLACKPEPPER SAUCE 9KG",
        "cost": 1.35,
        "quantity": "90#N/A",
        "source": "B2B Proxy"
      },
      {
        "name": "Romaine lettuce",
        "cost": 0.009,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "tomato ceri 1 kg",
        "cost": 0.135,
        "quantity": "10g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "AUSTRALIAN ANGUS STRIPLOIN STEAK",
    "slug": "australian-angus-striploin-steak",
    "sellingPrice": 75,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "AU POIVRE SAUCE",
        "cost": 3.0777,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "SAUTEED MUSHROOM",
        "cost": 0.1044,
        "quantity": "40gram",
        "source": "Invoice"
      },
      {
        "name": "SALAD MESCLUN",
        "cost": 0,
        "quantity": "1portion",
        "source": "Missing"
      },
      {
        "name": "POTATO WEDGES",
        "cost": 0.3082,
        "quantity": "50gram",
        "source": "Invoice"
      },
      {
        "name": "Aust Chilled Beef Striploin - Angus (DM)",
        "cost": 27.5,
        "quantity": "250#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0457,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Lada Hitam 1kg",
        "cost": 0.2375,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Unsalted Butter 5 kg",
        "cost": 0.69,
        "quantity": "15g",
        "source": "Invoice"
      },
      {
        "name": "Daun rosemary",
        "cost": 0.195,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Grand'Or Holland Blue Cheese 100 g",
        "cost": 0.61,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Daun thyme segar",
        "cost": 0.195,
        "quantity": "3g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BREADED CHICKEN CHOP - CREAMY BUTTER SAUCE",
    "slug": "breaded-chicken-chop-creamy-butter-sauce",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "BREADED CHICKEN CHOP",
        "cost": 6.5862,
        "quantity": "250gram",
        "source": "Invoice"
      },
      {
        "name": "C&G Crincle Fries 1 kg",
        "cost": 0.819,
        "quantity": "100g",
        "source": "Invoice"
      },
      {
        "name": "Mesclune Mix",
        "cost": 2.025,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "CREAMY BUTTER SAUCE",
        "cost": 2.25,
        "quantity": "90#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "HONEY LEMON DRESSING 1KG",
        "cost": 0.22,
        "quantity": "10#N/A",
        "source": "Wholesale Proxy"
      }
    ]
  },
  {
    "name": "GRILLED SALMON WITH CREAMY SAUCE BAGEL",
    "slug": "grilled-salmon-with-creamy-sauce-bagel",
    "sellingPrice": 45,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "bagel cheese (5pcs/pkt) 1 pkt",
        "cost": 3.2,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "norwegian smoked salmon 1 pkt",
        "cost": 0.0143,
        "quantity": "6.0g [AUTO-FIXED]",
        "source": "Invoice"
      },
      {
        "name": "green coral salad 1 kg",
        "cost": 0.0525,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Timun Jepun 500 g",
        "cost": 0.1,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Tomato 1 kg",
        "cost": 0.05,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "450ml black olive 1 tin",
        "cost": 0.3756,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "CREAMY SAUCE",
        "cost": 2.25,
        "quantity": "90#N/A",
        "source": "Wholesale Proxy"
      }
    ]
  },
  {
    "name": "TERIYAKI CHICKEN CROISSANT",
    "slug": "teriyaki-chicken-croissant",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Tanned Kitchen Plain Croissant Puff Pastry 1 pcs",
        "cost": 4.5,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Chicken Chop Raw 2kg 9 pcs",
        "cost": 3.3333,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "green coral salad 1 kg",
        "cost": 0.0525,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Timun Jepun 500 g",
        "cost": 0.1,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Tomato 1 kg",
        "cost": 0.05,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "450ml black olive 1 tin",
        "cost": 0.1878,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "TERIYAKI SAUCE",
        "cost": 1.0,
        "quantity": "40#N/A",
        "source": "B2B Proxy"
      },
      {
        "name": "Black Sesame Seed India 250 g",
        "cost": 0.0,
        "quantity": "2g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "GRILLED PRAWN MAC & CHEESE",
    "slug": "grilled-prawn-mac-and-cheese",
    "sellingPrice": 22,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "ALFREDO SAUCE",
        "cost": 7.0,
        "quantity": "200#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "Prego Macaroni 500 g",
        "cost": 1.8,
        "quantity": "180g",
        "source": "Invoice"
      },
      {
        "name": "Mozarella Cheese 2 kg",
        "cost": 0.3225,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.57,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Udang Fresh 1kg",
        "cost": 3.15,
        "quantity": "70g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "SEAFOOD BALADO SALTED EGG SPAGHETTI",
    "slug": "seafood-balado-salted-egg-spaghetti",
    "sellingPrice": 25,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "Anchor Unsalted Butter 5 kg",
        "cost": 0.23,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Daun Kari 1 kg",
        "cost": 0.0018,
        "quantity": "0.5g",
        "source": "Invoice"
      },
      {
        "name": "Sotong fresh 1 kg",
        "cost": 2.16,
        "quantity": "45g",
        "source": "Invoice"
      },
      {
        "name": "Udang Fresh 1kg",
        "cost": 3.15,
        "quantity": "70g",
        "source": "Invoice"
      },
      {
        "name": "White Mushroom 1 kg",
        "cost": 0.855,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "BALADO PASTE 8.4KG",
        "cost": 0.72,
        "quantity": "40#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "Salted Egg Yolk 320 g",
        "cost": 1.4531,
        "quantity": "15g",
        "source": "Invoice"
      },
      {
        "name": "Chili Flake 500 g",
        "cost": 0.2125,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Air Selangor Water 1000 L",
        "cost": 0.0001,
        "quantity": "20ml",
        "source": "Invoice"
      },
      {
        "name": "Knorr Chicken Stock 1 kg",
        "cost": 0.075,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Lada Hitam 1kg",
        "cost": 0.1425,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0137,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 1.98,
        "quantity": "180g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "FRIED SEAFOOD SALTED EGG BUTTER SPAGHETTI",
    "slug": "fried-seafood-salted-egg-butter-spaghetti",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "CREAMY BUTTER SAUCE",
        "cost": 5.0,
        "quantity": "200#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "Anchor Unsalted Butter 5 kg",
        "cost": 0.23,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Daun Kari 1 kg",
        "cost": 0.0105,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Cili Padi Hijau 1kg",
        "cost": 0.0441,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "White Mushroom 1 kg",
        "cost": 0.1425,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Udang Fresh 1kg",
        "cost": 0.9,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 1.98,
        "quantity": "180g",
        "source": "Invoice"
      },
      {
        "name": "Salted Egg Yolk 320 g",
        "cost": 1.9375,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Sotong fresh 1 kg",
        "cost": 0.96,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HONEY BUTTER GRILLED SALMON",
    "slug": "honey-butter-grilled-salmon",
    "sellingPrice": 45,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "MARINADE SALMON SAUCE",
        "cost": 8.1904,
        "quantity": "250gram",
        "source": "Invoice"
      },
      {
        "name": "200gm norwegian salmon steak cut 1 pkt",
        "cost": 15.9,
        "quantity": "200.0g [AUTO-FIXED]",
        "source": "Invoice"
      },
      {
        "name": "Basso Olive oil 3L",
        "cost": 1.25,
        "quantity": "15ml",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0229,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Lada Hitam 1kg",
        "cost": 0.2375,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "lemon 1 nos",
        "cost": 0.5,
        "quantity": "0.25pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BREADED CHICKEN CHOP - CREAMY BUTTER SAUCE",
    "slug": "breaded-chicken-chop-creamy-butter-sauce-v2",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "BREADED CHICKEN CHOP",
        "cost": 6.5862,
        "quantity": "250gram",
        "source": "Invoice"
      },
      {
        "name": "C&G Crincle Fries 1 kg",
        "cost": 0.819,
        "quantity": "100g",
        "source": "Invoice"
      },
      {
        "name": "Mesclune Mix",
        "cost": 2.025,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "CREAMY BUTTER SAUCE",
        "cost": 2.25,
        "quantity": "90#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "HONEY LEMON DRESSING 1KG",
        "cost": 0.22,
        "quantity": "10#N/A",
        "source": "Wholesale Proxy"
      }
    ]
  },
  {
    "name": "CHICKEN BUTTER FETTUCINE JR",
    "slug": "chicken-butter-fettucine-jr",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "BREADED CHICKEN",
        "cost": 1.3853,
        "quantity": "0.5portion",
        "source": "Invoice"
      },
      {
        "name": "CREAMY BUTTER SAUCE",
        "cost": 2.5,
        "quantity": "100#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "Anchor Unsalted Butter 5 kg",
        "cost": 0.115,
        "quantity": "2.5g",
        "source": "Invoice"
      },
      {
        "name": "Daun Kari 1 kg",
        "cost": 0.0053,
        "quantity": "1.5g",
        "source": "Invoice"
      },
      {
        "name": "Cili Padi Hijau 1kg",
        "cost": 0.0221,
        "quantity": "1.5g",
        "source": "Invoice"
      },
      {
        "name": "Prego Fettucine 500 g",
        "cost": 0.99,
        "quantity": "90g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CHICKEN MAC & CHEESE JR",
    "slug": "chicken-mac-and-cheese-jr",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "ALFREDO SAUCE",
        "cost": 3.5,
        "quantity": "100#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "Prego Macaroni 500 g",
        "cost": 0.9,
        "quantity": "90g",
        "source": "Invoice"
      },
      {
        "name": "Mozarella Cheese 2 kg",
        "cost": 0.1613,
        "quantity": "5g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CHICKEN CARBONARA JR",
    "slug": "chicken-carbonara-jr",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.0104,
        "quantity": "1.5g",
        "source": "Invoice"
      },
      {
        "name": "Chicken Breast 2 kg",
        "cost": 0.276,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Parmesan Cheese 1kg",
        "cost": 0.2033,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.0195,
        "quantity": "1.5g",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 0.99,
        "quantity": "90g",
        "source": "Invoice"
      },
      {
        "name": "Parsley 500 g",
        "cost": 0.2,
        "quantity": "2.5g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Culinary Cream 1 l",
        "cost": 2.45,
        "quantity": "100ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BEEF LASAGNA JR",
    "slug": "beef-lasagna-jr",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "MARINARA SAUCE 20KG",
        "cost": 0.48,
        "quantity": "80#N/A",
        "source": "B2B Proxy"
      },
      {
        "name": "BECHAMEL SAUCE (2.6KG)",
        "cost": 1.73,
        "quantity": "100#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "Lasagna sheet 250g",
        "cost": 3.75,
        "quantity": "0.5pkt",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "FISH & CHIPS JR",
    "slug": "fish-and-chips-jr",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "SALAD DRESSING",
        "cost": 0.0,
        "quantity": "portion",
        "source": "Invoice"
      },
      {
        "name": "Dory Fillet 10kg/ctn 10 kg",
        "cost": 0.99,
        "quantity": "110g",
        "source": "Invoice"
      },
      {
        "name": "Mesclune Mix",
        "cost": 0.675,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "TARTAR SAUCE 1KG",
        "cost": 0.15,
        "quantity": "10#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "C&G Shoestring Fries 1 kg",
        "cost": 0.4914,
        "quantity": "60g",
        "source": "Invoice"
      },
      {
        "name": "lemon 1 nos",
        "cost": 0.4,
        "quantity": "0.2pcs",
        "source": "Invoice"
      },
      {
        "name": "Tepung Gandum Cap Sauh 1 kg",
        "cost": 0.875,
        "quantity": "250g",
        "source": "Invoice"
      },
      {
        "name": "Tepung Jagung Cap Bintang 400 g",
        "cost": 0.5,
        "quantity": "100g",
        "source": "Invoice"
      },
      {
        "name": "Air Selangor Water 1000 L",
        "cost": 0.0016,
        "quantity": "250ml",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0648,
        "quantity": "14.175g",
        "source": "Invoice"
      },
      {
        "name": "Knorr Chicken Stock 1 kg",
        "cost": 0.3544,
        "quantity": "14.175g",
        "source": "Invoice"
      },
      {
        "name": "Grade A Chicken Egg 30 pcs",
        "cost": 0.45,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Sos Mustard",
        "cost": 0.4451,
        "quantity": "14.175g",
        "source": "Invoice"
      },
      {
        "name": "Lada Hitam 1kg",
        "cost": 0.6733,
        "quantity": "14.175g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "STREAKY BEEF MAC & CHEESE JR",
    "slug": "streaky-beef-mac-and-cheese-jr",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "ALFREDO SAUCE",
        "cost": 3.5,
        "quantity": "100#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "Prego Macaroni 500 g",
        "cost": 0.9,
        "quantity": "90g",
        "source": "Invoice"
      },
      {
        "name": "Mozarella Cheese 2 kg",
        "cost": 0.1613,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "White Mushroom 1 kg",
        "cost": 0.285,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Hennies Streaky Beef 500 g",
        "cost": 1.85,
        "quantity": "50g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TNL MUSHROOM MEATBALL JR",
    "slug": "tnl-mushroom-meatball-jr",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "Blue Pacific Meatball 1 kg",
        "cost": 3.17,
        "quantity": "100g",
        "source": "Invoice"
      },
      {
        "name": "MUSHROOM SAUCE",
        "cost": 1.26,
        "quantity": "45#N/A",
        "source": "Catering Proxy"
      },
      {
        "name": "Romaine lettuce",
        "cost": 0.0045,
        "quantity": "1g",
        "source": "Invoice"
      },
      {
        "name": "tomato ceri 1 kg",
        "cost": 0.0675,
        "quantity": "5g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "GRILLED CHICKEN CROSSANT",
    "slug": "grilled-chicken-crossant",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "large butter croissant 1 pcs",
        "cost": 3.5,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Chicken Chop Raw 2kg 10 pcs",
        "cost": 3.0,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Thyme flakes Gud 500gm",
        "cost": 0.715,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.13,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0229,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Lada Hitam 1kg",
        "cost": 0.2375,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "green coral salad 1 kg",
        "cost": 0.0315,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Timun Jepun 500 g",
        "cost": 0.1,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "tomato ceri 1 kg",
        "cost": 0.135,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "450ml black olive 1 tin",
        "cost": 0.1878,
        "quantity": "5g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CHICKEN WRAP",
    "slug": "chicken-wrap",
    "sellingPrice": 18,
    "targetMargin": 55,
    "category": "Sides & Components",
    "ingredients": [
      {
        "name": "large butter croissant 1 pcs",
        "cost": 3.5,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Chicken Chop Raw 2kg 10 pcs",
        "cost": 3.0,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Thyme flakes Gud 500gm",
        "cost": 0.715,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.13,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0229,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Lada Hitam 1kg",
        "cost": 0.2375,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "green coral salad 1 kg",
        "cost": 0.0315,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Timun Jepun 500 g",
        "cost": 0.1,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "tomato ceri 1 kg",
        "cost": 0.135,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "450ml black olive 1 tin",
        "cost": 0.1878,
        "quantity": "5g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CAESAR SALAD",
    "slug": "caesar-salad",
    "sellingPrice": 18,
    "targetMargin": 55,
    "category": "Sides & Components",
    "ingredients": [
      {
        "name": "CROUTON",
        "cost": 1.4552,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "CAESAR SALAD SAUCE",
        "cost": 5.1217,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "AYAM BAKAR",
        "cost": 1.0419,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "Romaine lettuce",
        "cost": 0.675,
        "quantity": "150g",
        "source": "Invoice"
      },
      {
        "name": "Perfect Italiano Medium Flavour Parmesan Block Cheese 250g",
        "cost": 0.527,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Grade B Chicken Egg 30 pcs",
        "cost": 0.4,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "KIMCHI JIGAE",
    "slug": "kimchi-jigae",
    "sellingPrice": 18,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "PREMADE KIMCHI",
        "cost": 3.9465,
        "quantity": "50gram",
        "source": "Invoice"
      },
      {
        "name": "RED RICE",
        "cost": 0.9886,
        "quantity": "100gram",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.0346,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.065,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Holland 1 kg",
        "cost": 0.08,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Chicken Breast 2 kg",
        "cost": 0.69,
        "quantity": "50g",
        "source": "Invoice"
      },
      {
        "name": "Air Selangor Water 1000 L",
        "cost": 0.0008,
        "quantity": "120ml",
        "source": "Invoice"
      },
      {
        "name": "Tauhu Lembut",
        "cost": 0.29,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "Cendawan enoki",
        "cost": 1.0,
        "quantity": "1pkt",
        "source": "Invoice"
      },
      {
        "name": "Daun bawang",
        "cost": 0.035,
        "quantity": "5g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "STRIPLOIN STEAK SANDWICH",
    "slug": "striploin-steak-sandwich",
    "sellingPrice": 25,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "CARAMELIZE ONION",
        "cost": 1.2694,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "Roti sourdough",
        "cost": 1.05,
        "quantity": "70g",
        "source": "Invoice"
      },
      {
        "name": "Aust Chilled Beef Striploin - Angus (DM)",
        "cost": 7.7,
        "quantity": "70#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.57,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Basso Olive oil 3L",
        "cost": 0.8333,
        "quantity": "10ml",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.26,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Wild Rocket",
        "cost": 0.58,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Timun Jepun 500 g",
        "cost": 0.1,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "tomato ceri 1 kg",
        "cost": 0.27,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0091,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Lada Hitam 1kg",
        "cost": 0.095,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Lady's Choice Mayonaise 3 L",
        "cost": 0.0574,
        "quantity": "5g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TNL CHURRO WITH CHOCOLATE DIP (5PCS)",
    "slug": "tnl-churro-with-chocolate-dip-5pcs",
    "sellingPrice": 18,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Tepung Churros",
        "cost": 2.0,
        "quantity": "1pkt",
        "source": "Invoice"
      },
      {
        "name": "TNL Foods Chocolate Ganache 1 kg",
        "cost": 1.8,
        "quantity": "60g",
        "source": "Invoice"
      },
      {
        "name": "Daisy Corn Oil 3 kg",
        "cost": 0.0667,
        "quantity": "4g",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.3456,
        "quantity": "50g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TNL CHURRO WITH DOUBLE DIP (5PCS)",
    "slug": "tnl-churro-with-double-dip-5pcs",
    "sellingPrice": 22,
    "targetMargin": 55,
    "category": "Churros",
    "ingredients": [
      {
        "name": "Tepung Churros",
        "cost": 2.0,
        "quantity": "1pkt",
        "source": "Invoice"
      },
      {
        "name": "TNL Foods Chocolate Ganache 1 kg",
        "cost": 1.8,
        "quantity": "60g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 1.8,
        "quantity": "60g",
        "source": "Invoice"
      },
      {
        "name": "Daisy Corn Oil 3 kg",
        "cost": 0.0667,
        "quantity": "4g",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.3456,
        "quantity": "50g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TNL CHURRO WITH SALTED CARAMEL DIP (5PCS)",
    "slug": "tnl-churro-with-salted-caramel-dip-5pcs",
    "sellingPrice": 18,
    "targetMargin": 55,
    "category": "Churros",
    "ingredients": [
      {
        "name": "Tepung Churros",
        "cost": 2.0,
        "quantity": "1pkt",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 1.8,
        "quantity": "60g",
        "source": "Invoice"
      },
      {
        "name": "Daisy Corn Oil 3 kg",
        "cost": 0.0667,
        "quantity": "4g",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.3456,
        "quantity": "50g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "NUTELLA  MINI CHURRO (10PCS)",
    "slug": "nutella-mini-churro-10pcs",
    "sellingPrice": 25,
    "targetMargin": 55,
    "category": "Churros",
    "ingredients": [
      {
        "name": "Tepung Churros",
        "cost": 2.0,
        "quantity": "1pkt",
        "source": "Invoice"
      },
      {
        "name": "Daisy Corn Oil 3 kg",
        "cost": 0.0667,
        "quantity": "4g",
        "source": "Invoice"
      },
      {
        "name": "Nutella Spread 3 kg",
        "cost": 2.26,
        "quantity": "60g",
        "source": "Invoice"
      },
      {
        "name": "Fresh Strawberry 250 g",
        "cost": 1.5,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.3456,
        "quantity": "50g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TNL CHURRO WITH CINNAMON & SUGAR (5PCS)",
    "slug": "tnl-churro-with-cinnamon-and-sugar-5pcs",
    "sellingPrice": 18,
    "targetMargin": 55,
    "category": "Churros",
    "ingredients": [
      {
        "name": "Tepung Churros",
        "cost": 2.0,
        "quantity": "1pkt",
        "source": "Invoice"
      },
      {
        "name": "Daisy Corn Oil 3 kg",
        "cost": 0.0667,
        "quantity": "4g",
        "source": "Invoice"
      },
      {
        "name": "Bake with Yen Cinnamon Powder 500 g",
        "cost": 0.0,
        "quantity": "4g",
        "source": "Invoice"
      },
      {
        "name": "Brown Sugar Bwy 1 kg",
        "cost": 0.097,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.3456,
        "quantity": "50g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TNL CHURRO WITH PISTACHIO (5PCS)",
    "slug": "tnl-churro-with-pistachio-5pcs",
    "sellingPrice": 18,
    "targetMargin": 55,
    "category": "Churros",
    "ingredients": [
      {
        "name": "Tepung Churros",
        "cost": 2.0,
        "quantity": "1pkt",
        "source": "Invoice"
      },
      {
        "name": "Daisy Corn Oil 3 kg",
        "cost": 0.0667,
        "quantity": "4g",
        "source": "Invoice"
      },
      {
        "name": "Top Kokoa Pistachio Kreme 1kg",
        "cost": 0,
        "quantity": "60#N/A",
        "source": "Missing"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.3456,
        "quantity": "50g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CHICKEN TOM YUM",
    "slug": "chicken-tom-yum",
    "sellingPrice": 18,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "NASI PUTIH",
        "cost": 0.4308,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "TOM YUM PASTE 8KG",
        "cost": 7.2,
        "quantity": "400#N/A",
        "source": "Catering Proxy"
      },
      {
        "name": "Serai 20 pcs",
        "cost": 0.225,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Bawang Besar Merah 1 kg",
        "cost": 0.06,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Daun Limau 300g",
        "cost": 0.04,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Lengkuas 1 kg",
        "cost": 0.06,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "F& N Teh Tarik Krimer Sejat 390 g",
        "cost": 0.2154,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "White Mushroom 1 kg",
        "cost": 0.057,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Tomato 1 kg",
        "cost": 0.1,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Chicken Breast 2 kg",
        "cost": 2.484,
        "quantity": "180g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BASMATHI NASI LEMAK WITH SALTED EGG (CHICKEN)",
    "slug": "basmathi-nasi-lemak-with-salted-egg-chicken",
    "sellingPrice": 22,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "NASI LEMAK BASMATHI",
        "cost": 2.98,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "SALTED EGG SAUCE",
        "cost": 5.5,
        "quantity": "100#N/A",
        "source": "Knorr Proxy"
      },
      {
        "name": "Chicken Breast 2 kg",
        "cost": 0.552,
        "quantity": "40g",
        "source": "Invoice"
      },
      {
        "name": "SAMBAL NASI LEMAK 6.5KG",
        "cost": 1.5228,
        "quantity": "90#N/A",
        "source": "HoReCa Proxy"
      }
    ]
  },
  {
    "name": "NASI LEMAK BASMATHI WITH SAMBAL AND AYAM PENYET",
    "slug": "nasi-lemak-basmathi-with-sambal-and-ayam-penyet",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "NASI LEMAK BASMATHI",
        "cost": 2.98,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "SAMBAL NASI LEMAK 6.5KG",
        "cost": 1.5228,
        "quantity": "90#N/A",
        "source": "HoReCa Proxy"
      },
      {
        "name": "AYAM PENYET FROZEN 1 PCS",
        "cost": 5.0,
        "quantity": "1#N/A",
        "source": "Supplier Proxy"
      }
    ]
  },
  {
    "name": "BASMATHI NASI LEMAK WITH SAMBAL & AYAM PENYET",
    "slug": "basmathi-nasi-lemak-with-sambal-and-ayam-penyet",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "NASI LEMAK BASMATHI",
        "cost": 2.98,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "SAMBAL NASI LEMAK 6.5KG",
        "cost": 1.5228,
        "quantity": "90#N/A",
        "source": "HoReCa Proxy"
      },
      {
        "name": "AYAM PENYET FROZEN 1 PCS",
        "cost": 5.0,
        "quantity": "1#N/A",
        "source": "Supplier Proxy"
      }
    ]
  },
  {
    "name": "STIR FINGER GINGER BEEF TENDERLOIN WITH RICE",
    "slug": "stir-finger-ginger-beef-tenderloin-with-rice",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "NASI PUTIH",
        "cost": 0.4308,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "SUP KOSONG",
        "cost": 0.2991,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "Daging Batang Pinang 2.5 kg",
        "cost": 2.4192,
        "quantity": "80g",
        "source": "Invoice"
      },
      {
        "name": "Romaine lettuce",
        "cost": 0.045,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Halia Tua 250 g",
        "cost": 1.8,
        "quantity": "150g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.65,
        "quantity": "50g",
        "source": "Invoice"
      },
      {
        "name": "Capsicum Hijau 1 kg",
        "cost": 0.18,
        "quantity": "10g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "SWEET SOUR DORY WITH RICE",
    "slug": "sweet-sour-dory-with-rice",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "NASI PUTIH",
        "cost": 0.4308,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "DORY FILLET",
        "cost": 7.6059,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "Capsicum Hijau 1 kg",
        "cost": 0.36,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Capsicum Merah 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Holland 1 kg",
        "cost": 0.08,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "SWEET SOUR SAUCE",
        "cost": 1.4,
        "quantity": "200#N/A",
        "source": "Google Proxy"
      }
    ]
  },
  {
    "name": "AYAM MASAK MERAH WITH RICE",
    "slug": "ayam-masak-merah-with-rice",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "NASI PUTIH",
        "cost": 0.4308,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "AYAM GORENG",
        "cost": 3.5,
        "quantity": "1#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "MASAK MERAH PASTE 1.5KG",
        "cost": 2.49,
        "quantity": "150#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "Timun Jepun 500 g",
        "cost": 0.7,
        "quantity": "70g",
        "source": "Invoice"
      },
      {
        "name": "Papadom 100g",
        "cost": 0.4,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "SAMBAL BELACAN",
        "cost": 0.975,
        "quantity": "65#N/A",
        "source": "Google Proxy"
      }
    ]
  },
  {
    "name": "CHICKEN CURRY MEE",
    "slug": "chicken-curry-mee",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "Tauhu keras 1pcs",
        "cost": 0.0,
        "quantity": "40s",
        "source": "Invoice"
      },
      {
        "name": "Fishcake 1pkt",
        "cost": 4.0,
        "quantity": "1pkt",
        "source": "Invoice"
      },
      {
        "name": "PES MEE KARI",
        "cost": 3.24,
        "quantity": "180#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "Mee Kuning 450 g",
        "cost": 0.8,
        "quantity": "180g",
        "source": "Invoice"
      },
      {
        "name": "Limau Kasturi 300 g",
        "cost": 0.06,
        "quantity": "6g",
        "source": "Invoice"
      },
      {
        "name": "Cili Merah 150 g",
        "cost": 0.06,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Taugeh 400g",
        "cost": 0.15,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "Grade B Chicken Egg 30 pcs",
        "cost": 0.4,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Dada Ayam tanpa Tulang",
        "cost": 0.272,
        "quantity": "40g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "DORY ASSAM PEDAS",
    "slug": "dory-assam-pedas",
    "sellingPrice": 18,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "NASI PUTIH",
        "cost": 0.4308,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "Bendi 400g",
        "cost": 0.36,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "Kobis Bulat 1kg",
        "cost": 0.08,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "ASAM PEDAS PASTE 25KG",
        "cost": 5.1,
        "quantity": "300#N/A",
        "source": "OEM Proxy"
      },
      {
        "name": "Tomato 1 kg",
        "cost": 0.25,
        "quantity": "50g",
        "source": "Invoice"
      },
      {
        "name": "Dory Fillet 10kg/ctn 10 kg",
        "cost": 1.8,
        "quantity": "200g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ASIAN BITES",
    "slug": "asian-bites",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "chicken dumpling/ Siew Mai (16pcs/pkt) 1 pkt",
        "cost": 2.4,
        "quantity": "4pcs",
        "source": "Invoice"
      },
      {
        "name": "Deepfried Wantan Dumpling (10pcs/pkt) 1 pkt",
        "cost": 2.7,
        "quantity": "3pcs",
        "source": "Invoice"
      },
      {
        "name": "Deepfried Wantan Dumpling (10pcs/pkt) 1 pkt",
        "cost": 2.7,
        "quantity": "3pcs",
        "source": "Invoice"
      },
      {
        "name": "SOS DIM SUM 450g",
        "cost": 0.531,
        "quantity": "30#N/A",
        "source": "Google Proxy"
      }
    ]
  },
  {
    "name": "SEAFOOD TOM YUM",
    "slug": "seafood-tom-yum",
    "sellingPrice": 25,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "NASI PUTIH",
        "cost": 0.4308,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "TOM YUM PASTE 8KG",
        "cost": 7.2,
        "quantity": "400#N/A",
        "source": "Catering Proxy"
      },
      {
        "name": "Serai 20 pcs",
        "cost": 0.225,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Bawang Besar Merah 1 kg",
        "cost": 0.06,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Daun Limau 300g",
        "cost": 0.04,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Lengkuas 1 kg",
        "cost": 0.06,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "F& N Teh Tarik Krimer Sejat 390 g",
        "cost": 0.2154,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.057,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Tomato 1 kg",
        "cost": 0.1,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Sotong fresh 1 kg",
        "cost": 4.8,
        "quantity": "100g",
        "source": "Invoice"
      },
      {
        "name": "Udang Fresh 1kg",
        "cost": 4.5,
        "quantity": "100g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CHICKEN ASSAM PEDAS",
    "slug": "chicken-assam-pedas",
    "sellingPrice": 18,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "NASI PUTIH",
        "cost": 0.4308,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "Bendi 400g",
        "cost": 0.36,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "Kobis Bulat 1kg",
        "cost": 0.08,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "ASAM PEDAS PASTE 25KG",
        "cost": 5.1,
        "quantity": "300#N/A",
        "source": "OEM Proxy"
      },
      {
        "name": "Tomato 1 kg",
        "cost": 0.25,
        "quantity": "50g",
        "source": "Invoice"
      },
      {
        "name": "Chicken Breast 2 kg",
        "cost": 2.76,
        "quantity": "200g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "PRAWN CURRY MEE",
    "slug": "prawn-curry-mee",
    "sellingPrice": 18,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "Tauhu keras 1pcs",
        "cost": 0.0,
        "quantity": "40s",
        "source": "Invoice"
      },
      {
        "name": "Fishcake 1pkt",
        "cost": 4.0,
        "quantity": "1pkt",
        "source": "Invoice"
      },
      {
        "name": "PES MEE KARI",
        "cost": 3.24,
        "quantity": "180#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "Mee Kuning 450 g",
        "cost": 0.8,
        "quantity": "180g",
        "source": "Invoice"
      },
      {
        "name": "Limau Kasturi 300 g",
        "cost": 0.06,
        "quantity": "6g",
        "source": "Invoice"
      },
      {
        "name": "Cili Merah 150 g",
        "cost": 0.06,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Taugeh 400g",
        "cost": 0.15,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "Grade B Chicken Egg 30 pcs",
        "cost": 0.4,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Udang Fresh 1kg",
        "cost": 3.15,
        "quantity": "70g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BASMATHI NASI LEMAK WITH SAMBAL (NO MEAT)",
    "slug": "basmathi-nasi-lemak-with-sambal-no-meat",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "NASI LEMAK BASMATHI",
        "cost": 2.98,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "SAMBAL NASI LEMAK 6.5KG",
        "cost": 1.5228,
        "quantity": "90#N/A",
        "source": "HoReCa Proxy"
      }
    ]
  },
  {
    "name": "CHICKEN SPAGHETTI ALA MAMAK",
    "slug": "chicken-spaghetti-ala-mamak",
    "sellingPrice": 19,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.0691,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "MEE GORENG PASTE 300g",
        "cost": 0.54,
        "quantity": "30#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "Dada Ayam tanpa Tulang",
        "cost": 0.544,
        "quantity": "80g",
        "source": "Invoice"
      },
      {
        "name": "Grade B Chicken Egg 30 pcs",
        "cost": 0.4,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 1.1,
        "quantity": "100g",
        "source": "Invoice"
      },
      {
        "name": "Daun Pisang 1ikat/10pcs",
        "cost": 2.5,
        "quantity": "0.5pkt",
        "source": "Invoice"
      },
      {
        "name": "Daun bawang",
        "cost": 0.035,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Taugeh 400g",
        "cost": 0.15,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "tomato ceri 1 kg",
        "cost": 0.405,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "Bawang goreng 500 g",
        "cost": 0.13,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Limau Kasturi 300 g",
        "cost": 0.05,
        "quantity": "5g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BASMATHI NASI LEMAK WITH SAMBAL (SQUID)",
    "slug": "basmathi-nasi-lemak-with-sambal-squid",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "NASI LEMAK BASMATHI",
        "cost": 2.98,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "SAMBAL NASI LEMAK 6.5KG",
        "cost": 1.5228,
        "quantity": "90#N/A",
        "source": "HoReCa Proxy"
      },
      {
        "name": "Sotong fresh 1 kg",
        "cost": 2.16,
        "quantity": "45g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "SEAFOOD ASSAM PEDAS",
    "slug": "seafood-assam-pedas",
    "sellingPrice": 25,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "NASI PUTIH",
        "cost": 0.4308,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "Bendi 400g",
        "cost": 0.36,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "Kobis Bulat 1kg",
        "cost": 0.08,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "ASAM PEDAS PASTE 25KG",
        "cost": 5.1,
        "quantity": "300#N/A",
        "source": "OEM Proxy"
      },
      {
        "name": "Tomato 1 kg",
        "cost": 0.25,
        "quantity": "50g",
        "source": "Invoice"
      },
      {
        "name": "Sotong fresh 1 kg",
        "cost": 4.8,
        "quantity": "100g",
        "source": "Invoice"
      },
      {
        "name": "Udang Fresh 1kg",
        "cost": 4.5,
        "quantity": "100g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BASMATHI NASI LEMAK WITH SAMBAL (PRAWN)",
    "slug": "basmathi-nasi-lemak-with-sambal-prawn",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "NASI LEMAK BASMATHI",
        "cost": 2.98,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "SAMBAL NASI LEMAK 6.5KG",
        "cost": 1.5228,
        "quantity": "90#N/A",
        "source": "HoReCa Proxy"
      },
      {
        "name": "Udang Fresh 1kg",
        "cost": 3.15,
        "quantity": "70g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BASMATHI NASI LEMAK WITH SALTED EGG (PRAWN)",
    "slug": "basmathi-nasi-lemak-with-salted-egg-prawn",
    "sellingPrice": 22,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "NASI LEMAK BASMATHI",
        "cost": 2.98,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "SAMBAL NASI LEMAK 6.5KG",
        "cost": 1.5228,
        "quantity": "90#N/A",
        "source": "HoReCa Proxy"
      },
      {
        "name": "Udang Fresh 1kg",
        "cost": 3.15,
        "quantity": "70g",
        "source": "Invoice"
      },
      {
        "name": "SALTED EGG SAUCE",
        "cost": 5.5,
        "quantity": "100#N/A",
        "source": "Knorr Proxy"
      }
    ]
  },
  {
    "name": "DORY TOM YUM",
    "slug": "dory-tom-yum",
    "sellingPrice": 18,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "NASI PUTIH",
        "cost": 0.4308,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "TOM YUM PASTE 8KG",
        "cost": 7.2,
        "quantity": "400#N/A",
        "source": "Catering Proxy"
      },
      {
        "name": "Serai 20 pcs",
        "cost": 0.225,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Bawang Besar Merah 1 kg",
        "cost": 0.06,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Daun Limau 300g",
        "cost": 0.04,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Lengkuas 1 kg",
        "cost": 0.06,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "F& N Teh Tarik Krimer Sejat 390 g",
        "cost": 0.2154,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Brown Button Mushroom",
        "cost": 0.057,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Dory Fillet 10kg/ctn 10 kg",
        "cost": 1.62,
        "quantity": "180g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BASMATHI NASI LEMAK WITH SALTED EGG (SQUID)",
    "slug": "basmathi-nasi-lemak-with-salted-egg-squid",
    "sellingPrice": 22,
    "targetMargin": 55,
    "category": "Seafood",
    "ingredients": [
      {
        "name": "NASI LEMAK BASMATHI",
        "cost": 2.98,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "Sotong fresh 1 kg",
        "cost": 2.16,
        "quantity": "45g",
        "source": "Invoice"
      },
      {
        "name": "SALTED EGG SAUCE",
        "cost": 5.5,
        "quantity": "100#N/A",
        "source": "Knorr Proxy"
      },
      {
        "name": "Daun Pisang 1ikat/10pcs",
        "cost": 0.5,
        "quantity": "0.1pkt",
        "source": "Invoice"
      },
      {
        "name": "SAMBAL NASI LEMAK 6.5KG",
        "cost": 1.5228,
        "quantity": "90#N/A",
        "source": "HoReCa Proxy"
      }
    ]
  },
  {
    "name": "SEAFOOD SPAGHETTI ALA MAMAK",
    "slug": "seafood-spaghetti-ala-mamak",
    "sellingPrice": 25,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.0691,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "MEE GORENG PASTE 300g",
        "cost": 0.54,
        "quantity": "30#N/A",
        "source": "Google Proxy"
      },
      {
        "name": "Udang Fresh 1kg",
        "cost": 3.15,
        "quantity": "70g",
        "source": "Invoice"
      },
      {
        "name": "Sotong fresh 1 kg",
        "cost": 2.16,
        "quantity": "45g",
        "source": "Invoice"
      },
      {
        "name": "Grade B Chicken Egg 30 pcs",
        "cost": 0.4,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 1.1,
        "quantity": "100g",
        "source": "Invoice"
      },
      {
        "name": "Daun Pisang 1ikat/10pcs",
        "cost": 0.5,
        "quantity": "0.1pkt",
        "source": "Invoice"
      },
      {
        "name": "Daun bawang",
        "cost": 0.035,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Taugeh 400g",
        "cost": 0.15,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "tomato ceri 1 kg",
        "cost": 0.405,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "Bawang goreng 500 g",
        "cost": 0.13,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Limau Kasturi 300 g",
        "cost": 0.05,
        "quantity": "5g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CREAMY BUTTER CHICKEN WITH RICE JR",
    "slug": "creamy-butter-chicken-with-rice-jr",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "BREADED CHICKEN",
        "cost": 1.3853,
        "quantity": "0.5portion",
        "source": "Invoice"
      },
      {
        "name": "NASI PUTIH",
        "cost": 0.2154,
        "quantity": "0.5portion",
        "source": "Invoice"
      },
      {
        "name": "CREAMY BUTTER SAUCE",
        "cost": 2.5,
        "quantity": "100#N/A",
        "source": "Wholesale Proxy"
      },
      {
        "name": "Romaine lettuce",
        "cost": 0.009,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Cili Padi Merah 1 kg",
        "cost": 0.0,
        "quantity": "g",
        "source": "Invoice"
      },
      {
        "name": "Daun Kari 1 kg",
        "cost": 0.007,
        "quantity": "2g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CARAMEL FRAPPE",
    "slug": "caramel-frappe",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Full Cream Milk 1 l",
        "cost": 0.49,
        "quantity": "70ml",
        "source": "Invoice"
      },
      {
        "name": "Dome Lid 100 pcs",
        "cost": 0.12,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "12oz Cold Cup 50 pcs",
        "cost": 0.285,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Catcher Salted Caramel Ganache 2 L",
        "cost": 1.3095,
        "quantity": "45ml",
        "source": "Invoice"
      },
      {
        "name": "F&N Magnolia Vanilla Ice Cream 1.5 l",
        "cost": 0.8335,
        "quantity": "140ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CARAMEL MACHIATTO FRAPPE",
    "slug": "caramel-machiatto-frappe",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Full Cream Milk 1 l",
        "cost": 0.49,
        "quantity": "70ml",
        "source": "Invoice"
      },
      {
        "name": "Dome Lid 100 pcs",
        "cost": 0.12,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "12oz Cold Cup 50 pcs",
        "cost": 0.285,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Catcher Salted Caramel Ganache 2 L",
        "cost": 1.3095,
        "quantity": "45ml",
        "source": "Invoice"
      },
      {
        "name": "F&N Magnolia Vanilla Ice Cream 1.5 l",
        "cost": 0.8335,
        "quantity": "140ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CUBAN LIME MINT FIZZY SODA",
    "slug": "cuban-lime-mint-fizzy-soda",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Da Vinci Menta Cubano Syrup 750 ml",
        "cost": 2.49,
        "quantity": "45ml",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "f&n ice cream soda 1.5 l",
        "cost": 0.555,
        "quantity": "250ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "DEATH BY CHOCOLATE",
    "slug": "death-by-chocolate",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Full Cream Milk 1 l",
        "cost": 0.49,
        "quantity": "70ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "TNL Foods Chocolate Ganache 1 kg",
        "cost": 0.9,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "F&N Magnolia Chocolate Ice Cream 1.5 l",
        "cost": 0.8335,
        "quantity": "140ml",
        "source": "Invoice"
      },
      {
        "name": "Dome Lid 100 pcs",
        "cost": 0.12,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ESPRESSO",
    "slug": "espresso",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.54,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HOT AMERICANO",
    "slug": "hot-americano",
    "sellingPrice": 9,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.54,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HOT CAPPUCINO",
    "slug": "hot-cappucino",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.54,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 2.156,
        "quantity": "280ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HOT CARAMEL MACHIATTO",
    "slug": "hot-caramel-machiatto",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.54,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 1.386,
        "quantity": "180ml",
        "source": "Invoice"
      },
      {
        "name": "Monin Caramel Syrup 700 ml",
        "cost": 1.8857,
        "quantity": "30ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HOT CHOCOLATE",
    "slug": "hot-chocolate",
    "sellingPrice": 13,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "TNL Foods Chocolate Ganache 1 kg",
        "cost": 1.8,
        "quantity": "60g",
        "source": "Invoice"
      },
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 1.386,
        "quantity": "180ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HOT LATTE",
    "slug": "hot-latte",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.54,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 1.386,
        "quantity": "180ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HOT MATCHA LATTE",
    "slug": "hot-matcha-latte",
    "sellingPrice": 14,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 1.386,
        "quantity": "180ml",
        "source": "Invoice"
      },
      {
        "name": "Kyn Matcha Powder 1 kg",
        "cost": 1.89,
        "quantity": "15g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HOT MOCHA",
    "slug": "hot-mocha",
    "sellingPrice": 13,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.54,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Foods Chocolate Ganache 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 1.386,
        "quantity": "180ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HOT SPANISH LATTE",
    "slug": "hot-spanish-latte",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.54,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Marigold Teh Tarik Sweetened Milk 500 g",
        "cost": 0.148,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 1.386,
        "quantity": "180ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HOT TIRAMISU LATTE",
    "slug": "hot-tiramisu-latte",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Anchor Natural Whipping Cream 1 L",
        "cost": 0.48,
        "quantity": "20ml",
        "source": "Invoice"
      },
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.386,
        "quantity": "18g",
        "source": "Invoice"
      },
      {
        "name": "Kasar Gula Pasir 1 kg",
        "cost": 0.011,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 1.386,
        "quantity": "180ml",
        "source": "Invoice"
      },
      {
        "name": "Cream Mascarpone 500 g",
        "cost": 0.945,
        "quantity": "15g",
        "source": "Invoice"
      },
      {
        "name": "Monin Vanilla Syrup 700 ml",
        "cost": 0.1886,
        "quantity": "3ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED AMERICANO",
    "slug": "iced-americano",
    "sellingPrice": 10,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.54,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED CAPPUCINO",
    "slug": "iced-cappucino",
    "sellingPrice": 13,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.54,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 1.386,
        "quantity": "180ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED CARAMEL MACHIATTO",
    "slug": "iced-caramel-machiatto",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.54,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 1.386,
        "quantity": "180ml",
        "source": "Invoice"
      },
      {
        "name": "Monin Caramel Syrup 700 ml",
        "cost": 1.8857,
        "quantity": "30ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED CHOCOLATE",
    "slug": "iced-chocolate",
    "sellingPrice": 14,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "TNL Foods Chocolate Ganache 1 kg",
        "cost": 2.7,
        "quantity": "90g",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 1.386,
        "quantity": "180ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED GREEN TEA",
    "slug": "iced-green-tea",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lipton Catering Teabags Tea 100 pcs",
        "cost": 0.0729,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED LATTE",
    "slug": "iced-latte",
    "sellingPrice": 13,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.54,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 1.386,
        "quantity": "180ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED LEMON TEA",
    "slug": "iced-lemon-tea",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Richo LemonLime Tea Powder Tea 1 kg",
        "cost": 1.2288,
        "quantity": "32g",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED MATCHA LATTE",
    "slug": "iced-matcha-latte",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 2.156,
        "quantity": "280ml",
        "source": "Invoice"
      },
      {
        "name": "Kyn Matcha Powder 1 kg",
        "cost": 1.89,
        "quantity": "15g",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED MOCHA",
    "slug": "iced-mocha",
    "sellingPrice": 14,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.54,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Foods Chocolate Ganache 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 1.6016,
        "quantity": "208ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED PEACH TEA",
    "slug": "iced-peach-tea",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Richo Peach Tea Powder Tea 1 kg",
        "cost": 1.2288,
        "quantity": "32g",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED SPANISH LATTE",
    "slug": "iced-spanish-latte",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.54,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Marigold Teh Tarik Sweetened Milk 500 g",
        "cost": 0.148,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 2.156,
        "quantity": "280ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED TIRAMISU LATTE",
    "slug": "iced-tiramisu-latte",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Anchor Natural Whipping Cream 1 L",
        "cost": 0.48,
        "quantity": "20ml",
        "source": "Invoice"
      },
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 1.386,
        "quantity": "18g",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Kasar Gula Pasir 1 kg",
        "cost": 0.011,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 2.156,
        "quantity": "280ml",
        "source": "Invoice"
      },
      {
        "name": "Cream Mascarpone 500 g",
        "cost": 0.945,
        "quantity": "15g",
        "source": "Invoice"
      },
      {
        "name": "Monin Vanilla Syrup 700 ml",
        "cost": 0.1886,
        "quantity": "3ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "MANGO AHYAT MILKSHAKE",
    "slug": "mango-ahyat-milkshake",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Full Cream Milk 1 l",
        "cost": 0.49,
        "quantity": "70ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Dome Lid 100 pcs",
        "cost": 0.12,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "TNL Mango Filling 1 kg",
        "cost": 1.2,
        "quantity": "60g",
        "source": "Invoice"
      },
      {
        "name": "F&N Magnolia Vanilla Ice Cream 1.5 l",
        "cost": 0.8335,
        "quantity": "140ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "MATCHA MILKSHAKE",
    "slug": "matcha-milkshake",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Full Cream Milk 1 l",
        "cost": 0.42,
        "quantity": "60ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Dome Lid 100 pcs",
        "cost": 0.12,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Kyn Matcha Powder 1 kg",
        "cost": 1.89,
        "quantity": "15g",
        "source": "Invoice"
      },
      {
        "name": "F&N Magnolia Vanilla Ice Cream 1.5 l",
        "cost": 0.8335,
        "quantity": "140ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "OCEAN BLUE FIZZY SODA",
    "slug": "ocean-blue-fizzy-soda",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Da Vinci Blue Ocean Syrup 750 ml",
        "cost": 2.49,
        "quantity": "45ml",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "f&n ice cream soda 1.5 l",
        "cost": 0.0067,
        "quantity": "3ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ORANGE COLD PRESSED JUICE",
    "slug": "orange-cold-pressed-juice",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Buah Orange 1 pcs",
        "cost": 1.5,
        "quantity": "5pcs",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "POMEGRANATE FIZZY SODA",
    "slug": "pomegranate-fizzy-soda",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Da Vinci Pomegranate Syrup 750 ml",
        "cost": 2.49,
        "quantity": "45ml",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "f&n ice cream soda 1.5 l",
        "cost": 0.0067,
        "quantity": "3ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "STRAWBERRY MILKSHAKE",
    "slug": "strawberry-milkshake",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Full Cream Milk 1 l",
        "cost": 0.49,
        "quantity": "70ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Dome Lid 100 pcs",
        "cost": 0.12,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Strawberry Puree 1kg",
        "cost": 1.2,
        "quantity": "60g",
        "source": "Invoice"
      },
      {
        "name": "F&N Magnolia Vanilla Ice Cream 1.5 l",
        "cost": 0.8335,
        "quantity": "140ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TEADROP TEA IN POT - CHAMOMILE BLOSSOM",
    "slug": "teadrop-tea-in-pot-chamomile-blossom",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Teadrop Chamomile Blossom Tea 25 pcs",
        "cost": 1.84,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TEADROP TEA IN POT - ENGLISH BREAKFAST",
    "slug": "teadrop-tea-in-pot-english-breakfast",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Teadrop English Breakfast Tea 25 pcs",
        "cost": 2.0,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TEADROP TEA IN POT - ORIENTAL JASMINE TEA",
    "slug": "teadrop-tea-in-pot-oriental-jasmine-tea",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Teadrop Oriental Jasmine Tea Tea 25 pcs",
        "cost": 1.84,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TEADROP TEA IN POT - PEPPERMINT",
    "slug": "teadrop-tea-in-pot-peppermint",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Teadrop Peppermint Tea 25 pcs",
        "cost": 2.0,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TEADROP TEA IN POT - SUPREME EARL GREY",
    "slug": "teadrop-tea-in-pot-supreme-earl-grey",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Teadrop Supreme Earl Grey Tea 25 pcs",
        "cost": 2.0,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TEH TARIK",
    "slug": "teh-tarik",
    "sellingPrice": 6,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Marigold Teh Tarik Sweetened Milk 500 g",
        "cost": 0.222,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "F& N Teh Tarik Krimer Sejat 390 g",
        "cost": 0.1615,
        "quantity": "15g",
        "source": "Invoice"
      },
      {
        "name": "9oz Hot Cup 20 pcs",
        "cost": 0.29,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lower Black Hot Cup Lid 100 pcs",
        "cost": 0.155,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Upper White Hot Cup Lid 100 pcs",
        "cost": 0.085,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Lipton Catering Teabags Tea 100 pcs",
        "cost": 0.0292,
        "quantity": "0.4pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "WATERMELON COLD PRESSED JUICE",
    "slug": "watermelon-cold-pressed-juice",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "tembikai 1 kg",
        "cost": 2.66,
        "quantity": "700g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "PASSION FRUIT FIZZY SODA",
    "slug": "passion-fruit-fizzy-soda",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Da Vinci Passion Fruit Syrup 750 ml",
        "cost": 2.49,
        "quantity": "45ml",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "f&n ice cream soda 1.5 l",
        "cost": 0.0067,
        "quantity": "3ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CALLEBAUT CHOCOLATE CAKE",
    "slug": "callebaut-chocolate-cake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Callebaut Chocolate Cake",
        "cost": 9.5,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BISCOFF LAYER CHEESECAKE",
    "slug": "biscoff-layer-cheesecake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Biscoff Layer Cheesecake",
        "cost": 7.9,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ALMOND TIRAMISU CAKE",
    "slug": "almond-tiramisu-cake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Almond Tiramisu Cake",
        "cost": 8.25,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TIRAMISU CAKE",
    "slug": "tiramisu-cake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Tiramisu Cake",
        "cost": 7.5,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "MILKY CHOCOLATE CAKE",
    "slug": "milky-chocolate-cake",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Milky Chocolate Cake",
        "cost": 7.0,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "STRAWBERRY FROMAGE CAKE",
    "slug": "strawberry-fromage-cake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Strawberry Fromage Cake",
        "cost": 8.5,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "PISTACHIO CROISSANT",
    "slug": "pistachio-croissant",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "LAVA CAKE",
    "slug": "lava-cake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Lava Cake",
        "cost": 7.0,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TIRAMISU IN CUP",
    "slug": "tiramisu-in-cup",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Tiramisu in Cup",
        "cost": 7.5,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "3PCS MACARON",
    "slug": "3pcs-macaron",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Macaron",
        "cost": 3.6,
        "quantity": "3pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "MATCHA OPERA CAKE",
    "slug": "matcha-opera-cake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Matcha Opera Cake",
        "cost": 7.85,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CHOCOLATE GANACHE CAKE",
    "slug": "chocolate-ganache-cake",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Chocolate Ganache Cake",
        "cost": 6.8,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HAZELNUT OPERA CAKE",
    "slug": "hazelnut-opera-cake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Hazelnut Opera Cake",
        "cost": 0,
        "quantity": "1#N/A",
        "source": "Missing"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "RAINBOW CAKE",
    "slug": "rainbow-cake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Rainbow Cake",
        "cost": 6.6,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HOJICHA CAKE",
    "slug": "hojicha-cake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Hojicha Cake",
        "cost": 0,
        "quantity": "1#N/A",
        "source": "Missing"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "PISTACHIO PRALINE",
    "slug": "pistachio-praline",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Pistachio Praline",
        "cost": 7.6667,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CHOCOLATE ALMOND DANISH",
    "slug": "chocolate-almond-danish",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Almond Chocolate Danish",
        "cost": 7.5,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "RASPBERRY OPERA CAKE",
    "slug": "raspberry-opera-cake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Raspberry Opera Cake",
        "cost": 7.85,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CINNAMON ROLL",
    "slug": "cinnamon-roll",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "Pain Au Cinnamon",
        "cost": 5.0,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "FRENCH BUTTER CROISSANT",
    "slug": "french-butter-croissant",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Tanned Kitchen Plain Croissant Puff Pastry 1 pcs",
        "cost": 4.5,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "SIGNATURE OPERA CAKE",
    "slug": "signature-opera-cake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Signature Opera Cake",
        "cost": 7.4,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "MOCHA CAKE",
    "slug": "mocha-cake",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Mocha Cake",
        "cost": 7.0,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CHICKEN TOAST & CHEESE DANISH PASTRY",
    "slug": "chicken-toast-and-cheese-danish-pastry",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Puteri Chili Sauce 4.3 kg",
        "cost": 0.0349,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Parsley 500 g",
        "cost": 1.6,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "[AUTO-INJECT] STANDARD CAFE SIDES",
        "cost": 3.0,
        "quantity": "1portion",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ISPAHAN",
    "slug": "ispahan",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "Ispahan",
        "cost": 9.5,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "DARK CHOCOLATE MILLE CREPE",
    "slug": "dark-chocolate-mille-crepe",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Dark Choc Mille-crepe",
        "cost": 7.4167,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CARAMELIS CHOCOLATE",
    "slug": "caramelis-chocolate",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Caramelis Chocolate",
        "cost": 7.0,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "PEACH LYCHEE DOUBLE CHEESE",
    "slug": "peach-lychee-double-cheese",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "Peach Lychee Double Cheese",
        "cost": 7.4167,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "WALNUT BROWNIES",
    "slug": "walnut-brownies",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Walnut Bownies",
        "cost": 7.0,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "HAZELNUT",
    "slug": "hazelnut",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "Hazelnut",
        "cost": 3.5,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CLASSIC CAPPUCINO",
    "slug": "classic-cappucino",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Classic Cappucino",
        "cost": 7.5,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "MISSISSIPI MUD CAKE",
    "slug": "mississipi-mud-cake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Missisipi Mud Cake",
        "cost": 8.8,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "1PCS MACARON",
    "slug": "1pcs-macaron",
    "sellingPrice": 5,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Macaron",
        "cost": 1.2,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BURNT CHEESECAKE",
    "slug": "burnt-cheesecake",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "TNL Foods Burnt Cheesecake 2.5 Round Cheesecake 1 pcs",
        "cost": 0.0,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CARAMEL CHOCOLATE MOUSSECAKE",
    "slug": "caramel-chocolate-moussecake",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BURNT CHEESECAKE",
    "slug": "burnt-cheesecake-v2",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "TNL Foods Burnt Cheesecake 2.5 Round Cheesecake 1 pcs",
        "cost": 0.0,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Biscoff Lotus Biscuit 250 g",
        "cost": 0.34,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.925,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.6,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "MIXED FRUIT CUTS",
    "slug": "mixed-fruit-cuts",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "tembikai 1 kg",
        "cost": 0.456,
        "quantity": "120g",
        "source": "Invoice"
      },
      {
        "name": "Buah Orange 1 pcs",
        "cost": 2.1,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CHICKEN SANDWICH",
    "slug": "chicken-sandwich",
    "sellingPrice": 8,
    "targetMargin": 55,
    "category": "Sides & Components",
    "ingredients": [
      {
        "name": "Dada Ayam tanpa Tulang",
        "cost": 0.085,
        "quantity": "12.5g",
        "source": "Invoice"
      },
      {
        "name": "Gardenia Bonanza White Loaf 20 s",
        "cost": 0.6,
        "quantity": "4s",
        "source": "Invoice"
      },
      {
        "name": "Lady's Choice Mayonaise 3 L",
        "cost": 0.1148,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Lada Hitam 1kg",
        "cost": 0.0119,
        "quantity": "0.25g",
        "source": "Invoice"
      },
      {
        "name": "F& N Teh Tarik Krimer Sejat 390 g",
        "cost": 0.0054,
        "quantity": "0.5g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "EGG SANDWICH",
    "slug": "egg-sandwich",
    "sellingPrice": 8,
    "targetMargin": 55,
    "category": "Sides & Components",
    "ingredients": [
      {
        "name": "Grade B Chicken Egg 30 pcs",
        "cost": 0.12,
        "quantity": "0.3pcs",
        "source": "Invoice"
      },
      {
        "name": "Gardenia Bonanza White Loaf 20 s",
        "cost": 0.6,
        "quantity": "4s",
        "source": "Invoice"
      },
      {
        "name": "Lady's Choice Mayonaise 3 L",
        "cost": 0.0718,
        "quantity": "6.25g",
        "source": "Invoice"
      },
      {
        "name": "Lada Hitam 1kg",
        "cost": 0.0119,
        "quantity": "0.25g",
        "source": "Invoice"
      },
      {
        "name": "F& N Teh Tarik Krimer Sejat 390 g",
        "cost": 0.0054,
        "quantity": "0.5g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "TUNA SANDWICH",
    "slug": "tuna-sandwich",
    "sellingPrice": 8,
    "targetMargin": 55,
    "category": "Sides & Components",
    "ingredients": [
      {
        "name": "Ayam Brand Tuna 400g",
        "cost": 2.37,
        "quantity": "45g",
        "source": "Invoice"
      },
      {
        "name": "Gardenia Bonanza White Loaf 20 s",
        "cost": 0.3,
        "quantity": "2s",
        "source": "Invoice"
      },
      {
        "name": "Lady's Choice Mayonaise 3 L",
        "cost": 0.1148,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "A&A Hartamas Lime Juice 1000 ml",
        "cost": 0.0075,
        "quantity": "1ml",
        "source": "Invoice"
      },
      {
        "name": "Cili Padi Merah 1 kg",
        "cost": 0.0075,
        "quantity": "0.5g",
        "source": "Invoice"
      },
      {
        "name": "Capsicum Hijau 1 kg",
        "cost": 0.063,
        "quantity": "3.5g",
        "source": "Invoice"
      },
      {
        "name": "Lada Hitam 1kg",
        "cost": 0.0119,
        "quantity": "0.25g",
        "source": "Invoice"
      },
      {
        "name": "Fine Salt 350 g",
        "cost": 0.0,
        "quantity": "0.25g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Besar Merah 1 kg",
        "cost": 0.0015,
        "quantity": "0.25g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "LEMON MINT FISSION",
    "slug": "lemon-mint-fission",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "lemon 1 nos",
        "cost": 0.2,
        "quantity": "0.1pcs",
        "source": "Invoice"
      },
      {
        "name": "Daun Pudina 200 g",
        "cost": 0.04,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "Kasar Gula Pasir 1 kg",
        "cost": 0.0183,
        "quantity": "5g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "COLESLAW",
    "slug": "coleslaw",
    "sellingPrice": 8,
    "targetMargin": 55,
    "category": "Sides & Components",
    "ingredients": [
      {
        "name": "COLESLAW",
        "cost": 1.1121,
        "quantity": "150gram",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "GRILLED CHICKEN CHOP ONLY WITH MUSHROOM SAUCE",
    "slug": "grilled-chicken-chop-only-with-mushroom-sauce",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "FROZEN HONEY GLAZED CHICKEN CHOP 30PCS",
        "cost": 5.5,
        "quantity": "1#N/A",
        "source": "Supplier Proxy"
      },
      {
        "name": "MUSHROOM SAUCE",
        "cost": 2.52,
        "quantity": "90#N/A",
        "source": "Catering Proxy"
      },
      {
        "name": "[AUTO-INJECT] STANDARD CAFE SIDES",
        "cost": 3.0,
        "quantity": "1portion",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "GRILLED CHICKEN CHOP ONLY WITH BLACKPEPPER SAUCE",
    "slug": "grilled-chicken-chop-only-with-blackpepper-sauce",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "FROZEN HONEY GLAZED CHICKEN CHOP 30PCS",
        "cost": 5.5,
        "quantity": "1#N/A",
        "source": "Supplier Proxy"
      },
      {
        "name": "CREAMY BLACKPEPPER SAUCE 9KG",
        "cost": 1.35,
        "quantity": "90#N/A",
        "source": "B2B Proxy"
      },
      {
        "name": "[AUTO-INJECT] STANDARD CAFE SIDES",
        "cost": 3.0,
        "quantity": "1portion",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BLANCED VEGETABLE",
    "slug": "blanced-vegetable",
    "sellingPrice": 8,
    "targetMargin": 55,
    "category": "Sides & Components",
    "ingredients": [
      {
        "name": "Carrot 3 kg",
        "cost": 0.0132,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Cauliflower",
        "cost": 0.1,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Broccoli",
        "cost": 0.4,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Unsalted Butter 5 kg",
        "cost": 0.92,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.039,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0137,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Knorr Chicken Stock 1 kg",
        "cost": 0.075,
        "quantity": "3g",
        "source": "Invoice"
      },
      {
        "name": "Eagle Kasar Serbuk Lada Hitam 250 g",
        "cost": 0.36,
        "quantity": "3g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "FRENCH FRIES (100g per Pax)",
    "slug": "french-fries-100g-per-pax",
    "sellingPrice": 8,
    "targetMargin": 55,
    "category": "Sides & Components",
    "ingredients": [
      {
        "name": "C&G Crincle Fries 1 kg",
        "cost": 0.819,
        "quantity": "100g",
        "source": "Invoice"
      },
      {
        "name": "Palm Oil 8.5 kg",
        "cost": 0.6618,
        "quantity": "90g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "SALAD CUCUMBER & TOMATO",
    "slug": "salad-cucumber-and-tomato",
    "sellingPrice": 8,
    "targetMargin": 55,
    "category": "Sides & Components",
    "ingredients": [
      {
        "name": "green coral salad 1 kg",
        "cost": 0.21,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Timun Jepun 500 g",
        "cost": 0.2,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Tomato 1 kg",
        "cost": 0.1,
        "quantity": "20g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "MINI CHURROS CATERING",
    "slug": "mini-churros-catering",
    "sellingPrice": 18,
    "targetMargin": 55,
    "category": "Churros",
    "ingredients": [
      {
        "name": "Tepung Churros",
        "cost": 0.5,
        "quantity": "0.25pkt",
        "source": "Invoice"
      },
      {
        "name": "TNL Foods Chocolate Ganache 1 kg",
        "cost": 0.3,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Daisy Corn Oil 3 kg",
        "cost": 0.0167,
        "quantity": "1g",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.0864,
        "quantity": "12.5g",
        "source": "Invoice"
      },
      {
        "name": "TNL Salted Caramel Sauce 1 kg",
        "cost": 0.3,
        "quantity": "10g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BREADED CHICKEN CHOP WITH BLACKPEPPER SAUCE",
    "slug": "breaded-chicken-chop-with-blackpepper-sauce",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "BREADED CHICKEN CHOP",
        "cost": 3.9517,
        "quantity": "150gram",
        "source": "Invoice"
      },
      {
        "name": "CREAMY BLACKPEPPER SAUCE 9KG",
        "cost": 1.35,
        "quantity": "90#N/A",
        "source": "B2B Proxy"
      },
      {
        "name": "[AUTO-INJECT] STANDARD CAFE SIDES",
        "cost": 3.0,
        "quantity": "1portion",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BREADED CHICKEN CHOP WITH BLACKPEPPER SAUCE",
    "slug": "breaded-chicken-chop-with-blackpepper-sauce-v2",
    "sellingPrice": 23,
    "targetMargin": 55,
    "category": "Western Mains",
    "ingredients": [
      {
        "name": "BREADED CHICKEN CHOP",
        "cost": 3.9517,
        "quantity": "150gram",
        "source": "Invoice"
      },
      {
        "name": "MUSHROOM SAUCE",
        "cost": 2.52,
        "quantity": "90#N/A",
        "source": "Catering Proxy"
      },
      {
        "name": "[AUTO-INJECT] STANDARD CAFE SIDES",
        "cost": 3.0,
        "quantity": "1portion",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CARBONARA STREAKY BEEF JR",
    "slug": "carbonara-streaky-beef-jr",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "Palm Oil 8.5 kg",
        "cost": 0.011,
        "quantity": "1.5g",
        "source": "Invoice"
      },
      {
        "name": "Hennies Streaky Beef 500 g",
        "cost": 0.74,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Parmesan Cheese 1kg",
        "cost": 0.2033,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.0195,
        "quantity": "1.5g",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 0.99,
        "quantity": "90g",
        "source": "Invoice"
      },
      {
        "name": "Parsley 500 g",
        "cost": 0.2,
        "quantity": "2.5g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Culinary Cream 1 l",
        "cost": 2.45,
        "quantity": "100ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CURRY CHICKEN CROISSANT",
    "slug": "curry-chicken-croissant",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "[AUTO-INJECT] STANDARD CAFE SIDES",
        "cost": 3.0,
        "quantity": "1portion",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "SPRING ONION ONICROISSANT",
    "slug": "spring-onion-onicroissant",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Desserts & Cakes",
    "ingredients": [
      {
        "name": "Palm Oil 8.5 kg",
        "cost": 0.011,
        "quantity": "1.5g",
        "source": "Invoice"
      },
      {
        "name": "Hennies Streaky Beef 500 g",
        "cost": 0.74,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Parmesan Cheese 1kg",
        "cost": 0.2033,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.0195,
        "quantity": "1.5g",
        "source": "Invoice"
      },
      {
        "name": "Prego Spaghetti 500 g",
        "cost": 0.99,
        "quantity": "90g",
        "source": "Invoice"
      },
      {
        "name": "Parsley 500 g",
        "cost": 0.2,
        "quantity": "2.5g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Culinary Cream 1 l",
        "cost": 2.45,
        "quantity": "100ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "Sunny Side Egg",
    "slug": "sunny-side-egg",
    "sellingPrice": 8,
    "targetMargin": 55,
    "category": "Sides & Components",
    "ingredients": [
      {
        "name": "Palm Oil 8.5 kg",
        "cost": 0.3676,
        "quantity": "50g",
        "source": "Invoice"
      },
      {
        "name": "Grade A Chicken Egg 30 pcs",
        "cost": 0.45,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "AYAM MASAK MERAH",
    "slug": "ayam-masak-merah",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "Bawang Besar Merah 1 kg",
        "cost": 0.225,
        "quantity": "37.5g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.0542,
        "quantity": "4.166666667g",
        "source": "Invoice"
      },
      {
        "name": "Halia Tua 250 g",
        "cost": 0.025,
        "quantity": "2.083333333g",
        "source": "Invoice"
      },
      {
        "name": "Lengkuas 1 kg",
        "cost": 0.0065,
        "quantity": "0.5416666667g",
        "source": "Invoice"
      },
      {
        "name": "Kayu Manis 500 g",
        "cost": 0.0044,
        "quantity": "0.125g",
        "source": "Invoice"
      },
      {
        "name": "Bunga Lawang 500 g",
        "cost": 0.0135,
        "quantity": "0.5416666667g",
        "source": "Invoice"
      },
      {
        "name": "Bunga Cengkih 250 g",
        "cost": 0.005,
        "quantity": "0.08333333333g",
        "source": "Invoice"
      },
      {
        "name": "Pelaga 500 g",
        "cost": 0.0167,
        "quantity": "0.08333333333g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0095,
        "quantity": "2.083333333g",
        "source": "Invoice"
      },
      {
        "name": "Sure Rasa Kabung Gula Melaka 60 kg",
        "cost": 0.0243,
        "quantity": "20.83333333g",
        "source": "Invoice"
      },
      {
        "name": "Maggi Cukup Rasa Seasoning 500 g",
        "cost": 0.0357,
        "quantity": "1.375g",
        "source": "Invoice"
      },
      {
        "name": "Sos cili kimball 1kg",
        "cost": 0.0286,
        "quantity": "2.75g",
        "source": "Invoice"
      },
      {
        "name": "Serai 20 pcs",
        "cost": 0.0187,
        "quantity": "0.08333333333pcs",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.1325,
        "quantity": "19.16666667g",
        "source": "Invoice"
      },
      {
        "name": "Ayam 1 ekor",
        "cost": 3.4375,
        "quantity": "0.125pcs",
        "source": "Invoice"
      },
      {
        "name": "Cili Kering Yidu 1 kg",
        "cost": 0.4792,
        "quantity": "10.41666667g",
        "source": "Invoice"
      },
      {
        "name": "Cili Kering Pedas 2.5 kg",
        "cost": 0.2333,
        "quantity": "10.41666667g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "NASI TOMATO",
    "slug": "nasi-tomato",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "Beras Jasmine 10 kg",
        "cost": 0.344,
        "quantity": "80g",
        "source": "Invoice"
      },
      {
        "name": "Marigold evaporated biru 390g",
        "cost": 0.1041,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Heinz Tomato Puree 3 kg",
        "cost": 0.1495,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Unsalted Butter 5 kg",
        "cost": 0.092,
        "quantity": "2g",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.0346,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Besar Merah 1 kg",
        "cost": 0.03,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.013,
        "quantity": "1g",
        "source": "Invoice"
      },
      {
        "name": "Halia Tua 250 g",
        "cost": 0.006,
        "quantity": "0.5g",
        "source": "Invoice"
      },
      {
        "name": "Kayu Manis 500 g",
        "cost": 0.0053,
        "quantity": "0.15g",
        "source": "Invoice"
      },
      {
        "name": "Bunga Lawang 500 g",
        "cost": 0.0037,
        "quantity": "0.15g",
        "source": "Invoice"
      },
      {
        "name": "Bunga Cengkih 250 g",
        "cost": 0.003,
        "quantity": "0.05g",
        "source": "Invoice"
      },
      {
        "name": "Pelaga 500 g",
        "cost": 0.01,
        "quantity": "0.05g",
        "source": "Invoice"
      },
      {
        "name": "Tomato 1 kg",
        "cost": 0.15,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0046,
        "quantity": "1g",
        "source": "Invoice"
      },
      {
        "name": "Kasar Gula Pasir 1 kg",
        "cost": 0.0037,
        "quantity": "1g",
        "source": "Invoice"
      },
      {
        "name": "Maggi Cukup Rasa Seasoning 500 g",
        "cost": 0.039,
        "quantity": "1.5g",
        "source": "Invoice"
      },
      {
        "name": "Minyak Sapi 800gm",
        "cost": 0.1713,
        "quantity": "2g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "DAGING MASAK HITAM",
    "slug": "daging-masak-hitam",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 2.3039,
        "quantity": "333.3333333g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Holland 1 kg",
        "cost": 2.4,
        "quantity": "300.0g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Besar Merah 1 kg",
        "cost": 1.2,
        "quantity": "200.0g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 1.04,
        "quantity": "80.0g",
        "source": "Invoice"
      },
      {
        "name": "Halia Tua 250 g",
        "cost": 0.96,
        "quantity": "80.0g",
        "source": "Invoice"
      },
      {
        "name": "Serai 20 pcs",
        "cost": 0.225,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Kayu Manis 500 g",
        "cost": 0.1167,
        "quantity": "3.333333333g",
        "source": "Invoice"
      },
      {
        "name": "Bunga Lawang 500 g",
        "cost": 0.025,
        "quantity": "1.0g",
        "source": "Invoice"
      },
      {
        "name": "Pelaga 500 g",
        "cost": 0.1333,
        "quantity": "0.6666666667g",
        "source": "Invoice"
      },
      {
        "name": "Bunga Cengkih 250 g",
        "cost": 0.04,
        "quantity": "0.6666666667g",
        "source": "Invoice"
      },
      {
        "name": "Baba's Serbuk Kari Ayam 1 kg",
        "cost": 3.5,
        "quantity": "100.0g",
        "source": "Invoice"
      },
      {
        "name": "Baba's Serbuk Cili 1 kg",
        "cost": 0.45,
        "quantity": "30.0g",
        "source": "Invoice"
      },
      {
        "name": "jintan manis 500 gm",
        "cost": 0.2016,
        "quantity": "8.0g",
        "source": "Invoice"
      },
      {
        "name": "Serbuk Kas Kas 500gm",
        "cost": 0.392,
        "quantity": "8.0g",
        "source": "Invoice"
      },
      {
        "name": "Heinz Tomato Puree 3 kg",
        "cost": 1.495,
        "quantity": "100.0g",
        "source": "Invoice"
      },
      {
        "name": "Jalen Kicap Manis 2L",
        "cost": 0.9533,
        "quantity": "86.66666667ml",
        "source": "Invoice"
      },
      {
        "name": "Kicap Masakan Cheong Caramel 375ml",
        "cost": 5.376,
        "quantity": "240.0ml",
        "source": "Invoice"
      },
      {
        "name": "Puteri Sos Tiram 4.2 kg",
        "cost": 0.2143,
        "quantity": "60.0g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0457,
        "quantity": "10.0g",
        "source": "Invoice"
      },
      {
        "name": "Kasar Gula Pasir 1 kg",
        "cost": 0.0732,
        "quantity": "20.0g",
        "source": "Invoice"
      },
      {
        "name": "Knorr Chicken Stock 1 kg",
        "cost": 0.5,
        "quantity": "20.0g",
        "source": "Invoice"
      },
      {
        "name": "Maggi Cukup Rasa Seasoning 500 g",
        "cost": 0.52,
        "quantity": "20.0g",
        "source": "Invoice"
      },
      {
        "name": "Daging Batang Pinang 2.5 kg",
        "cost": 4.53,
        "quantity": "150.0g",
        "source": "Invoice"
      },
      {
        "name": "Serbuk Jintan Putih 250g",
        "cost": 0.448,
        "quantity": "8.0g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "SAYUR ACAR",
    "slug": "sayur-acar",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "Timun Jepun 500 g",
        "cost": 0.0044,
        "quantity": "0.4444444444g",
        "source": "Invoice"
      },
      {
        "name": "Tomato 1 kg",
        "cost": 0.0017,
        "quantity": "0.3333333333g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Besar Merah 1 kg",
        "cost": 0.0007,
        "quantity": "0.1111111111g",
        "source": "Invoice"
      },
      {
        "name": "Cili Merah 150 g",
        "cost": 0.0001,
        "quantity": "0.01111111111g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0001,
        "quantity": "0.01111111111g",
        "source": "Invoice"
      },
      {
        "name": "Kasar Gula Pasir 1 kg",
        "cost": 0.0001,
        "quantity": "0.03333333333g",
        "source": "Invoice"
      },
      {
        "name": "A&A Hartamas Lime Juice 1000 ml",
        "cost": 0.0001,
        "quantity": "0.01666666667ml",
        "source": "Invoice"
      },
      {
        "name": "Carrot 3 kg",
        "cost": 0.0005,
        "quantity": "0.1111111111g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "PAPADOM",
    "slug": "papadom",
    "sellingPrice": 10,
    "targetMargin": 55,
    "category": "Catering & Events",
    "ingredients": [
      {
        "name": "Papadom 100g",
        "cost": 0.5,
        "quantity": "25g",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.1728,
        "quantity": "25g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CATERING  AIR KOTAK",
    "slug": "catering-air-kotak",
    "sellingPrice": 10,
    "targetMargin": 55,
    "category": "Catering & Events",
    "ingredients": [
      {
        "name": "air kotak",
        "cost": 0,
        "quantity": "1#N/A",
        "source": "Missing"
      }
    ]
  },
  {
    "name": "CATERING NUGGET",
    "slug": "catering-nugget",
    "sellingPrice": 10,
    "targetMargin": 55,
    "category": "Catering & Events",
    "ingredients": [
      {
        "name": "Nugget 1kg",
        "cost": 1.52,
        "quantity": "80kg",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.5529,
        "quantity": "80g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "BIHUN GORENG AYAM",
    "slug": "bihun-goreng-ayam",
    "sellingPrice": 10,
    "targetMargin": 55,
    "category": "Catering & Events",
    "ingredients": [
      {
        "name": "Bihun Faiza 400g",
        "cost": 0.75,
        "quantity": "66.66666667g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Besar Merah 1 kg",
        "cost": 0.1,
        "quantity": "16.66666667g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.0217,
        "quantity": "1.666666667g",
        "source": "Invoice"
      },
      {
        "name": "Cili Merah 150 g",
        "cost": 0.06,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Puteri Sos Tiram 4.2 kg",
        "cost": 0.0179,
        "quantity": "5g",
        "source": "Invoice"
      },
      {
        "name": "Jalen Lemak Manis Kicap 2 L",
        "cost": 0.055,
        "quantity": "5ml",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0076,
        "quantity": "1.666666667g",
        "source": "Invoice"
      },
      {
        "name": "Kasar Gula Pasir 1 kg",
        "cost": 0.0031,
        "quantity": "0.8333333333g",
        "source": "Invoice"
      },
      {
        "name": "Maggi Cukup Rasa Seasoning 500 g",
        "cost": 0.0433,
        "quantity": "1.666666667g",
        "source": "Invoice"
      },
      {
        "name": "Kobis Bulat 1kg",
        "cost": 0.12,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "Carrot 3 kg",
        "cost": 0.088,
        "quantity": "20g",
        "source": "Invoice"
      },
      {
        "name": "Chicken Breast 2 kg",
        "cost": 0.69,
        "quantity": "50g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "NASI LEMAK BIASA WITH SAMBAL & 1/8 AYAM PENYET",
    "slug": "nasi-lemak-biasa-with-sambal-and-1-8-ayam-penyet",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "NASI LEMAK BIASA",
        "cost": 2.305,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "SAMBAL NASI LEMAK 6.5KG",
        "cost": 1.5228,
        "quantity": "90#N/A",
        "source": "HoReCa Proxy"
      },
      {
        "name": "AYAM PENYET FROZEN 1 PCS",
        "cost": 2.5,
        "quantity": "0.5#N/A",
        "source": "Supplier Proxy"
      }
    ]
  },
  {
    "name": "NASI LEMAK BIASA WITH SAMBAL & 1/4 AYAM PENYET",
    "slug": "nasi-lemak-biasa-with-sambal-and-1-4-ayam-penyet",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Asian Mains",
    "ingredients": [
      {
        "name": "NASI LEMAK BIASA",
        "cost": 2.305,
        "quantity": "1portion",
        "source": "Invoice"
      },
      {
        "name": "SAMBAL NASI LEMAK 6.5KG",
        "cost": 1.5228,
        "quantity": "90#N/A",
        "source": "HoReCa Proxy"
      },
      {
        "name": "AYAM PENYET FROZEN 1 PCS",
        "cost": 5.0,
        "quantity": "1#N/A",
        "source": "Supplier Proxy"
      }
    ]
  },
  {
    "name": "STRAWBERRY MILKSHAKE (EVENT SALES)",
    "slug": "strawberry-milkshake-event-sales",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.4625,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Full Cream Milk 1 l",
        "cost": 0.245,
        "quantity": "35ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Dome Lid 100 pcs",
        "cost": 0.12,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Strawberry Puree 1kg",
        "cost": 0.6,
        "quantity": "30g",
        "source": "Invoice"
      },
      {
        "name": "F&N Magnolia Vanilla Ice Cream 1.5 l",
        "cost": 0.4167,
        "quantity": "70ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "DEATH BY CHOCOLATE (EVENT SALES)",
    "slug": "death-by-chocolate-event-sales",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.4625,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Full Cream Milk 1 l",
        "cost": 0.245,
        "quantity": "35ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "TNL Foods Chocolate Ganache 1 kg",
        "cost": 0.45,
        "quantity": "15g",
        "source": "Invoice"
      },
      {
        "name": "F&N Magnolia Chocolate Ice Cream 1.5 l",
        "cost": 0.4167,
        "quantity": "70ml",
        "source": "Invoice"
      },
      {
        "name": "Dome Lid 100 pcs",
        "cost": 0.12,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CARAMEL FRAPPE (EVENT SALES)",
    "slug": "caramel-frappe-event-sales",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "anchor aerosol whipped cream 400 gm",
        "cost": 0.4625,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Full Cream Milk 1 l",
        "cost": 0.245,
        "quantity": "35ml",
        "source": "Invoice"
      },
      {
        "name": "Dome Lid 100 pcs",
        "cost": 0.12,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "12oz Cold Cup 50 pcs",
        "cost": 0.285,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Catcher Salted Caramel Ganache 2 L",
        "cost": 0.6402,
        "quantity": "22ml",
        "source": "Invoice"
      },
      {
        "name": "F&N Magnolia Vanilla Ice Cream 1.5 l",
        "cost": 0.4167,
        "quantity": "70ml",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED MATCHA LATTE (EVENT SALES)",
    "slug": "iced-matcha-latte-event-sales",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 1.078,
        "quantity": "140ml",
        "source": "Invoice"
      },
      {
        "name": "Kyn Matcha Powder 1 kg",
        "cost": 1.008,
        "quantity": "8g",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED LATTE (EVENT SALES)",
    "slug": "iced-latte-event-sales",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "Sage Brazil Coffee Bean 1 kg",
        "cost": 0.77,
        "quantity": "10g",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 0.693,
        "quantity": "90ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "ICED CHOCOLATE RICH (EVENT SALES)",
    "slug": "iced-chocolate-rich-event-sales",
    "sellingPrice": 12,
    "targetMargin": 55,
    "category": "Beverages",
    "ingredients": [
      {
        "name": "TNL Foods Chocolate Ganache 1 kg",
        "cost": 1.35,
        "quantity": "45g",
        "source": "Invoice"
      },
      {
        "name": "Flat Cold Cup Lid 50 pcs",
        "cost": 0.11,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Barista Magnolia Natural Fresh Milk 1 l",
        "cost": 0.693,
        "quantity": "90ml",
        "source": "Invoice"
      },
      {
        "name": "50pcs 16oz pet cold cup 1 pkt",
        "cost": 0.3,
        "quantity": "1pcs",
        "source": "Invoice"
      },
      {
        "name": "Rich Chocolate Cocoa Powder 700g",
        "cost": 1.1786,
        "quantity": "15g",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "CHICKEN POPCORN",
    "slug": "chicken-popcorn",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Other",
    "ingredients": [
      {
        "name": "Nutriplus Chicken Popcorn",
        "cost": 2.92,
        "quantity": "106.6666667g",
        "source": "Invoice"
      },
      {
        "name": "minyak masak vesawit 8.5 kg",
        "cost": 0.2304,
        "quantity": "33.33333333g",
        "source": "Invoice"
      },
      {
        "name": "Sos cili kimball 1kg",
        "cost": 0.1733,
        "quantity": "16.66666667g",
        "source": "Invoice"
      },
      {
        "name": "Lady's Choice Mayonaise 3 L",
        "cost": 0.1914,
        "quantity": "16.66666667g",
        "source": "Invoice"
      },
      {
        "name": "[AUTO-INJECT] STANDARD CAFE SIDES",
        "cost": 3.0,
        "quantity": "1portion",
        "source": "Invoice"
      }
    ]
  },
  {
    "name": "LASAGNA JR 2.0",
    "slug": "lasagna-jr-2-0",
    "sellingPrice": 15,
    "targetMargin": 55,
    "category": "Pasta & Spaghetti",
    "ingredients": [
      {
        "name": "Minced Beef 2.5 kg",
        "cost": 0.6373,
        "quantity": "21.075g",
        "source": "Invoice"
      },
      {
        "name": "Beef Sausage Ramly",
        "cost": 0.4294,
        "quantity": "15.05g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Holland 1 kg",
        "cost": 0.0964,
        "quantity": "12.05g",
        "source": "Invoice"
      },
      {
        "name": "Bawang Putih 1 kg",
        "cost": 0.0234,
        "quantity": "1.8g",
        "source": "Invoice"
      },
      {
        "name": "MARINARA SAUCE 20KG",
        "cost": 0.2892,
        "quantity": "48.2#N/A",
        "source": "B2B Proxy"
      },
      {
        "name": "Kimball Tomato Puree",
        "cost": 0.0788,
        "quantity": "4.825g",
        "source": "Invoice"
      },
      {
        "name": "Basso Olive oil 3L",
        "cost": 0.3021,
        "quantity": "3.625ml",
        "source": "Invoice"
      },
      {
        "name": "Mixed Herb 500 g",
        "cost": 0.0342,
        "quantity": "0.6g",
        "source": "Invoice"
      },
      {
        "name": "Garam Halus Double Swallow 350 g",
        "cost": 0.0027,
        "quantity": "0.6g",
        "source": "Invoice"
      },
      {
        "name": "Beqa Tatura Cream Cheese",
        "cost": 1.403,
        "quantity": "30.5g",
        "source": "Invoice"
      },
      {
        "name": "Grade B Chicken Egg 30 pcs",
        "cost": 0.11,
        "quantity": "0.275pcs",
        "source": "Invoice"
      },
      {
        "name": "Parmesan Cheese 1kg",
        "cost": 0.0081,
        "quantity": "0.2g",
        "source": "Invoice"
      },
      {
        "name": "Daun parsley segar",
        "cost": 0.0147,
        "quantity": "0.6g",
        "source": "Invoice"
      },
      {
        "name": "Lasagna sheet 250g",
        "cost": 0.75,
        "quantity": "0.1pkt",
        "source": "Invoice"
      },
      {
        "name": "Mozarella Cheese 2 kg",
        "cost": 0.874,
        "quantity": "27.1g",
        "source": "Invoice"
      },
      {
        "name": "Anchor Natural Full Cream Milk 1 l",
        "cost": 0.0632,
        "quantity": "9.025ml",
        "source": "Invoice"
      }
    ]
  }
];

// Data Quality Summary:
// Invoice-verified: 997 ingredients (91.2%)
// Proxy-resolved:   90 ingredients (8.2%)
// Still missing:    6 ingredients (0.5%)
