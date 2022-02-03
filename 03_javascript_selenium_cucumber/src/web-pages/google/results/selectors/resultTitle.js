const {By} = require("selenium-webdriver")

const resultTitle = (title) => By.xpath(`//h3[contains(text(), "${title}")]`)

module.exports = resultTitle
