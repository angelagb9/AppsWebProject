//importar el arreglo de personas
const personas= require("../modelos/personaModel"); 

//rutas
const getAllPersonas= function (req, res){
    personas.getAll()
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no disponible");
    });
};

const getPersona= function(req,res){
    const {id}=req.params //obtiene el parametro a buscar
    personas.getByID(id)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no disponible");
    });
};
const getPersonaRFC= function(req,res){
    const {rfc}=req.body //obtiene el parametro a buscar
    personas.getByRFC(rfc)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no disponible");
    });
};

const createPersona= function(req,res){
    const {nombre, rfc}= req.body; //obtiene los datos enviados
    personas.create(nombre, rfc)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Persona no agregada");
    });
};

const deletePersona= function (req,res){
    const {id}=req.params //obtiene el parametro a buscar
    personas.deleteByID(id)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no eliminada");
    });
};

const updateNamePersona= function(req,res){
    const {id}= req.params; //obtiene el parametro a buscar
    const { nombre}= req.body; //obtiene los datos enviados 
    personas.updateNameByID(id, nombre)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        console.log(e);
        res.json("Informacion no actualizada");
    });
};
const updateRFCPersona= function(req,res){
    const {id}= req.params; //obtiene el parametro a buscar
    const { rfc}= req.body; //obtiene los datos enviados 
    personas.updateRFCByID(id, rfc)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        res.json("Informacion no actualizada");
    });
};

const addPropiedadPropietario = function(req, res){
    const {rfc, clave_catastral} = req.body;
    personas.addPropiedadPropietario(rfc, clave_catastral)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        console.log(e);
        res.json("Informacion no actualizada");
    });
}
const addPropiedadPropietario2 = function(req, res){
    const {rfc, clave} = req.body;
    personas.addPropiedadPropietario2(rfc, clave)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        console.log(e);
        res.json("Informacion no actualizada");
    });
}

const getPropiedadesPropietario = function(req,res){
    const {id}=req.params //parametro del objeto a buscar
    personas.getPropiedadesPropietario(id)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        console.log(e);
        res.json("Informacion no actualizada");
    });
};

const getPropiedadesArrendador = function(req,res){
    const {id}=req.params //parametro del objeto a buscar
    personas.getPropiedadesArrendador(id)
    .then(r=>{
        res.json(r);
    }).catch(e=>{
        console.log(e);
        res.json("Informacion no disponible");
    });
};
const editPersona= function(req,res){
    console.log(req.body) //obtiene el parametro a buscar
    return(req.body)
};

module.exports.editPersona=editPersona;
module.exports.getPropiedadesArrendador=getPropiedadesArrendador;
module.exports.getPropiedadesPropietario= getPropiedadesPropietario;
module.exports.getAllPersonas=getAllPersonas;
module.exports.getPersona=getPersona;
module.exports.createPersona=createPersona;
module.exports.updateNamePersona=updateNamePersona;
module.exports.updateRFCPersona=updateRFCPersona;
module.exports.deletePersona=deletePersona;
module.exports.addPropiedadPropietario=addPropiedadPropietario;
module.exports.getPersonaRFC=getPersonaRFC;
module.exports.addPropiedadPropietario2=addPropiedadPropietario2