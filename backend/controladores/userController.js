//importar el arreglo de arrendadores
const { response } = require("express");
const usuarios= require("../modelos/userModel"); 


const getAllUsers= function (req, res){
    usuarios.getAll()
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no disponible");
    });
};

const getUser= function(req,res){
    const {id}=req.params //obtiene el parametro a buscar
    usuarios.getByID(id)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no disponible");
    });
};
const getUserName= function(req,res){
    const {user} = req.body;
    console.log(user);
    usuarios.getByUser(user)
    .then(r=>{
        res.json(r)
    }).catch(e=>{
        res.json("Informacion no disponible")
    })
};

const createUser= function(req,res){
    const { user, password}= req.body; //obtiene los datos enviados
    usuarios.create(user, password)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Usuario no agregada");
    });
};

const deleteUser= function (req,res){
    const {id}=req.params //obtiene el parametro a buscar
    usuarios.deleteByID(id)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no eliminada");
    });
};

const updateUser= function(req,res){
    const {id}= req.params; //obtiene el parametro a buscar
    const { user }= req.body; //obtiene los datos enviados 
    usuarios.updateUserByID(id, user)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no actualizada");
    });
};
const updatePass= function(req,res){
    const {id}= req.params; //obtiene el parametro a buscar
    const { password }= req.body; //obtiene los datos enviados 
    usuarios.updatePassByID(id, password)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no actualizada");
    });
};

module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.getUserName=getUserName;
module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.updatePass = updatePass;