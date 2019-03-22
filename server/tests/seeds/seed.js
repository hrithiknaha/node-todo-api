const {ObjectId}    = require('mongodb');
const jwt           = require('jsonwebtoken');

const {Todo}        = require('./../../models/todo')
const {User}        = require('./../../models/user')

var userOneId = new ObjectId();
var userTwoId = new ObjectId();
const users = [{
    _id : userOneId,
    email : 'naha.hrithkk@gmail.com',
    password : 'neilnaha',
    tokens : [{
        access : 'auth',
        token : jwt.sign({_id : userOneId, access : 'auth'}, 'abc123').toString()
    }]
},{
    _id : userTwoId,
    email : 'me@hrithiknaha.com',
    password : 'neilnaha',
}]

const todos = [
    {
        _id : new ObjectId(),
        text: 'First Test Todo',
        _creator: userOneId
    }, {
        _id : new ObjectId(),
        text: 'Second test Todo',
        completed: true,
        completedAt: 333,
        _creator: userTwoId
    }
]

const populateTodos = (done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
  }

const populateUsers = (done) => {
    User.deleteMany({}).then(() => {
        var UserOne = new User(users[0]).save();
        var UserTwo = new User(users[1]).save();

        return Promise.all(['UserOne', 'UserTwo'])
    }).then(() => done());
}

module.exports = {todos, populateTodos, users, populateUsers}