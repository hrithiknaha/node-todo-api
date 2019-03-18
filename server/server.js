require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

var app = express();
var port = process.env.PORT;

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

app.patch('/todos/:id', function(req, res){
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectId.isValid(id)){
        res.status(404).send("Id is not vailid");
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else{
        body.completed = false,
        body.completedAt = null
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then(function(todo){
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo})
    }, function(err){
        res.status(404).send();
    })
})

app.post('/user', function(req, res) {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(function(){
        return user.generateAuthToken();
    }, function(err){
        res.send(err);
    }).then(function(token){
        res.header('x-auth', token).send(user)
    })
})



app.listen(port, function(){
    console.log(`Started on port ${port}.`)
})

module.exports = {app};
