const { chromium } = require('playwright');

async function checkSpeed(url) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(`http://${url}`);

    const navigationTimingJson = await page.evaluate(() =>
        JSON.stringify(performance.getEntriesByType('navigation'))
    )
    const navigationTiming = JSON.parse(navigationTimingJson);

    await browser.close();

    return navigationTiming[0];
}

module.exports = { checkSpeed };