# City Wide Vendor Shop

A fast, self-hosted replacement for the Jotform vendor supply and uniform forms. One page, real search, category filters, a Warehouse Quick Order section (EnvirOx and uniforms), a cart, and pay-deduction checkout. No Jotform, no monthly platform fee.

The whole site is three files:

| File | What it is | Who touches it |
|---|---|---|
| `index.html` | The entire shop app | Nobody (unless changing design) |
| `catalog.csv` | Every product: names, prices, images, categories | **You**, whenever prices or products change |
| `config.js` | Order destination email/endpoint, default margin, tax | You, once at setup |

---

## 1. Put it on GitHub (one time, ~10 minutes)

1. Sign in at github.com, click **+** (top right) > **New repository**.
2. Name it `cw-vendor-shop`, set it to **Public** (required for free GitHub Pages), click **Create repository**.
3. Click **uploading an existing file**, drag in everything in this folder (`index.html`, `catalog.csv`, `config.js`, `README.md`, `.nojekyll`, and the `tools` folder), then **Commit changes**.
4. Go to **Settings > Pages**. Under "Branch," choose `main` and `/ (root)`, click **Save**.
5. Wait 1 to 2 minutes. Your shop is live at `https://YOURUSERNAME.github.io/cw-vendor-shop/`.

## 2. Your own web address

1. Buy a domain anywhere (Namecheap, Cloudflare, GoDaddy), e.g. `cwvendorshop.com`, or use a subdomain of a domain you already own, e.g. `shop.yourdomain.com`.
2. In the repo: **Settings > Pages > Custom domain**, type the domain, save. GitHub creates a `CNAME` file.
3. At your domain registrar, add a DNS record:
   - Subdomain (`shop.yourdomain.com`): a **CNAME** record pointing to `YOURUSERNAME.github.io`
   - Root domain (`cwvendorshop.com`): four **A** records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. Back in GitHub Pages settings, check **Enforce HTTPS** once it becomes available (up to 24h for DNS).

## 3. Receive orders in your inbox (5 minutes)

Out of the box, checkout opens the vendor's email app with the order pre-written to `ORDER_EMAIL`. That works, but a form endpoint is smoother:

1. Create a free account at **formspree.io** > New form > name it "Vendor Orders" > set the send-to address (e.g. tjroberts@gocitywide.com).
2. Copy the endpoint URL it gives you (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `config.js` as `ORDER_ENDPOINT` and re-upload `config.js`.

Every order now arrives as a structured email: vendor info, line items with SKUs and sizes, totals, and the pay-deduction acknowledgment.

## 4. Editing products & prices

Open `catalog.csv` (Excel works, or edit right in GitHub: click the file > pencil icon > commit). Columns:

- **name / sku / description**: what vendors see and search.
- **categories**: separate multiple with `;` (e.g. `Chemicals; TruShot`).
- **fulfillment**: `Warehouse` shows the red "In Stock at City Wide" badge; anything else shows "Supplier Order."
- **source**: your internal note of where it comes from (Brady, EnvirOx, Amazon...). Searchable.
- **price**: what the vendor is charged. OR leave price blank and fill **cost** (your supplier cost); the site charges `cost x (1 + margin)`, using **margin_pct** for that row or `DEFAULT_MARGIN_PCT` from `config.js`. That is your margin dial.
- **sizes**: comma list (`S,M,L,XL`). **size_prices**: per-size overrides like `XL=51.99|XXL=52.99`.
- **featured**: `1` puts it in Warehouse Quick Order at the top.
- **active**: set `0` to hide a product without deleting the row.

Commit the change; the live site updates within a minute or two.

## 5. Host your own images

Product images currently point at supplier websites (Brady's CDN, Amazon, etc.), same as the old Jotform. To own them, run this from the repo folder on your computer:

```
python3 tools/download_images.py
```

It downloads every image into `images/`, renames them by product id, and rewrites `catalog.csv` to use the local copies. Upload the `images/` folder and the updated `catalog.csv` to GitHub. Any images that fail (some sites block downloads) keep their original URL; grab those manually.

## 6. Rebuilding the catalog from scratch

`tools/build_catalog.py` contains the original product data extracted from the Jotform forms and regenerates `catalog.csv`. You should not need it again; day-to-day edits go straight into `catalog.csv`.

---

### What this site intentionally does NOT do

- **No credit card processing.** Orders are settled by pay deduction, which the vendor authorizes at checkout. If card payments become necessary later, the cleanest path is Stripe Payment Links or moving to Shopify.
- **No live Brady/Staples pricing.** Prices come from `catalog.csv`. Live supplier feeds require a punchout/API agreement with Staples Advantage or BradyPLUS (talk to your reps). If either grants access, this site's catalog can be fed by a sync script instead of manual edits, without changing anything vendors see.
- **No login.** The URL is unlisted but public. Do not put anything confidential in product descriptions.
