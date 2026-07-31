const { test, expect } = require("@playwright/test");

test.only("Browser Context Playwright Test", async ({ browser }) => {
  // chrome - plugins/ cookies
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  //Selectors

  await page.locator("#username").fill("rahulshettyacadem");
  await page.locator("[name='password']").fill("Learning@830$3mK2");
  await page.locator("[value='admin']").click();
  await page.locator("[name='signin']").click();
  const Incorrect = await page.locator("[style*='block']").textContent();
  console.log(Incorrect);
  await expect(page.locator("[style*='block']")).toContainText("Incorrect")
});

test("Page Playwright Test", async ({ page }) => {
  await page.goto("https://google.com");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
