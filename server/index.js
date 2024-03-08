const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 3001;

app.use(cors())
app.use(bodyParser.json());

let todos = [
    {id:1,text:'learn react',done:false},
    {id:2,text:'learn express',done:false},
    {id:3,text:'learn mongodb',done:false}

];

app.get('/api/todos',(req,res)=>{
    res.json(todos);
})
app.post('/api/todos',(req,res)=>{
    const newtodo = req.body;
    newtodo.id = todos.length +1;
  todos.push(newtodo)
    res.json(todos)
})
app.put('/api/todos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const updatedtodo = req.body;
    todosnew = todos.map(todo=>(todo.id===id?updatedtodo:todo))
    res.json(todosnew)
})
app.delete('/api/todos/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    todosnew2 = todos.filter(todo=>todo.id!==id);
    res.json(todosnew2)
})
app.listen(port,()=>{
    console.log('server is running')
})