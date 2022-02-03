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
