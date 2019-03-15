const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, client){
    if(err){
        return console.log("Unable to connect to mongoDb servers.");
    }
    console.log("Connected to MongoDb servers.");
    const db = client.db('TodoApp')

    db.collection('Todos').findOneAndDelete({completed: false}).then(function(result){
        console.log(result);
    })

    // client.close();
})