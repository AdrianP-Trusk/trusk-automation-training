const {Builder, By, Key} = require("selenium-webdriver")

// pour connaitre l'executable chromedriver il suffit de l'importer
require("chromedriver")

/**
 * Aller sur Google
 * Fermer la popup qui apparait quand on visite Google pour la premiere fois
 * (la session de chromedriver lancée par selenium sera vierge de tout cache et cookies)
 * Rentrer un mot dans la barre de recherche
 * Lancer la recherche
 * Verifier qu'on est sur la page resultats avec l'url /search
 * Recuperer le lien du premier resultat
 * Verifier que c'est un lien wikipedia
 */

// on modifie le timeout de la sequence de tests Jest pour que ca ne fail pas
// le timeout par default est de 5 secondes
// le timeout est en millisecondes
jest.setTimeout(99999)

// on declare le webdriver ici sans l'instancier pour qu'il soit accessible dans tous les blocs de code de test
/**
 * @type {ThenableWebDriver}
 */
let webdriver

describe("Given I am on Google", () => {
    beforeAll(async () => {
        // le code pour démarrer un chromedriver
        webdriver = await new Builder().forBrowser("chrome").build()
        // le code pour ouvrir google
        await webdriver.get("https://www.google.com")
        // on attend que la page ait totalement chargé
        await webdriver.sleep(1000) // c'est moche mais on verra plus tard comment optimiser ça
        // fermer la popup
        const acceptButtonXPath = "//div[contains(text(), \"J'accepte\")]" // le xpath du bouton
        const acceptButtonElement = webdriver.findElement(By.xpath(acceptButtonXPath)) // on selectionne l'elelement
        await acceptButtonElement.click() // on clique dessus
    })
    describe("When I search for something on Google", () => {
        beforeAll(async () => {
            // identifier et selectionner la barre de recherche
            const searchBarXPath = "//input[@name=\"q\"]"
            const searchBarElement = await webdriver.findElement(By.xpath(searchBarXPath))
            // code pour faire la recherche
            await searchBarElement.sendKeys("Hello World")
            await searchBarElement.sendKeys(Key.ENTER)
        })
        it("Then I am on the results page", async () => {
            // code pour verifier que la page est la page de resultats d'une recherche
            const actualBrowserUrl = await webdriver.getCurrentUrl()
            expect(actualBrowserUrl).toEqual(expect.stringContaining("www.google.com/search?q=Hello+World"))
        })
        it("And The first result is Wikipedia article", async () => {
            // identifier et selectionner le premier resultat de la recherche
            const firstTitleXPath = "//h3[contains(text(), \"Hello world - Wikipédia\")]"
            const firstTitleElement = await webdriver.findElement(By.xpath(firstTitleXPath))
            // obtenir l'element parent du h3 qui sera le lien qui nous interesse
            const firstLinkElement = firstTitleElement.findElement(By.xpath("./.."))
            // obtenir l'attribut href du lien
            const firstLinkHref = await firstLinkElement.getAttribute("href")
            // verifier sa valeur
            expect(firstLinkHref).toEqual("https://fr.wikipedia.org/wiki/Hello_world")
        })
    })
    afterAll(() => {
        // code pour fermer le chromedriver
        webdriver.quit()
    })
})
