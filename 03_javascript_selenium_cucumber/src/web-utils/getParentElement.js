const {By} = require("selenium-webdriver")

const getParentElement = async (webdriver, childElement) => {
    const parentElement = await childElement.findElement(By.xpath("./.."))
    return parentElement
}

module.exports = getParentElement
