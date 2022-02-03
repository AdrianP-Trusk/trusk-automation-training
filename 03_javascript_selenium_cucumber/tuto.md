[<-- Readme](Readme.md)

1. Copy the project [02_javascript_selenium_jest_refactor](../02_javascript_selenium_jest_refactor)
2. Run `npm install`
3. Install Cucumber.js library with `npm install --save-dev @cucumber/cucumber` et installer l'extension Cucumber de VSCode
4. Configure ESLint tool with Cucumber

    `npm install eslint-plugin-cucumber --save-dev`

    add `"cucumber"` to eslint config file plugins section

    disable `new-cap` eslint rule by adding `"new-cap": "off",` to your eslint config file, in the rules section

5. Create Cucumber files structure

    ```bash
    mkdir features
    mkdir features/step_definitions
    ```

6. Write Google test scenario in Gherkin in file `features/google/search_sample.feature`

    ```gherkin
    Feature: Sample search on Google

        @google_chrome
        Scenario: Search for Hello World and first result is a Wikipedia article

            Given I am on Google Search page
            When I search for "Hello World"
            Then I am on Google Results page
            And The first result is Hello World Wikipedia article
    ```

7. According to https://cucumber.io/docs/guides/10-minute-tutorial/ create a new file `cucumber.js` at the root of the project with the following content

    ```javascript
    module.exports = {
        default: "--format-options '{\"snippetInterface\": \"synchronous\"}'",
    }
    ```

8. Add a test script dedicated to cucumber in your package.json file

    ```json
    {
    "name": "javascript-selenium",
    "version": "1.0.0",
    "description": "",
    "scripts": {
        "bdd": "cucumber-js",
        "test": "jest"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
        "selenium-webdriver": "^4.1.1"
    },
    "devDependencies": {
        "@cucumber/cucumber": "^7.3.2",
        "@types/selenium-webdriver": "^4.0.17",
        "chromedriver": "^97.0.4",
        "eslint": "^8.8.0",
        "eslint-config-google": "^0.14.0",
        "eslint-plugin-jest": "^26.0.0",
        "jest": "^27.4.7",
        "jsdoc": "^3.6.10"
    }
    }
    ```

9. Now try to run `npm run bdd`

    ```bash
    > cucumber-js

    UUUU

    Failures:

    1) Scenario: Search for Hello World and first result is a Wikipedia article # features/google/search_sample.feature:3
    ? Given I am on Google Search page
        Undefined. Implement with the following snippet:

            Given('I am on Google Search page', function () {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
            });
        
    ? When I search for "Hello World"
        Undefined. Implement with the following snippet:

            When('I search for {string}', function (string) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
            });
        
    ? Then I am on Google Results page
        Undefined. Implement with the following snippet:

            Then('I am on Google Results page', function () {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
            });
        
    ? And The first result is Hello World Wikipedia article
        Undefined. Implement with the following snippet:

            Then('The first result is Hello World Wikipedia article', function () {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
            });
        

    1 scenario (1 undefined)
    4 steps (4 undefined)
    0m00.004s (executing steps: 0m00.000s)
    ```

10. Create a cucumber hook to run before any scenario with the tag `@google_chrom` in which we'll instantiate and setup a new chromedriver and save it to the scenario context. The webdriver will then be available on any step definition using `this` as the context object

    Create a file `features/support/hooks.js`

    ```javascript
    const {After, Before} = require("@cucumber/cucumber")

    const webUtils = require("../../src/web-utils")

    Before({tags: "@google_chrome"}, function() {
        this.webdriver = webUtils.getWebdriver("chrome")
    })

    After({tags: "@google_chrome"}, async function() {
        await this.webdriver.quit()
    })
    ```

11. Now it's time to wirte your first step definition, for this we'll create the following files and reuse our web pages and web utils that we created on latest step of these tutorials

    - create `features/step_definitions/google/i_am_on_google_search_page.js` and add

    ```javascript
    const {Given} = require("@cucumber/cucumber")

    const webPages = require("../../../src/web-pages")

    Given("I am on Google Search page", async function() {
        await this.webdriver.get("https://www.google.com")
        await webPages.google.search.closeCookiesPopup(this.webdriver)
    })
    ```

12. In order to check that the code we wrote is working, let's try again to run our test, we should see the webdriver opening and reaching google page

    `npm run bdd`

13. Now let's write other step definitions

    In `features/step_definitions/i_am_on_google_results_page.js`, write

    ```javascript
    const {Then} = require("@cucumber/cucumber")
    const expect = require("expect")

    Then("I am on Google Results page", async function() {
        const actualBrowserUrl = await this.webdriver.getCurrentUrl()
        expect(actualBrowserUrl).toEqual(expect.stringContaining("www.google.com/search?q=Hello+World"))
    })
    ```

    In `features/step_definitions/i_search_for.js`, write

    ```javascript
    const {When} = require("@cucumber/cucumber")

    const webPages = require("../../../src/web-pages")

    When("I search for {string}", async function(searchText) {
        await webPages.google.search.search(this.webdriver, "Hello World")
    })
    ```

    In `features/step_definitions/the_first_result_is_hello_world_wikipedia.js`, write

    ```javascript
    const {Then} = require("@cucumber/cucumber")
    const expect = require("expect")

    const webPages = require("../../../src/web-pages")
    const webUtils = require("../../../src/web-utils")

    Then("The first result is Hello World Wikipedia article", async function() {
        const firstResultTitleElement = await webPages.google.results.getResultTitle(this.webdriver, "Hello world - Wikipédia")
        const firstResultLinkElement = await webUtils.getParentElement(this.webdriver, firstResultTitleElement)
        const firstLinkHref = await firstResultLinkElement.getAttribute("href")
        expect(firstLinkHref).toEqual("https://fr.wikipedia.org/wiki/Hello_world")
    })
    ```

    
14. Now run test again and you're a winner !!! Congratulations 

    ```bash
    > javascript-selenium@1.0.0 bdd
    > cucumber-js

    ......

    1 scenario (1 passed)
    4 steps (4 passed)
    0m03.657s (executing steps: 0m03.643s)
    ```