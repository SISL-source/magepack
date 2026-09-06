# Changelog

## 3.0.0-sisl.1

Maintained fork by SISL. First release compatible with Magento 2.4.9 / PHP 8.4.

- Puppeteer `^2.1.1` → `^24` (modern Chrome for Testing, Node 18+, ARM support).
- Puppeteer 2→24 API migration (browser context, insecure certs, removed `waitFor`).
- glob `^7` → `^11`; removed `gzip-size` in favour of built-in `zlib`.
- `engines.node` → `>=18`; Puppeteer is now a regular dependency.
- Fixed upstream issues: #71 (fail on non-200 pages), #48 (checkout BASE_URL),
  #58 / #26 (null-safe swatches), #23 (stable config order), #11 (60s timeout).

## 2.11.2 and earlier

See upstream [magesuite/magepack](https://github.com/magesuite/magepack).
