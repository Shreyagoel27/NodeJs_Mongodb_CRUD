const { registerHelper } = require('hbs');
var Userdb=require('../model/model');


exports.create=(req,res)=>{
    if(!(req.body.name && req.body.email))
    {
        res.status(400).send({
            message:"Content cannt not be empty!"
        })
        return;
    }
    else
    {
    try{
        const user=new Userdb({
            name:req.body.name,
            email:req.body.email,
            gender:req.body.gender,
            status:req.body.status,
        })
        user
        .save(user)
        .then(data=>{
            res.redirect('/add-user');
        })
    }catch(err){
        console.log(err);
    }
}
}


exports.find=async(req,res)=>{
    try{
    if(req.query.id)
    {
        const id=req.query.id;
        const result=await Userdb.findById(id);
        res.send(result);
    }
    else
    {const result=await Userdb.find();
    res.send(result);}
    }catch(err){
        console.log(err);
    }
}



exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

exports.delete = (req, res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}