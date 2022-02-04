[<-- Readme](Readme.md)

1. Créer un nouveau dossier
2. Executer `npm init`
3. Installer selenium avec `npm i selenium-webdriver`
4. Installer les dependences dev `npm i -D eslint jest jsdoc @types/selenium-webdriver chromedriver eslint-plugin-jest`
5. Initialiser jest avec `npx jest --init`
6. Initialiser eslint avec `npx eslint --init` et installer l'extension ESLint de VSCode
7. Créer un fichier `.editorconfig` a la racine du projet
8. Remplir le fichier `.editorconfig` avec
    ```editorconfig
    [.{js}]
    indent_size = 4
    indent_style = space
    ```
9. Modifier le fichier `.eslintrc.js`
    ```javascript
    module.exports = {
        "env": {
            "browser": true,
            "commonjs": true,
            "es2021": true,
            "jest/globals": true,
            "node": true,
        },
        "extends": [
            "google",
        ],
        "parserOptions": {
            "ecmaVersion": "latest",
        },
        "plugins": [
            "jest",
        ],
        "rules": {
            "indent": ["error", 4],
            "max-len": [
                "error",
                {
                    "code": 300,
                },
            ],
            "quotes": ["error", "double"],
            "semi": ["error", "never"],
        },
    }
    ```
10. Créer un dossier `.vscode` a la racine du projet
11. Créer le fichier `settings.json` dans le dossier `.vscode`
12. Remplir le fichier `settings.json`
    ```json
    {
        "editor.codeActionsOnSave": {
            "source.fixAll": true
        }
    }
    ```
13. Créer un dossier pour les tests `__tests__` a la racine du projet
14. Dans le dossier `__tests__` créer un fichier `googleSearch.test.js`
15. Créer la structure du test
    ```javascript
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

    describe("Given I am on Google", () => {
        beforeAll(async () => {
            // le code pour démarrer un chromedriver
            // le code pour ouvrir google
            // on attend que la page ait totalement chargé
            // fermer la popup
        })
        describe("When I search for something on Google", () => {
            beforeAll(async () => {
                // identifier et selectionner la barre de recherche
                // code pour faire la recherche
            })
            it("Then I am on the results page", async () => {
                // code pour verifier que la page est la page de resultats d'une recherche
            })
            it("And The first result is Wikipedia article", async () => {
                // identifier et selectionner le premier resultat de la recherche
                // obtenir l'element parent du h3 qui sera le lien qui nous interesse
                // obtenir l'attribut href du lien
                // verifier sa valeur
            })
        })
        afterAll(() => {
            // code pour fermer le chromedriver
        })
    })
    ```
16. Identifier les éléments d'interaction dans le test, les inspecter et trouver le meilleur selecteur possible
17. Identifier les actions selenium a effectuer et trouver le code correspondant dans la documentation ou en faisant des recherches
18. Implémenter le test
19. Create a `launch.json` file in `.vscode` folder
20. Remplir le fichier `launch.json`
    ```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Debug Jest Tests",
                "type": "node",
                "request": "launch",
                "runtimeArgs": [
                    "--inspect-brk",
                    "${workspaceRoot}/node_modules/.bin/jest",
                    "--runInBand",
                    "${workspaceRoot}/__tests__/google/SearchPage.test.js"
                ],
                "console": "integratedTerminal",
                "internalConsoleOptions": "neverOpen",
                "port": 9229
            }
        ]
    }
    ```
21. Debugger le test avec VSCode en mettant des points d'arret au besoin en utilisant l'onglet "Run and Debug"

# SOLUTION

    ```javascript
    const {Builder, By, Key} = require("selenium-webdriver")

    // eslint-disable-next-line no-unused-vars
    const {ThenableWebDriver} = require("@types/selenium-webdriver") // les types Typescript de selenium
    // on peut importer des types Typescript en Javascript et utiliser JSDoc pour reproduire le comportement de Typescript en ?Javascript
    // ca nous donne acces a une meilleure autocompletion et l'acces a la definition des methodes et les types attendus sur les parametres

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
    ```