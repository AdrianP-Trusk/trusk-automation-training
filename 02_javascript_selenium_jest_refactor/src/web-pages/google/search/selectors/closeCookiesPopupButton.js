const {By} = require("selenium-webdriver")

const closeCookiesPopupButton = By.xpath("//div[contains(text(), \"J'accepte\")]")

module.exports = closeCookiesPopupButton
