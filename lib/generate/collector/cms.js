const merge = require('lodash.merge');

const logger = require('../../utils/logger');
const authenticate = require('../authenticate');
const blockMagepack = require('../blockMagepack');
const collectModules = require('../collectModules');

const baseConfig = {
    url: '',
    name: 'cms',
    modules: {},
};

/**
 * Prepares a bundle configuration for all modules loaded on CMS pages.
 *
 * @param {BrowserContext} browserContext Puppeteer's BrowserContext object.
 * @param {object} configuration Generation configuration object.
 * @param {string} configuration.cmsUrl URL to the CMS page.
 * @param {string} configuration.authUsername Basic auth username.
 * @param {string} configuration.authPassword Basic auth password.
 */
const cms = async (browserContext, { cmsUrl, authUsername, authPassword }) => {
    const bundleConfig = merge({}, baseConfig);

    const bundleName = bundleConfig.name;

    logger.info(`Collecting modules for bundle "${bundleName}".`);

    const page = await browserContext.newPage();
    page.setDefaultNavigationTimeout(60000);

    blockMagepack(page);

    await authenticate(page, authUsername, authPassword);

    const response = await page.goto(cmsUrl, { waitUntil: 'networkidle0' });
    if (!response || !response.ok()) {
        throw new Error(
            `Page "${cmsUrl}" returned HTTP ${response ? response.status() : 'no response'} - cannot collect modules.`
        );
    }

    merge(bundleConfig.modules, await collectModules(page));

    await page.close();

    logger.success(`Finished collecting modules for bundle "${bundleName}".`);

    return bundleConfig;
};

module.exports = cms;
