const express = require('express')
const app = express()
const port= 3020

app.use(express.json())
// express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. 
// This method is called as a middleware in your application using the code: app.use(express.json());

const users = [
    {id:1, name:'jino'},
    {id:2, name:'minu'}
]

const fs = require('fs')

app.get('/', function(request, response){
    response.send('Welcome to the website')
})


app.get('/users',(req,res)=>{
    res.json(users)
})

app.get('/students',(req,res)=>{
    fs.readFile('students.json', 'utf-8', (err, data) => {
        if (err) {
            res.json(err);
        }else{
            res.json(JSON.parse(data))   //[ { id: '1', name: 'Jino' }, { id: '2', name: 'Minu' } ]
        }
    })
})

app.post('/users', (req,res)=>{
    // res.send("post method")
    // console.log(req.body)
    const user = req.body
    users.push(user)   //let users means we can also use concat instead of push and we can reassign the users value.
    res.json(user)
})

app.get('/users/:id', (req,res)=>{
    const id = req.params.id
    const user = users.find(user=> user.id == id)
    if(user){
        res.json(user)
    }else{
        res.json({})
    }
})


app.listen(port, ()=>{
    console.log('listening to the port', port)
})