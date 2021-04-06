/**
 * @description home route
 * @method GET / 
 */

const axios = require('axios');


exports.homeRoutes = (req,res)=>{
    axios.get('http://localhost:3000/api/users').
    then( function(responce){
    res.render('index',{users:responce.data});
    }).catch(err => res.send(err.message))
} 

/**
 * @description add user route
 * @method GET / 
 */
exports.add_user = (req,res)=>{
    res.render('add_user')
}

/**
 * @description update user route
 * @method GET / 
 */

exports.update_user = (req,res)=>{
    axios.get('http://localhost:3000/api/users',{params:{id : req.query.id}}).then(r=>{
        res.render('update_user',{user:r.data})
    })
    .catch(e=> res.send(err.message))
}