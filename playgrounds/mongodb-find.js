const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function(err, client){
    if(err){
        return console.log("Unable to connect to mongoDb servers.");
    }
    console.log("Connected to MongoDb servers.");
    const db = client.db('TodoApp')

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos Count : ${count}`);
    }, function(err){
        console.log("Unable to fetch Todo");
    })

    // client.close();
})