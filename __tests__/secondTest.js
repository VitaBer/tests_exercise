const { Builder, By } = require("selenium-webdriver");
const { expect }= require("expect");


async function startWait() {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 2000)
  );
}

async function formatDate(date) {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return year + '-' + month + '-' + day;
}

test('Second test - check if selected date is today', async () => {

  let driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().setTimeouts({ implicit: 10000 });

  // Navigate to starting url
  await driver.get("https://way2automation.com/way2auto_jquery/automation-practice-site.html");

  // Find Date picker and click on Datepicker
  await driver.findElement(By.xpath("//*[@id='wrapper']/div/div/div[2]"));
  let datePicker = await driver.findElement(By.xpath("//h2[text()='Datepicker']"));
  datePicker.click();

  //Navigate to Format date and click on it
  await startWait();
  const allTabs = await driver.getAllWindowHandles();
  await driver.switchTo().window(allTabs[1]);
  const formatDateTab = await driver.findElement(By.linkText("FORMAT DATE"));
  await formatDateTab.click();

  // Find Date input field and pick todays date in Datepicker 
  const dateInputButtonFrame = await driver.findElement(By.xpath('//iframe[@src="datepicker/defult4.html"]'));
  await driver.switchTo().frame(dateInputButtonFrame);
  //const datePickerInputField = await driver.findElement(By.id("datepicker"));
  const datePickerInputField = await driver.findElement(By.xpath('//input[@id="datepicker"]'));
  await datePickerInputField.click();

  //Select todays day
  await driver.findElement(By.id("ui-datepicker-div"));
  await driver.findElement(By.xpath("//td[contains(@class, 'ui-datepicker-today')]//a")).click();

  //Select "ISO 8601" format options
  const formatOptions = await driver.findElement(By.id("format"));
  await formatOptions.click();
  const isoSelection = await driver.findElement(By.xpath("//*[@id='format']/option[2]"));
  await isoSelection.click();
  
  //Check if selected day is "today"
  const todayDate = new Date();
  const todayDateString = await formatDate(todayDate);
  
  const selectedDateString = await datePickerInputField.getAttribute('value');
  await expect(selectedDateString).toBe(todayDateString);
}, 30000);