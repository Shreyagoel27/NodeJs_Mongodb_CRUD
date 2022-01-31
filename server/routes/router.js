const express= require('express');
const route=express.Router()
const services = require('../services/render')
const controller=require('../controller/controller');
const { Router } = require('express');




route.get("/",services.homeRoutes);
/**
 * add user
 */
route.get("/add-user",services.add_user);

/**
 * update user
 */
route.get("/update-user",services.update_user);


//API
route.post('/api/user',controller.create);
route.get('/api/user',controller.find);
route.put('/api/user/:id',controller.update);
route.delete('/api/user/:id',controller.delete);



module.exports=route;