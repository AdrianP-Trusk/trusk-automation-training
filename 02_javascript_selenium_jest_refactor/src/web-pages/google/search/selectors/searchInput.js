const {By} = require("selenium-webdriver")

const searchInput = By.xpath("//input[@name=\"q\"]")

module.exports = searchInput
