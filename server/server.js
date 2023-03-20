const express=require('express')
const app=express()
const dotenv=require('dotenv')
const coockie=require('cookie-parser')
dotenv.config()
require('./DBconn/conn')
app.use(express.json())
app.use(coockie())
app.use(express.urlencoded({extended:true}))

app.use('/api/users',require('./routes/userRoute'))
app.use('/api/todos',require('./routes/todoRoute'))

app.listen(process.env.PORT,()=>{
    console.log("server is successfully run on ",process.env.PORT);
})