'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personas extends Model {
    static associate(models) {
      this.belongsToMany(models.Propiedades,{
        as:{
          plural: "propiedades",
          singular: "propiedad"
        },
        through: "PropiedadPropietario"
      })
    }
  }
  Personas.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Angela Garcia"
    },
    rfc: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Personas',
  });
  return Personas;
};