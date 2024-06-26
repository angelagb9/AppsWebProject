const { get } = require("express/lib/request");
const jwt = require('jsonwebtoken');
const Users = require('../modelos/userModel');
const llave = require("../auth/llave");

const registro = async function(user, password){
    if ( !(user && password) ) {
        return {msg: "Formato incorrecto", token: 0};
    }
    const usuario= await Users.getByUser(user);
    if(!usuario){
        return {msg: "Usuario no encontrado", token: 0}
    }
    if(usuario.password !==password){
        return {msg: "Contraseña incorrecta", token: 0}
    }
    let token = jwt.sign({id: user.id}, llave);
    return {msg: "ok", token: token};
}

module.exports.registro=registro;