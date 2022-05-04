const { Builder, until, By } = require("selenium-webdriver");

async function startWait() {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 2000)
  );
}

async function navigation() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().setTimeouts({ implicit: 10000 });

  // Navigate to starting url
  await driver.get("https://way2automation.com/way2auto_jquery/automation-practice-site.html");

  // Scroll to Alert button and click it
  const alertButton = await driver.findElement(By.xpath("//h2[text()='Alert']"));
  driver.executeScript("arguments[0].scrollIntoView(true);", alertButton);
  alertButton.click();

  // Wait for new tab to open
  await startWait();

  // Switch to opened tab
  const allTabs = await driver.getAllWindowHandles();
  await driver.switchTo().window(allTabs[1]);

  // Click on container's tab (Input Alert)
  const inputAlertTab = await driver.findElement(By.linkText("INPUT ALERT"));
  await inputAlertTab.click();

  {
    // Find iframe which contains button which launches the prompt
    const inputAlertTabiFrame = await driver.findElement(By.xpath('//iframe[@src="alert/input-alert.html"]'));
    // Switch to the iframe to click the buttton
    await driver.switchTo().frame(inputAlertTabiFrame);

    const inputAlertButton = await driver.findElement(By.xpath('//button[text()="Click the button to demonstrate the Input box."]'))
    await inputAlertButton.click();
    // Wait for the alert to be displayed
    await driver.wait(until.alertIsPresent());
    // Store the alert in a variable
    let alert = await driver.switchTo().alert();
    // Enter name
    await alert.sendKeys("Vita");

    //Press the OK button
    await alert.accept();

    // Return to the top main context (outside of iframe)
    await driver.switchTo().defaultContent();
  }
}

navigation();
