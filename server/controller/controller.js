const Userdb = require("../model/model");
const {getDB,getPrimaryKey} = require('../database/connection');
const { ObjectID } = require("bson");
//create and save new user
exports.create=(req,res)=>{
   // validate request

   if(!req.body){
       res.status(400).send({message:"content cannot be empty!"})
       return;
   }
   //new user
   const user = new Userdb({
       name : req.body.name,
       email:req.body.email,
       gender: req.body.gender,
       status:req.body.status
   })

   // save user in db
//    user.save(user).then(data =>{
//        res.redirect('/add-user')
//    })
   getDB().collection("users").insertOne(user)
   .then(data=>{console.log(data,res); res.redirect('/add-user')})
   .catch(err =>{
       res.status(500).send({message: err.message || "error occured"})
   })
}

//return all user and return single user
exports.find=(req,res)=>{
//     if(req.query.id){
//       const id=req.query.id;
//       Userdb.findById(id)
//       .then(data =>{

//           !data?res.send(404).send({message:"User Not found!!"}):res.send(data);
//       }).catch(err => 
//          res.status(500).send({message:"user not found"}))
//       }
//     else{
//     Userdb.find()
//     .then(user => res.send(user))
//     .catch(err =>{
//         res.status(500).send({message: err.message || "error occured"})
//     })
// }
console.log(req.query.id)
    if(req.query.id){
          const id=req.query.id;
          getDB().collection("users").findOne({_id:getPrimaryKey(id)},function(err, result) {
            if (err) res.status(500).send({message:err.message});
            console.log(result)
            res.send(result);
          });
        }
        else{
            getDB().collection("users").find({}).toArray(function(err, result) {
                if (err) res.status(500).send({message:err.message});
                res.send(result);
               
              });
    }
 
}


//update a new idetified userID
exports.update=(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Data to update cannot be empty"})
    }
    const id=req.params.id;
//     Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify: false,new:true}).then(data => {
//         console.log(data)
//         if(!data){
//         res.status(404).send({message:"Cannot Update user woth "+ id +" Maybe user not found!"})
//     }
//     res.send(data)
// }).catch(err =>{
    getDB().collection("users").findOneAndUpdate({_id:ObjectID(id)},{$set:{...req.body}},{upsert:true,returnOriginal: false}).then(data=>res.send(data.value))
    .catch(err=>res.status(500).send({message:`Error Updateing user information ${err.message}`}))

}

//delete a new idetified userID
exports.deleteUser=(req,res)=>{
    const id=req.params.id;
    // Userdb.findByIdAndDelete(id).then(data=>{
    //     if(!data){
    //         res.status(404).send({message:"Cannot delete data with this "+ id +" Maybe is is wrong"})
    //     }
    //     else{
    //         res.send({message:"User Data deleted successfully"})
    //     }
    // })
    getDB().collection("users").deleteOne({_id:ObjectID(id)}).then(data=>res.send({message:"User Data deleted successfully"}))
    .catch(err => res.status(500).send({message:`Error deleting user information ${err.message}`}));
}