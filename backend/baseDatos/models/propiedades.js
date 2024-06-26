'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Propiedades extends Model {
    static associate(models) {
      this.belongsTo(models.Personas,{
        as: "arrendatario",
      });
      this.belongsToMany(models.Personas,{
        as: "propietarios",
        through: "PropiedadPropietario"
      })
    }
  }
  Propiedades.init({
    clave_catastral: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Casa Grande"
    },
  }, {
    sequelize,
    name: {
      plural: 'Propiedades',
      singular: "Propiedad"
    }
  });
  return Propiedades;
};