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
