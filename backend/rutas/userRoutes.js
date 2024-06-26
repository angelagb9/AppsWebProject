const { response } = require('express');
const express = require('express'); 
const router= express.Router();

//importar los controladores
const usuarios= require("../controladores/userController"); 
const passport = require("../auth/passport");

//rutas
router.get('/username',passport.authenticate("jwt",{session: false}), usuarios.getUserName);
router.get('/',passport.authenticate("jwt",{session: false}), usuarios.getAllUsers);
router.get('/:id',passport.authenticate("jwt",{session: false}), usuarios.getUser);
router.post('/',usuarios.createUser);
router.delete('/:id',passport.authenticate("jwt",{session: false}), usuarios.deleteUser);
router.put('/:id/username',passport.authenticate("jwt",{session: false}), usuarios.updateUser); 
router.put('/:id/password',passport.authenticate("jwt",{session: false}), usuarios.updatePass); 

module.exports = router;