const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/todos', function(req,res){
    Todo.find().then(function(todos){
        res.send({
            todos
        })
    }, function(err){
        res.status(400).send(err);
    })
})

app.post('/todos', function(req,res){
    var todo = new Todo({
        text : req.body.text
    })
    todo.save().then(function(doc){
        res.send(doc);
    }, function(err){
        res.status(400).send(err);
    })
})

app.get('/todos/:id', function(req,res){
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        res.status(404).send("Id is not vailid");
    }else {
        Todo.findById(id).then(function(todo){
            if(!todo){
                return res.status(404).send();
            }
            res.status(200).send({todo})
        }, function(err){
            res.send(err)
        })
    }
})

app.delete('/todos/:id', function(req,res){
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        res.status(404).send("Id is not vailid");
    }else {
        Todo.findByIdAndRemove(id).then(function(todo){
            if(!todo){
                return res.status(404).send();
            }
            res.status(200).send({todo})
        }, function(err){
            res.send(err)
        })
    }
})

app.listen(port, function(){
    console.log(`Started on port ${port}.`)
})

module.exports = {app};
