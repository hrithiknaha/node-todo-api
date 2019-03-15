const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, client){
    if(err){
        return console.log("Unable to connect to mongoDb servers.");
    }
    console.log("Connected to MongoDb servers.");
    const db = client.db('TodoApp')

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed : false
    }, function(err, result){
        if(err){
            return console.log("Unable to insert todo");
        }
        console.log(JSON.stringify(result.ops,undefined, 2))
    })

    db.collection('Users').insertOne({
        name: 'Hrithik Naha',
        age: 20,
        location: 'Kolkata, India'
    }, function(err, result){
        if(err){
            return console.log("Unable to insert user");
        }
        console.log(JSON.stringify(result.ops,undefined, 2))
    })

    client.close();
})