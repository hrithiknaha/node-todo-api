const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

var Todo = mongoose.model('Todo',{
    text : {
        type: String
    },
    completed : {
        type: Boolean
    },
    completedAt : {
        type: Number
    }
});

var newTodo = new Todo({
    text: 'Wash my cat'
})

newTodo.save().then(function(result){
    console.log(result);
}, function(err){
    console.log(err)
})