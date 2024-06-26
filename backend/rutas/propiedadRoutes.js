const express = require('express'); 
const router= express.Router();

//importar los controladores
const propiedades= require("../controladores/propiedadController"); 
const passport = require("../auth/passport");

//rutas
router.get('/',passport.authenticate("jwt",{session: false}), propiedades.getAllPropiedades);
router.get('/clave',passport.authenticate("jwt",{session: false}), propiedades.getPropiedadClave);
router.get('/:id',passport.authenticate("jwt",{session: false}), propiedades.getPropiedad);
router.post('/',passport.authenticate("jwt",{session: false}),propiedades.createPropiedad);
router.delete('/:id',passport.authenticate("jwt",{session: false}), propiedades.deletePropiedad);
router.put('/:id/descripcion',passport.authenticate("jwt",{session: false}), propiedades.updateDesPropiedad); 
router.put('/:id/clave',passport.authenticate("jwt",{session: false}), propiedades.updateClavePropiedad); 
router.post('/arrendador/',passport.authenticate("jwt",{session: false}), propiedades.addArrendador);
router.delete('/:idPropiedad/arrendador',passport.authenticate("jwt",{session: false}), propiedades.deleteArrendador);
router.get('/:id/propietarios',passport.authenticate("jwt",{session: false}), propiedades.getPropietarios);

module.exports = router;