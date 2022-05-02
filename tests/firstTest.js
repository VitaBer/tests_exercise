const {Builder} = require ("selenium-webdriver");

async function navigation() {
let driver = await new Builder().forBrowser("chrome").build();
await driver.get("https://way2automation.com/way2auto_jquery/automation-practice-site.html");

}
navigation();