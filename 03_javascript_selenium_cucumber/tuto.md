[<-- Readme](Readme.md)

1. Copy the project [02_javascript_selenium_jest_refactor](../02_javascript_selenium_jest_refactor)
2. Run `npm install`
3. Install Cucumber.js library with `npm install --save-dev @cucumber/cucumber` et installer l'extension Cucumber de VSCode
4. Create Cucumber files structure

    ```bash
    mkdir features
    mkdir features/step_definitions
    ```

5. Write Google test scenario in Gherkin in file `features/google/search_sample.feature`

    ```gherkin
    Feature: Sample search on Google

        Scenario: Search for Hello World and first result is a Wikipedia article

            Given I am on Google Search page
            When I search for "Hello World"
            Then I am on Google Results page
            And The first result is Hello World Wikipedia article
    ```

6. According to https://cucumber.io/docs/guides/10-minute-tutorial/ create a new file `cucumber.js` at the root of the project with the following content

    ```javascript
    module.exports = {
        default: "--format-options '{\"snippetInterface\": \"synchronous\"}'",
    }
    ```

7. Add a test script dedicated to cucumber in your package.json file

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

8. Now try to run `npm run bdd`

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