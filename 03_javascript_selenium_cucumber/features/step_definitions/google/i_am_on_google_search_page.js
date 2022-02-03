const {Given} = require("@cucumber/cucumber")

const webPages = require("../../../src/web-pages")

Given("I am on Google Search page", async function() {
    await this.webdriver.get("https://www.google.com")
    await webPages.google.search.closeCookiesPopup(this.webdriver)
})
