
//get todos
const getTodos=(req,res)=>{
    res.json("get todos")
}

//get todo
const getTodo=(req,res)=>{
    res.json("get todo")
}

//create todo
const createTodo=(req,res)=>{
    res.json("create todo")
}

//update todo
const updateTodo=(req,res)=>{
    res.json("update todo")
}

//delete todo
const deleteTodo=(req,res)=>{
    res.json("delete todo")
}

module.exports={
    getTodo,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}