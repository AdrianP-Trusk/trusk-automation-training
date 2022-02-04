[<-- Readme](Readme.md)

Axios tests requires less refactoring than selenium tests, because the logic is less complex and the number of code lines is lower.

In this step of the onboarding tutorial, we'll focus on creating api requests source files and reusable methods for our test project.

The goal of this is that any of our api request will be reusable and configurable in any of our future tests, making their implementation and maintenance easier.

1. Copy everything (except node_modules and markdown files) from [04_javascript_axios_jest_one_file](04_javascript_axios_jest_one_file)

2. Create source files and architecture to implement an api requests library for jsonplaceholder fake application

    ```bash
    mkdir src &&
    mkdir src/api-requests &&
    touch src/api-requests/index.js &&
    mkdir api/requests/jsonplaceholder &&
    touch src/api-requests/jsonplaceholder/index.js &&
    touch src/api-requests/jsonplaceholder/createNewTodo.js &&
    touch src/api-requests/jsonplaceholder/getTodoById.js &&
    touch src/api-requests/jsonplaceholder/listTodos.js &&
    mkdir src/api-utils &&
    touch src/api-utils/index.js &&
    touch src/api-utils/sendGetRequest.js &&
    touch src/api-utils/sendPostRequest.js &&
    mkdir src/random-utils &&
    touch src/random-utils/index.js &&
    mkdir src/random-utils/jsonplaceholder &&
    touch src/random-utils/jsonplaceholder/index.js &&
    touch src/random-utils/jsonplaceholder/getRandomTodoBody.js &&
    touch src/random-utils/jsonplaceholder/getRandomTodoTitle.js &&
    touch src/random-utils/jsonplaceholder/getRandomUserId.js
    ```

