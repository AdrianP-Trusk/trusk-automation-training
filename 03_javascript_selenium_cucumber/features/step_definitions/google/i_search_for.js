const {When} = require("@cucumber/cucumber")

const webPages = require("../../../src/web-pages")

When("I search for {string}", async function(searchText) {
    await webPages.google.search.search(this.webdriver, "Hello World")
})
