jest.mock('glob');
jest.mock('fs');

const { globSync } = require('glob');
const fs = require('fs');
const getLocales = require('./getLocales');

describe('getLocales utility', () => {
    test('is a function', () => {
        expect(typeof getLocales).toEqual('function');
    });

    test('returns found locales', () => {
        globSync.mockReturnValue(['pub/static/frontend/Magento/luma']);
        fs.existsSync.mockReturnValue(true);

        expect(getLocales()).toEqual(['pub/static/frontend/Magento/luma']);
    });

    test('returns found locales excluding blank theme', () => {
        globSync.mockReturnValue([
            'pub/static/frontend/Magento/luma',
            'pub/static/frontend/Magento/blank',
        ]);
        fs.existsSync.mockReturnValue(true);

        expect(getLocales()).toEqual(['pub/static/frontend/Magento/luma']);
    });

    test('returns found locales when using custom glob', () => {
        globSync.mockReturnValue(['pub/static/frontend/Magento/luma']);
        fs.existsSync.mockReturnValue(true);

        expect(getLocales('pub/static/frontend/Magento/luma')).toEqual([
            'pub/static/frontend/Magento/luma',
        ]);
    });

    test('throws error when locales are found but have no requirejs-config.js file', () => {
        globSync.mockReturnValue([]);
        fs.existsSync.mockReturnValue(false);

        expect(() => getLocales()).toThrow();
    });

    test('throws error when no locales are found', () => {
        globSync.mockReturnValue([]);

        expect(() => getLocales()).toThrow();
    });
});
