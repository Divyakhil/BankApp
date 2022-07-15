// server creation

//import express

const express = require('express')

// server app creat using express
const app = express()

// user request resolving

// GET REQUEST
app.get('/',(req,res)=>{
    res.send("GET Request")
})

// POST REQUEST
app.post('/',(req,res)=>{
    res.send("POST REQUEST")
})

// set up the port no. to the server app
app.listen(3000,()=>{
    console.log("Server started at 3000");
})

