const { get } = require("express/lib/request");
const models =require("../baseDatos/models");

const create = async function(user, password){//crea una propiedad
    const usuario= await models.usuarios.create({
        user: user,
        password: password
    });
    //regresa los valores de la propiedad
    return usuario;
};

const getAll = async function(){ //obtiene todas las propiedades
    const usuarios= await models.usuarios.findAll(); 
    const values=[];
    usuarios.forEach(element => values.push(element));
    return values; //retorna solamente los valores
};

const getByID = async function(id){ //obtiene la propiedad por su id
  const usuario = await models.usuarios.findByPk(id);
  return usuario; //regresa los valores de datos
};
const getByUser = async function(user){ //obtiene la propiedad por su id
    const usuario = await models.usuarios.findOne({where: {user: user}});
    return usuario;
};


const updateUserByID= async function(id, user){
    //modifica la descripcion buscandolo por su id
    await models.usuarios.update({user: user},{
        where: {
          id: id
        }
      });
    const usuario = await models.usuarios.findByPk(id);
    return usuario;
};
const updatePassByID= async function(id, password){//modifica la clave
  ///modifica la descripcion buscandolo por su id
  await models.usuarios.update({password: password},{
    where: {
      id: id
    }
  });
const usuario = await models.usuarios.findByPk(id);
return usuario;
}

const deleteByID= async function(id){
  //elimina la propiedad por su id
    await models.usuarios.destroy({
        where: {
          id: id
        }
      });
    return "Eliminado";
}

module.exports.deleteByID=deleteByID;
module.exports.getByID=getByID
module.exports.getByUser=getByUser
module.exports.updateUserByID=updateUserByID;
module.exports.updatePassByID=updatePassByID;
module.exports.getAll= getAll;
module.exports.create=create;