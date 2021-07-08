import puppeteer from "puppeteer";

describe("User Stories", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false
    });
    page = await browser.newPage();
  });

  it("I want to sign in anonymously by filling out a username", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".login-page");
    await page.type("input", "Test User", { delay: 100 });
    //const text = await page.$eval("h1", (e) => e.textContent);
    await page.click("button.button");
    await page.waitForSelector(".dashboard-row")
  });

  it("If I have no session, the application should redirect me to the sign-in page.", async () => {
    await page.click(".header-user-logout button");
    await page.waitForSelector(".login-page");
    await page.goto("http://localhost:3000/some-invalid-url");
    await page.waitForSelector(".login-page")
  });

  it("After signing in successfully, I should see my to-do list in the center and my username on\n" +
    "the top right corner", async () => {
    await page.type("input", "Test User", { delay: 50 });
    await page.click("button.button");
    await page.waitForSelector(".todo-list");
    await page.waitForSelector(".header-user");
    await page.waitForTimeout(1000);
    const userName = await page.$eval(".header-user div:first-child", (e) => e.textContent);
    expect(userName).toEqual("Test User");
  });

  it("I should be able to add a to-do item by typing something and pressing enter", async () => {
    await page.type(".new-todo input", "Test todo task", { delay: 50 });
    await page.keyboard.press("Enter");
    await page.waitForSelector(".todo-list-item-content");
  });

  it("I should be able to edit a to-do item by clicking on the item and pressing enter after done typing", async () => {
    await page.click(".todo-list-item-content", { delay: 50 });
    await page.type(".todo-list-item-content input", " - edited", { delay: 50 });
    await page.keyboard.press("Enter");
    const editedTask = await page.$eval(".todo-list-item-content span", (e) => e.textContent);
    expect(editedTask).toEqual("Test todo task - edited")
  });

  it("I should be able to delete a to-do item by clicking an X button on the right side of the item", async () => {
    await page.waitForTimeout(500);
    await page.click(".item-remove")
    await page.waitForTimeout(1000);
  });

  it("should remove all todos and display no item text", async () => {
    await page.type(".new-todo input", "Test todo task", { delay: 50 });
    await page.keyboard.press("Enter");
    await page.waitForSelector(".todo-list-item-content");
    const querySelector = ".item-remove";
    await page.waitForSelector(querySelector);
    await page.evaluate((SELECTOR) => {
      let todoNodeList = document.querySelectorAll(SELECTOR);
      if (todoNodeList.length > 0)
        Array.from(todoNodeList, todoRemove => todoRemove.click());
    }, querySelector);
    await page.waitForTimeout(1000);
    const noItemsText = await page.$eval(".todo-list .no-items", (e) => e.textContent);
    if (noItemsText) {
      expect(noItemsText).toEqual("There are no items yet");
    }
  });

  it("should not add any todo task with empty string", async () => {
    await page.type(".new-todo input", "    ", { delay: 50 });
    await page.keyboard.press("Enter");
    await page.waitForSelector(".todo-list .no-items");
  })

  it("I should be able to log out by clicking on the logout button on the top right corner", async () => {
    await page.click(".header-user-logout button");
    await page.waitForSelector(".login-page");
  })

  afterAll(() => browser.close());
});