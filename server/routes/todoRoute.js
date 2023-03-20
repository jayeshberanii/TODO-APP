const Authorize = require('../Auth/Authorize')
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../controller/todocontroller')

const route = require('express').Router()

route.get('/', Authorize, getTodos)
route.get('/:id', Authorize, getTodo)
route.post('/create', Authorize, createTodo)
route.put('/:id', Authorize, updateTodo)
route.delete('/:id', Authorize, deleteTodo)

module.exports = route
