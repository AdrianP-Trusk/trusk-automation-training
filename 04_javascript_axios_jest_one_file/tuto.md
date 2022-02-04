[<-- Readme](Readme.md)

1. Create a new folder
2. Initialize node project with `npm init`
3. Installer axios avec `npm i axios`
4. Installer les dependences dev avec `npm i -D eslint jest jsdoc @types/axios eslint-plugin-jest`
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
14. Dans le dossier `__tests__/jsonplaceholder` créer le ficher `sample.test.js`
15. Créer la structure du test
    ```javascript
    describe("I am a jsonplaceholder user", () => {
        describe("When I create a new Todo item", () => {
            it("Should respond with code 201 (Created)", () => {
            })
        })
        describe("When I list existing todos", () => {
            it("Should respond with code 200 (Ok)", () => {
            })
            it("Should list 200 todos", () => {
            })
            it("First todo has title 'delectus aut autem'", () => {
            })
        })
        describe("When I get existing todo by id (1)", () => {
            it("Should respond with code 200 (Ok)", () => {
            })
            it("Should show a todo", () => {
            })
            it("Todo#1 has title 'delectus aut autem'", () => {
            })
        })
    })
    ```
16. Identifier les requetes a effectuer et la composition de leur réponse pour faciliter la rédaction du test
17. Implémenter les tests avec axios et jest

    Exemple d'implémentation:

    ```javascript
    const axios = require("axios").default

    describe("I am a jsonplaceholder user", () => {
        describe("When I create a new Todo item", () => {
            let createNewTodoResponse
            beforeAll(async () => {
                createNewTodoResponse = await axios.post(
                    "https://jsonplaceholder.typicode.com/todos",
                    {
                        title: "foo",
                        body: "bar",
                        userId: 1,
                    },
                )
            })
            it("Should respond with code 201 (Created)", () => {
                expect(createNewTodoResponse.status).toBe(201)
            })
        })
        describe("When I list existing todos", () => {
            let listTodosResponse
            beforeAll(async () => {
                listTodosResponse = await axios.get(
                    "https://jsonplaceholder.typicode.com/todos",
                )
            })
            it("Should respond with code 200 (Ok)", () => {
                expect(listTodosResponse.status).toBe(200)
            })
            it("Should list 200 todos", () => {
                expect(listTodosResponse.data.length).toBe(200)
            })
            it("First todo has title 'delectus aut autem'", () => {
                expect(listTodosResponse.data[0].title).toBe("delectus aut autem")
            })
        })
        describe("When I get existing todo by id (1)", () => {
            let listTodosResponse
            beforeAll(async () => {
                listTodosResponse = await axios.get(
                    "https://jsonplaceholder.typicode.com/todos/1",
                )
            })
            it("Should respond with code 200 (Ok)", () => {
                expect(listTodosResponse.status).toBe(200)
            })
            it("Should show a todo", () => {
                expect(listTodosResponse.data.title).toBeDefined()
                expect(listTodosResponse.data.userId).toBeDefined()
            })
            it("Todo#1 has title 'delectus aut autem'", () => {
                expect(listTodosResponse.data.title).toBe("delectus aut autem")
            })
        })
    })
    ```
18. Run the test and verify there is no error and the test is passing

    ```bash
    > javascript-axios@0.0.1 test
    > jest

    PASS  __tests__/jsonplaceholder/sample.test.js
    I am a jsonplaceholder user
        When I create a new Todo item
        ✓ Should respond with code 201 (Created) (2 ms)
        When I list existing todos
        ✓ Should respond with code 200 (Ok) (1 ms)
        ✓ Should list 200 todos
        ✓ First todo has title 'delectus aut autem'
        When I get existing todo by id (1)
        ✓ Should respond with code 200 (Ok)
        ✓ Should show a todo
        ✓ Todo#1 has title 'delectus aut autem'

    ----------|---------|----------|---------|---------|-------------------
    File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
    ----------|---------|----------|---------|---------|-------------------
    All files |       0 |        0 |       0 |       0 |                   
    ----------|---------|----------|---------|---------|-------------------
    Test Suites: 1 passed, 1 total
    Tests:       7 passed, 7 total
    Snapshots:   0 total
    Time:        2.067 s
    Ran all test suites.
    ```