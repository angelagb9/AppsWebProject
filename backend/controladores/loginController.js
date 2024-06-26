const { response } = require("express");
const loginModel= require("../modelos/loginModel"); 

exports.login = function(req, res) {
  const {user, password } = req.body;
  loginModel.registro(user,password)
  .then(r=>{
    if(r.token!=0){
      res.json(r)
    }
    else{
      res.json(r.msg)
    }
  }).catch(e=>{
    console.log("No funciona");
  })
}