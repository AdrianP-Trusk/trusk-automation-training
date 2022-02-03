[<-- Readme](Readme.md)

1. Copy the project [01_javascript_selenium_jest_one_file](../01_javascript_selenium_jest_one_file)
2. Run `npm install`
3. Refactor the test file so you will use page object pattern and shared methods for all test actions

    ```javascript
    require("chromedriver")

    const webPages = require("../../src/web-pages")
    const webUtils = require("../../src/web-utils")

    jest.setTimeout(9000) // a supprimer plus tard

    /**
     * @type {ThenableWebDriver}
     */
    let webdriver

    describe("Given I am on Google", () => {
        beforeAll(async () => {
            webdriver = await webUtils.getWebdriver("chrome")
            await webdriver.get("https://www.google.com")
            await webPages.google.search.closeCookiesPopup(webdriver)
        })
        describe("When I search for something on Google", () => {
            beforeAll(async () => {
                await webPages.google.search.search(webdriver, "Hello World")
            })
            it("Then I am on the results page", async () => {
                const actualBrowserUrl = await webdriver.getCurrentUrl()
                expect(actualBrowserUrl).toEqual(expect.stringContaining("www.google.com/search?q=Hello+World"))
            })
            it("And The first result is Wikipedia article", async () => {
                const firstResultTitleElement = await webPages.google.results.getResultTitle(webdriver, "Hello world - Wikipédia")
                const firstResultLinkElement = await webUtils.getParentElement(webdriver, firstResultTitleElement)
                const firstLinkHref = await firstResultLinkElement.getAttribute("href")
                expect(firstLinkHref).toEqual("https://fr.wikipedia.org/wiki/Hello_world")
            })
        })
        afterAll(() => {
            webdriver.quit()
        })
    })
    ```

4. Now you have to create the files and methods in order for your test to run
5. First try to run the test
6. You should see an error

    ```bash
    Error: Cannot find module '/Users/adrianpothuaud/Documents/automation-training/02_javascript_selenium_jest_refactor/node_modules/.bin/jest'
        at Function.Module._resolveFilename (node:internal/modules/cjs/loader:933:15)
        at Function.Module._load (node:internal/modules/cjs/loader:778:27)
        at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
        at node:internal/main/run_main_module:17:47 {
        code: 'MODULE_NOT_FOUND',
        requireStack: []
    }
    ```

7. So create the required files

    ```
    mkdir src &&
    mkdir src/web-pages &&
    touch src/web-pages/index.js &&
    mkdir src/web-pages/google &&
    touch src/web-pages/google/index.js &&
    mkdir src/web-pages/google/search &&
    touch src/web-pages/google/search/index.js &&
    mkdir src/web-pages/google/search/methods &&
    touch src/web-pages/google/search/methods/closeCookiesPopup.js &&
    touch src/web-pages/google/search/methods/search.js &&
    mkdir src/web-pages/google/search/selectors &&
    mkdir src/web-pages/google/results &&
    touch src/web-pages/google/results/index.js &&
    mkdir src/web-pages/google/results/methods &&
    touch src/web-pages/google/results/methods/getResultTitle.js &&
    mkdir src/web-pages/google/results/selectors &&
    mkdir src/web-utils &&
    touch src/web-utils/index.js &&
    touch src/web-utils/getParentElement.js &&
    touch src/web-utils/getWebdriver.js
    ```

8. Let's start with web utils
9. In web-utils/getWebdriver write a reusable function to instantiate a new webdriver, with the type of webdriver as a function parameter

    ```javascript
    const {Builder} = require("selenium-webdriver")

    const getWebdriver = (browserName) => {
        if (!["chrome", "firefox"].includes(browserName)) throw new Error(`${browserName} is not supported`)
        const driver = new Builder().forBrowser(browserName).build()
        return driver
    }

    module.exports = getWebdriver
    ```

10. In web-utils/getParentElement write a reusable function to find the parent element of a given element, with the current webdriver instance and the child element as function parameters

    ```javascript
    const {By} = require("selenium-webdriver")

    const getParentElement = async (webdriver, childElement) => {
        const parentElement = await childElement.findElement(By.xpath("./.."))
        return parentElement
    }

    module.exports = getParentElement
    ```

11. In web=utils/index.js export the two methods we just created with the code below

    ```javascript
    const getParentElement = require("./getParentElement")
    const getWebdriver = require("./getWebdriver")

    module.exports = {
        getParentElement,
        getWebdriver,
    }
    ```

12. Now try to run the test again and we'll see what to do next from the next error (this is a TDD process that rocks !!). 

    A very good news is that a webbrowser is launched so we can see that it is not so bad yet ...

    Our next target is to write google page objects in order for the test to run without errors, as you can see with the error below, the error is saying that webPages.google is undefined.

    ```bash
    TypeError: Cannot read properties of undefined (reading 'search')

        16 |         await webdriver.get("https://www.google.com")
        > 18 |         await webPages.google.search.closeCookiesPopup()
            |                               ^
        19 |     })
        20 |     describe("When I search for something on Google", () => {
        21 |         beforeAll(async () => {

        at __tests__/google/SearchPage.test.js:18:31
    ```

13. In web-pages/index.js add the code below

    ```javascript
    const google = require("./google")

    module.exports = {
        google,
    }
    ```

14. In web-pages/google/index.js add the code below

    ```javascript
    const results = require("./results")
    const search = require("./search")

    module.exports = {
        results,
        search,
    }
    ```

15. In web-pages/google/results/index.js add

    ```javascript
    const getResultTitle = require("./methods/getResultTitle")

    module.exports = {
        getResultTitle,
    }
    ```

16. In web-pages/google/search/index.js add

    ```javascript
    const closeCookiesPopup = require("./methods/closeCookiesPopup")
    const search = require("./methods/search")

    module.exports = {
        closeCookiesPopup,
        search,
    }
    ```

17. Now it's time to implement page objects methods, but we'll start by creating the title element selector in web-pages/google/results/selectors/resultTitle.js

    ```javascript
    const {By} = require("selenium-webdriver")

    const resultTitle = (title) => By.xpath(`//h3[contains(text(), "${title}")]`)

    module.exports = resultTitle
    ```

    And in web-pages/google/results/methods/getResultTitle.js

    ```javascript
    const resultTitle = require("../selectors/resultTitle")

    const getResultTitle = async (webdriver, title) => {
        const resultTitleElement = await webdriver.findElement(resultTitle(title))
        return resultTitleElement
    }

    module.exports = getResultTitle
    ```

    Then next method is closeCookiesPopup, and again we start by the selector, in web-pages/google/search/selectors/closeCookiesPopupButton.js

    ```javascript
    const {By} = require("selenium-webdriver")

    const closeCookiesPopupButton = By.xpath("//div[contains(text(), \"J'accepte\")]")

    module.exports = closeCookiesPopupButton
    ```

    And in web-pages/google/search/methods/closeCookiesPopup.js

    ```javascript
    const closeCookiesPopupButton = require("../selectors/closeCookiesPopupButton")

    const closeCookiesPopup = async (webdriver) => {
        const buttonElement = await webdriver.findElement(closeCookiesPopupButton)
        await buttonElement.click()
    }

    module.exports = closeCookiesPopup
    ```

    Then to implement the search method, first in web-pages/google/search/selectors/searchInput.js

    ```javascript
    const {By} = require("selenium-webdriver")

    const searchInput = By.xpath("//input[@name=\"q\"]")

    module.exports = searchInput
    ```

    And finally in web-pages/google/search/methods/search.js

    ```javascript
    const {Key} = require("selenium-webdriver")

    const searchInput = require("../selectors/searchInput")

    const search = async (webdriver, searchText) => {
        const searchInputElement = await webdriver.findElement(searchInput)
        await searchInputElement.sendKeys(searchText)
        await searchInputElement.sendKeys(Key.ENTER)
    }

    module.exports = search
    ```

18. Now if we run the test again, ... CONGRATULATIONS!!!

```bash
 PASS  __tests__/google/SearchPage.test.js
  Given I am on Google
    When I search for something on Google
      ✓ Then I am on the results page (7 ms)
      ✓ And The first result is Wikipedia article (32 ms)
```