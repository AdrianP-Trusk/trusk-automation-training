const {Then} = require("@cucumber/cucumber")
const expect = require("expect")

Then("I am on Google Results page", async function() {
    const actualBrowserUrl = await this.webdriver.getCurrentUrl()
    expect(actualBrowserUrl).toEqual(expect.stringContaining("www.google.com/search?q=Hello+World"))
})
