// const mongoose = require('mongoose');

// const connectDB = async ()=>{
//     try{
//         //mongo connect
//         console.log(process.env.MONGO_URL)
//         const con= await mongoose.connect(process.env.MONGO_URL,{
//             useNewUrlParser:true,
//             useUnifiedTopology:true,
//             useFindAndModify:true,
//             useCreateIndex:true,
//         })
//         console.log("MongoDB connectd"+ con.connection.host)
//     }
//     catch(e){
//         console.log(e)1234//         process.exit(1);
//     }
// }

// module.exports= connectDB;

// useing mongodb
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
url = "mongodb+srv://root:abhilash@27@cluster0.jtcuz.mongodb.net";

console.log(url)
let database;
const mongoOptions={useNewUrlParser:true};
const state  = {
    db : null
}
const connectDB = async ()=>{
    try{
        MongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology: true,server: { auto_reconnect: true }  },function(err, db) {
            if (err) throw err;
            state.db=db.db("new_db");
            console.log(state.db)
        });
   }
    catch(e){
        console.log(e)
    }
}

const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

const getDB = () => {
    return state.db;
}

 module.exports= {connectDB,getDB,getPrimaryKey};
