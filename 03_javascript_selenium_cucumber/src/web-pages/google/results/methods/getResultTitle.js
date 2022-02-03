const resultTitle = require("../selectors/resultTitle")

const getResultTitle = async (webdriver, title) => {
    const resultTitleElement = await webdriver.findElement(resultTitle(title))
    return resultTitleElement
}

module.exports = getResultTitle
