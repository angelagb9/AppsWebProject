const { get } = require("express/lib/request");
const models =require("../baseDatos/models"); //toma los modelos 

const create = async function(nombre, rfc){ //crea una persona
    const persona= await models.Personas.create({
        nombre: nombre,
        rfc: rfc
    });
    return persona.dataValues; //regresa el objeto de la persona creada
};
const getAll = async function(){ //devuelve un arreglo con todas las personas
    const personas= await models.Personas.findAll(); //realiza un select *
    return personas;
};

const getByID = async function(id){ //busca a una personas por su id
  const persona = await models.Personas.findByPk(id);
  return persona.dataValues; //devuelve los valores
}
 
const getByRFC = async function(rfc){ //busca a una personas por su id
  const persona = await models.Personas.findOne({where: {rfc: rfc}});
  return persona.dataValues; //devuelve los valores
}

const updateNameByID= async function(id, nombre){ //modifica el nombre
  //busca la persona por id y modifica el nombre
  await models.Personas.update({nombre: nombre},{ 
        where: {
          id: id
        }
    });

  const persona= await models.Personas.findByPk(id);
  //regresa el valor actualizado
  return persona.dataValues;
}
const updateRFCByID= async function(id, rfc){ //modifica el RFC
  //busca la persona por id y modifica su rfc
    await models.Personas.update({rfc: rfc},{
        where: {
          id: id
        }
      });

    const persona= await models.Personas.findByPk(id);
    //regresa el valor actualizado
    return persona.dataValues;
}

const deleteByID= async function(id){ //elimina por id
    await models.Personas.destroy({
        where: {
          id: id
        }
      });
    
    return "Eliminado";
};

const addPropiedadPropietario = async function(rfc, clave_catastral){
    //busca el propietario
    const persona = await models.Personas.findOne({where: {rfc: rfc}});
    //busca la propiedad
    const propiedad = await models.Propiedades.findOne({where: {clave_catastral: clave_catastral}});
    //añade la propiedad a la persona
    await persona.addPropiedades(propiedad);
    return "Propiedad Agregada";
}
const addPropiedadPropietario2 = async function(rfc, clave){
  //busca el propietario
  console.log()
  const persona= await models.Personas.findOne({ where: { rfc: 'rfc' } });

  console.log(persona);
  //console.log("Hola")
  //busca la propiedad
  //const propiedad= await models.Propiedades.findOne({where: {clave_catastral: clave}});
  //añade la propiedad a la persona
  //await persona.addPropiedades(propiedad);
  return "Propiedad Agregada";
}

const getPropiedadesPropietario= async function(id){
  //busca la persona por id
  const persona = await models.Personas.findByPk(id);
  //obtiene las propiedades
  const propiedades = await persona.getPropiedades();
  return propiedades;
}

const getPropiedadesArrendador = async function(id){
  //obtiene las propiedades del arrendador con su id
  const propiedades = await models.Propiedades.findAll({
    where:{
      arrendatarioId: id
    }
  });
  return propiedades;
};

module.exports.getPropiedadesArrendador=getPropiedadesArrendador;
module.exports.getPropiedadesPropietario=getPropiedadesPropietario;
module.exports.deleteByID=deleteByID;
module.exports.updateNameByID=updateNameByID;
module.exports.updateRFCByID=updateRFCByID;
module.exports.getByID=getByID;
module.exports.getAll= getAll;
module.exports.create=create;
module.exports.addPropiedadPropietario=addPropiedadPropietario;
module.exports.getByRFC=getByRFC;
module.exports.addPropiedadPropietario2=addPropiedadPropietario2

