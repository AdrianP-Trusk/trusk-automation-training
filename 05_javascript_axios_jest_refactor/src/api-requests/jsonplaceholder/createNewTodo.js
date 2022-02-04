const createNewTodo = ({ title, body, userId }) => {
    return axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
            title,
            body,
            userId,
        },
    )
}

module.exports = createNewTodo