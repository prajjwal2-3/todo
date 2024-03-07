const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 3001;

app.use(cors())
app.use(bodyParser.json());

let todos = [
    {id:1,text:'learn react',done:false},
    

];

app.get('/api/todos',(req,res)=>{
    res.json(todos);
})

app.listen(port,()=>{
    console.log('server is running')
})