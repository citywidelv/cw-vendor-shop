// ============================================================
// City Wide Vendor Shop - Site Configuration
// Edit these values, save, and re-upload (or git push) to update the live site.
// ============================================================
window.CW_CONFIG = {
  // Shop title shown in the header and browser tab
  SITE_NAME: "City Wide Vendor Shop",

  // MASTER CATALOG: a Google Sheet published as CSV.
  // Edit products, prices, stocked status, and stock_qty in the Sheet and the
  // live site picks it up automatically (Google refreshes the published copy
  // every few minutes). Leave blank ("") to use the catalog.csv in this repo.
  // If the Sheet is ever unreachable, the site automatically falls back to
  // the repo's catalog.csv.
  CATALOG_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQKNqUqE4xDUT24EmeEthfuPYSvAO7nl5Fb1LbaE3-nU3V5t_EhJYtdk4AETcFiMIcQj2zDrkXgOWEl/pub?output=csv",

  // Where orders are sent.
  // Option A (recommended): create a free form endpoint at https://formspree.io,
  //   then paste its URL here, e.g. "https://formspree.io/f/abcdwxyz".
  //   Orders will arrive in your inbox as structured emails.
  // Option B: leave blank ("") and the site falls back to opening the
  //   vendor's email app with a pre-written order email to ORDER_EMAIL.
  ORDER_ENDPOINT: "https://formspree.io/f/xaqrwqlz",

  // Order log: a Google Apps Script webhook that appends every order to the
  // "Orders" tab of the CW Vendor Shop Catalog sheet (with Order Placed /
  // Picked Up checkboxes). Leave blank ("") to disable sheet logging.
  ORDERS_WEBHOOK: "https://script.google.com/macros/s/AKfycbzXd26tryRxa_W_DRRzDIkBoUgzzNe5As2p8LJqcg-9-sY89AmH_GaV-68nbHd0wqBS/exec",

  // Fallback / notification address for orders (used if the endpoint is unreachable)
  ORDER_EMAIL: "LVservicecall@gocitywide.com",
  // CC on fallback order emails
  ORDER_EMAIL_CC: "rnservicecall@gocitywide.com",

  // Default margin percent applied to any catalog row that has a "cost"
  // value but no "price". Rows with an explicit "price" are shown as-is.
  // Example: cost 100.00 with DEFAULT_MARGIN_PCT 25 displays as $125.00.
  DEFAULT_MARGIN_PCT: 25,

  // Sales tax estimate shown at checkout (0 to disable). 8.375 = Clark County NV.
  TAX_RATE_PCT: 0,

  // Text shown in the pricing notice at checkout
  PRICING_NOTICE:
    "This price list is for reference only and does not update automatically when supplier prices change. " +
    "The actual price charged is based on current supplier cost at the time the order is placed and may be " +
    "higher or lower than shown. By submitting an order you authorize City Wide to charge the current price " +
    "and agree that order totals are settled by pay deduction on your next statement.",
};
