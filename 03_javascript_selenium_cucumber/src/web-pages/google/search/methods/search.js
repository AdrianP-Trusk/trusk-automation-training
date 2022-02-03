const {Key} = require("selenium-webdriver")

const searchInput = require("../selectors/searchInput")

const search = async (webdriver, searchText) => {
    const searchInputElement = await webdriver.findElement(searchInput)
    await searchInputElement.sendKeys(`${searchText}${Key.ENTER}`)
}

module.exports = search
