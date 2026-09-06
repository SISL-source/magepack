# Magepack (SISL fork)

Advanced JavaScript bundling for Magento 2 — reduces the number of JS requests
on a storefront by an order of magnitude by merging RequireJS modules into a few
page-type bundles (common / cms / category / product / checkout).

This is a maintained fork of [magesuite/magepack](https://github.com/magesuite/magepack).
The upstream CLI has had **no release since October 2022** and shipped Puppeteer
`^2.1.1` (2020), which bundles a six-year-old Chromium that no longer starts on
current Linux distributions. This fork brings the toolchain up to date and makes
it work on **Magento 2.4.9 / PHP 8.4**.

## Why this fork exists

On a stock Magento 2 storefront the browser loads **200+ individual JS files**
through RequireJS. Magepack collects the modules actually used per page type and
merges them into a handful of bundles. Measured on a clean Magento 2.4.9 store,
this fork took a category page from **200 JS requests down to 11** (~95% fewer),
with no JavaScript errors on category, product or cart pages.

The original stopped being maintained and no longer runs on modern toolchains.
Rather than let a tool with tens of thousands of installs die, we revived it.

## What changed vs upstream 2.11.2

- **Puppeteer `^2.1.1` → `^24`** — modern Chrome for Testing, works out of the box
  on Debian bookworm, supports Node 18+ and ARM. Fixes the "Could not find Chrome"
  and "Failed to launch the browser process" failures on new environments.
- Puppeteer API migration: `createIncognitoBrowserContext` → `createBrowserContext`,
  `ignoreHTTPSErrors` → `acceptInsecureCerts`, removed `page.waitFor()`.
- **glob `^7` → `^11`**, dropping the deprecated `inflight`/`rimraf` transitive deps.
- Removed the `gzip-size` dependency in favour of Node's built-in `zlib`.
- `engines.node` raised to `>=18`; Puppeteer moved to a regular dependency.
- Fixes for long-standing upstream issues: fail early on a page returning 404/5xx
  during `generate` (#71); checkout no longer assumes a global `BASE_URL` (#48);
  null-safe swatch handling for stores without Magento_Swatches (#58/#26);
  deterministic module ordering in `magepack.config.js` (#23); navigation timeout
  raised to 60s (#11).

## Requirements

- Node.js >= 18
- Magento 2.4.6 – 2.4.9 storefront to point it at
- A store running in production mode with static content deployed (for `bundle`)

## Install

```bash
npm install -g @sisl/magepack   # or: npm install --save-dev
```

## Usage

```bash
# 1. Collect the module map from a running storefront
magepack generate \
  --cms-url      https://example.com/ \
  --category-url https://example.com/some-category.html \
  --product-url  https://example.com/some-product.html

# 2. Build the bundles (run after setup:static-content:deploy)
magepack bundle
```

Then install the companion Magento module
[magepack-magento (SISL fork)](https://github.com/SISL-source/magepack-magento)
and enable *Stores → Configuration → Advanced → Developer → JavaScript Settings →
Enable JavaScript Bundling with Magepack*.

## License

Same as upstream — see [LICENSE](LICENSE).

---

Maintained by [SISL](https://sisl.pl) — Magento 2 / Adobe Commerce studio.
Part of a set of revived, free, open-source Magento modules kept working on the
latest Magento releases.
