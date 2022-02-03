const {Builder} = require("selenium-webdriver")

const getWebdriver = (browserName) => {
    if (!["chrome", "firefox"].includes(browserName)) throw new Error(`${browserName} is not supported`)
    const driver = new Builder().forBrowser(browserName).build()
    return driver
}

module.exports = getWebdriver