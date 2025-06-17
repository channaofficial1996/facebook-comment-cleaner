
const puppeteer = require('puppeteer');

async function loginAndDelete(uid, password, otpCode) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.facebook.com/login');
  await page.type('#email', uid);
  await page.type('#pass', password);
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[name="login"]')
  ]);
  try {
    await page.waitForSelector('#approvals_code', { timeout: 5000 });
    await page.type('#approvals_code', otpCode);
    await page.click('#checkpointSubmitButton');
    await page.waitForTimeout(1000);
    await page.click('#checkpointSubmitButton');
  } catch (err) {
    console.log("No 2FA required or already passed");
  }
  console.log("Logged in.");
  await browser.close();
}
module.exports = { loginAndDelete };
