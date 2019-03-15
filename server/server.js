const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

var app = express();

app.use(bodyParser.json());

app.post('/todos', function(req,res){
    var todo = new Todo({
        text : req.body.text
    })
    todo.save().then(function(doc){
        res.send(doc);
    }, function(err){
        console.log(err);
    })
})

app.listen(3000, function(){
    console.log("Started on port 3000.")
})
