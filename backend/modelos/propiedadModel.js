const { get } = require("express/lib/request");
const models =require("../baseDatos/models");

const create = async function(clave, desc){//crea una propiedad
    const propiedad= await models.Propiedades.create({
        clave_catastral: clave,
        descripcion: desc
    });
    //regresa los valores de la propiedad
    return propiedad.dataValues;
};

const getAll = async function(){ //obtiene todas las propiedades
    const propiedades= await models.Propiedades.findAll(); 
    const values=[];
    propiedades.forEach(element => values.push(element.dataValues));
    return values; //retorna solamente los valores
};

const getByID = async function(id){ //obtiene la propiedad por su id
  const propiedad = await models.Propiedades.findByPk(id);
  return propiedad.dataValues; //regresa los valores de datos
}
const getByClave = async function(clave_catastral){ //obtiene la propiedad por su id
  console.log(clave_catastral)
  const propiedad = await models.Propiedades.findOne({where: {clave_catastral: clave_catastral}});
  
  return propiedad; //regresa los valores de datos
}

const updateDesByID= async function(id, descripcion){
    //modifica la descripcion buscandolo por su id
    await models.Propiedades.update({descripcion:descripcion},{
        where: {
          id: id
        }
      });
    const propiedad= await models.Propiedades.findByPk(id);
    //regresa los valores 
    return propiedad.dataValues;
}
const updateClaveByID= async function(id, clave){//modifica la clave
  //actualiza la clave de la propiedad buscandolo por su id
    await models.Propiedades.update({clave_catastral:clave},{
        where: {
          id: id
        }
      });
    const propiedad= await models.Propiedades.findByPk(id);
    //regresa los valores 
    return propiedad.dataValues;
}

const deleteByID= async function(id){
  //elimina la propiedad por su id
    await models.Propiedades.destroy({
        where: {
          id: id
        }
      });
    return "Eliminado";
}

const asociarArrendador = async function(rfc, clave_catastral){
  //asocia un arrendador a la propiedad
  //busca la persona por su id
  const persona = await models.Personas.findOne({where: {rfc: rfc}});
    //busca la propiedad
    const propiedad = await models.Propiedades.findOne({where: {clave_catastral: clave_catastral}});
  await propiedad.setArrendatario(persona);
  
  return "Arrendador Asignado";
}

const desArrendador = async function(idPropiedad){
  //desasocia a un arrendador 
  //busca la propiedad por su id
  const propiedad= await models.Propiedades.findByPk(idPropiedad);
  //elimina al arrendador
  await propiedad.setArrendatario(null);
  return "Arrendador Eliminado";
}

const getPropietarios= async function(id){
  //obtiene todos los propietarios de una propiedad
  //busca la propiedad por id
  const propiedad = await models.Propiedades.findByPk(id);
  //obtiene los propietarios
  const propietarios = await propiedad.getPropietarios();
  return propietarios;
}

module.exports.getPropietarios=getPropietarios;
module.exports.desArrendador=desArrendador;
module.exports.deleteByID=deleteByID;
module.exports.updateClaveByID=updateClaveByID;
module.exports.updateDesByID=updateDesByID;
module.exports.getByID=getByID;
module.exports.getAll= getAll;
module.exports.create=create;
module.exports.asociarArrendador=asociarArrendador;
module.exports.getByClave=getByClave;
