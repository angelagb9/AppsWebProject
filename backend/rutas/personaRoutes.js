const express = require('express'); 
const router= express.Router();
const passport = require("../auth/passport");

//importar el los controladores
const personas= require("../controladores/personaController"); 

//rutas
router.post('/editar', personas.editPersona);
router.get('/',passport.authenticate("jwt",{session: false}), personas.getAllPersonas);
router.get('/rfc',passport.authenticate("jwt",{session: false}), personas.getPersonaRFC);
router.get('/:id',passport.authenticate("jwt",{session: false}), personas.getPersona);
router.post('/',passport.authenticate("jwt",{session: false}),personas.createPersona);
router.post('/propietario/propiedad',passport.authenticate("jwt",{session: false}),personas.addPropiedadPropietario);
router.post('/propietario/propiedad2',passport.authenticate("jwt",{session: false}),personas.addPropiedadPropietario2);
router.delete('/:id', passport.authenticate("jwt",{session: false}), personas.deletePersona);
router.put('/:id/name',passport.authenticate("jwt",{session: false}), personas.updateNamePersona); 
router.put('/:id/RFC',passport.authenticate("jwt",{session: false}), personas.updateRFCPersona);
router.get('/propietario/:id/propiedades',passport.authenticate("jwt",{session: false}), personas.getPropiedadesPropietario);
router.get('/arrendador/:id/propiedades', passport.authenticate("jwt",{session: false}), personas.getPropiedadesArrendador);
module.exports = router;