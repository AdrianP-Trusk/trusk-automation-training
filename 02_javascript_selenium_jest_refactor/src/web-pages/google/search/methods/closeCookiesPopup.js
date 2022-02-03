const closeCookiesPopupButton = require("../selectors/closeCookiesPopupButton")

const closeCookiesPopup = async (webdriver) => {
    const buttonElement = await webdriver.findElement(closeCookiesPopupButton)
    await buttonElement.click()
}

module.exports = closeCookiesPopup
