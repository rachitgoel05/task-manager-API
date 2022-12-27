const { ObjectID } = require('bson');
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connnectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager'

MongoClient.connect(connnectionURL, { useNewURLParser:true }, (error,client) => {
    if (error){
        return console.log("Error while establishing connection to the database")
    }
    else{
        console.log("connection established")
    }
    const db = client.db(databaseName)
//InsertOne Function
    // db.collection('users').insertOne({
    //     name:'Rachit',
    //     age:27
    // },(error,result)=>{
    //     if (error){
    //         return console.log("Error while inserting data")
    //     }
    //     console.log(result)
    // })
//InsertMany
    // db.collection('tasks').insertMany([
    //     {
    //         description:'open',
    //         boolean:'True'
    //     },
    //     {
    //         description:'open',
    //         boolean:'True'
    //     },
    //     {
    //         description:'closed',
    //         boolean:'False'
    //     }
    // ],(error,result)=>{
    //     if (error){
    //         return console.log("Error while inserting data")
    //     }
    //     console.log(result)
    // })
//find and findOne
    // db.collection('tasks').find({boolean:'True'}).toArray((error,result)=>{
    //     console.log(result)
    // })
//Update
    // db.collection('users').updateOne({
    //     _id:new ObjectID('63a9f1d31ca3a8847df261fa')
    // },{
    //     $set:{
    //         name: 'Mike'
    //     },
    //     $inc:{
    //         age: 1
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
//UpdateMany
    // db.collection('tasks').updateMany({
    //     boolean:'False'
    // },{
    //     $set:{
    //         boolean: 'True'
    //     },
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
//Delete
    db.collection('users').deleteOne({
        _id: new ObjectID('63a9f1d31ca3a8847df261fa')
    }).then((result)=>{
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        })
    db.collection('users').deleteMany({
        age:27
    }).then((result)=>{
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        })
})