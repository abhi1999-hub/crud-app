const express = require("express");
const { create,update,find,deleteUser} = require("../controller/controller");
const { homeRoutes, add_user, update_user } = require("../services/render");
const route= express.Router();


 route.get('/',homeRoutes)

route.get('/add-user',add_user)

route.get('/update-user',update_user)

module.exports= route;

//API
route.post('/api/users',create)
route.get('/api/users',find)
route.put('/api/users/:id',update)
route.delete('/api/users/:id',deleteUser);

