const { test, expect } = require("@playwright/test");

test("Register Test Case", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");

  const registerButton = page.locator(".text-reset");
  const firstName = page.locator("#firstName");
  const lastName = page.locator("#lastName");
  const email = page.locator("[type='email']");
  const mobileNumber = page.locator("[formcontrolname='userMobile']");
  const occup = page.locator("[formcontrolname='occupation']");
  const gender = page.locator("[value='Male']");
  const password = page.locator("#userPassword");
  const conPassword = page.locator("#confirmPassword");
  const adult = page.locator("[type='checkbox']");
  const reg = page.locator("[value='Register']");
  const loginRedirect = page.locator(".btn.btn-primary");
  const login = page.locator("#login");

  //register
  await registerButton.click();
  await firstName.fill("Rishi");
  await lastName.fill("Govind");
  await email.fill("rishi.govind@gmail.com");
  await mobileNumber.fill("8080567421");
  await occup.selectOption("3: Engineer");
  await gender.click();
  await password.fill("Rishi@123");
  await conPassword.fill("Rishi@123");
  await adult.click();
  await reg.click();
  await loginRedirect.click();
});

test.only("Login Test Case", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");

  const email = page.locator("[type='email']");
  const password = page.locator("#userPassword");
  const login = page.locator("#login");
  const product = page.locator(".card-body b");
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const cartButton = page.locator("[routerlink='/dashboard/cart']");
  const checkoutButton = page.locator("text=Checkout");
  const creditCard = page.locator(".field").filter({ hasText: "Credit Card Number" }).locator("input");
  const expMonth=page.locator(".input.ddl");
  const expYear=page.locator(".input.ddl");
  const cvvCode=page.locator(".field").filter({ hasText: "CVV Code " }).locator("input")
  const nameCard=page.locator(".field").filter({ hasText: "Name on Card " }).locator("input")
  const country=page.locator("[placeholder='Select Country']")
  const dropCountry=page.locator(".ta-results")
  const placeOrder=page.locator(".action__submit")
  const orderDetails=page.locator("button[routerlink*='myorders']")

  //login

  await email.fill("rishi.govind@gmail.com");
  await password.fill("Rishi@123");
  await login.click();

  await page.waitForLoadState("networkidle");
  await product.nth(0).waitFor();

  const allProduct = await product.allTextContents();
  console.log(allProduct);
  //   await expect(productName).toContain("ADIDAS ORIGINAL")

  //Zara Coat 4

  const count = await products.count();

  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      //add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await cartButton.click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  await checkoutButton.click();
  await creditCard.fill("5862 5876 4239 8731");
  await expMonth.nth(0).selectOption({label:'04'})
  await expYear.nth(1).selectOption({label:'27'})
  await cvvCode.fill("854")
  await nameCard.fill("Rishi Govind")
  await country.pressSequentially("ind",{delay:150})
  await dropCountry.waitFor();
  const dropCount=await dropCountry.locator("button").count();
  for(let i=0;i<dropCount;i++){

    const text = await dropCountry.locator("button").nth(i).textContent();
    if(text===" India")
    {
      await dropCountry.locator("button").nth(i).click();
      break; 
    }


  }

  await expect(page.locator(".user__name [type='text']").first()).toHaveText("rishi.govind@gmail.com")
  await placeOrder.click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
  const orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
  console.log(orderID)
  await orderDetails.click();
  await page.locator("tbody").waitFor()
  const rows=await page.locator("tbody tr")

  for(let i=0;i<await rows.count();i++){

    const rowOrderID=await rows.nth(i).locator("th").textContent();

    if(orderID.includes(rowOrderID)){

      await rows.nth(i).locator("button").first().click();
      break;

    }
  }
  const orderIdDetails=await page.locator(".col-text").textContent();
  expect(orderID.includes(orderIdDetails)).toBeTruthy();


  await page.pause()
  



});
