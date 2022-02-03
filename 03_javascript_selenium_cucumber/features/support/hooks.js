const {After, Before} = require("@cucumber/cucumber")

const webUtils = require("../../src/web-utils")

Before({tags: "@google_chrome"}, function() {
    this.webdriver = webUtils.getWebdriver("chrome")
})

After({tags: "@google_chrome"}, async function() {
    await this.webdriver.quit()
})
