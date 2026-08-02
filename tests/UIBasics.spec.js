const { test, expect } = require("@playwright/test");

test("Browser Context Playwright Test", async ({ browser }) => {
  // chrome - plugins/ cookies

  const context = await browser.newContext();
  const page = await context.newPage();

  const userName = page.locator("#username");
  const userPassword = page.locator("[name='password']");
  const cardTitle = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  console.log(await page.title());
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

  //Selectors

  await userName.fill("rahulshettyacademy");
  await userPassword.fill("Learning@830$3mK2");
  await page.locator("[value='admin']").click();
  await page.locator("[name='signin']").click();

  //   const Incorrect = await page.locator("[style*='block']").textContent();
  //   console.log(Incorrect);
  //   await expect(page.locator("[style*='block']")).toContainText("Incorrect")

  // const firstProduct = await cardTitle.nth(0).textContent();
  // expect(firstProduct).toContain("iphone X");

  //all products title

  const allTitles = await cardTitle.allTextContents();
  console.log(allTitles);
});

test("Page Playwright Test", async ({ page }) => {
  await page.goto("https://google.com");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test("link blinking or not", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");

  const linkBlink = page.locator("[href*='rahul']");

  await expect(linkBlink).toHaveAttribute("class", "blinkingText");
});

test.only("Child page", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise");
  const userName = page.locator("#username");
  const linkBlink = page.locator("[href*='documents-request']");
  const childPage = context.waitForEvent("page");

  const [newPage]=await Promise.all([childPage, linkBlink.click()]);

  const text=await newPage.locator(".red").textContent();
  const arrayText=text.split("@")
  const domainName=arrayText[1].split(" ")[0]
  console.log(domainName)
  await userName.fill(domainName)
  const inputUser=await userName.inputValue();
  console.log(inputUser)




});
