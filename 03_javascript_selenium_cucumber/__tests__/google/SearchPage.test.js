require("chromedriver")

const webPages = require("../../src/web-pages")
const webUtils = require("../../src/web-utils")

jest.setTimeout(99999) // a supprimer plus tard

/**
 * @type {ThenableWebDriver}
 */
let webdriver

describe("Given I am on Google", () => {
    beforeAll(async () => {
        webdriver = webUtils.getWebdriver("chrome")
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
