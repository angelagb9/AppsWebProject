//importar el arreglo de arrendadores
const propiedades= require("../modelos/propiedadModel"); 


const getAllPropiedades= function (req, res){
    propiedades.getAll()
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no disponible");
    });
};

const getPropiedad= function(req,res){
    const {id}=req.params //obtiene el parametro a buscar
    propiedades.getByID(id)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no disponible");
    });
};
const getPropiedadClave= function(req,res){
    const {clave_catastral}=req.body //obtiene el parametro a buscar
    propiedades.getByClave(clave_catastral)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        console.log(e)
        res.json("Informacion no disponible");

    });
};

const createPropiedad= function(req,res){
    const { clave_catastral, descripcion}= req.body; //obtiene los datos enviados
    propiedades.create(clave_catastral, descripcion)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Propiedad no agregada");
    });
};

const deletePropiedad= function (req,res){
    const {id}=req.params //obtiene el parametro a buscar
    propiedades.deleteByID(id)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no eliminada");
    });
};

const updateDesPropiedad= function(req,res){
    const {id}= req.params; //obtiene el parametro a buscar
    const { descripcion}= req.body; //obtiene los datos enviados 
    propiedades.updateDesByID(id, descripcion)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no actualizada");
    });
};
const updateClavePropiedad= function(req,res){
    const {id}= req.params; //obtiene el parametro a buscar
    const { clave_catastral }= req.body; //obtiene los datos enviados 
    propiedades.updateClaveByID(id, clave_catastral)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no actualizada");
    });
};

const addArrendador = function(req, res){
    const {rfc, clave_catastral}= req.body; //obtiene el parametro a buscar
    propiedades.asociarArrendador(rfc, clave_catastral)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        console.log(e);
        res.json("Informacion no actualizada");
    });
}
const deleteArrendador = function(req, res){
    const {idPropiedad}= req.params; //obtiene el parametro a buscar 
    propiedades.desArrendador(idPropiedad)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        console.log(e);
        res.json("Informacion no actualizada");
    });
}
 
const getPropietarios = function(req,res){
    const {id}= req.params; //obtiene el parametro a buscar 
    propiedades.getPropietarios(id)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        console.log(e);
        res.json("Informacion no disponible");
    });
};

module.exports.deleteArrendador=deleteArrendador;
module.exports.addArrendador=addArrendador;
module.exports.getAllPropiedades=getAllPropiedades;
module.exports.getPropiedad=getPropiedad;
module.exports.createPropiedad=createPropiedad;
module.exports.updateDesPropiedad=updateDesPropiedad;
module.exports.updateClavePropiedad=updateClavePropiedad;
module.exports.deletePropiedad=deletePropiedad;
module.exports.getPropietarios= getPropietarios;
module.exports.getPropiedadClave= getPropiedadClave;