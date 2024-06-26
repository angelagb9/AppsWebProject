const { sequelize } = require("./models");
const models =require("./models");

const inicio = async function (){
    await models.sequelize.sync({ force: true });
    const persona= await models.Personas.create({
        nombre: "Angela Garcia",
        rfc: "POF90WE"
    });
    const propiedad= await models.Propiedades.create({
        clave_catastral: "AAA009",
        descripcion: "Casa Garnde"
    });
    await persona.addPropiedades(propiedad);
    await propiedad.setArrendatario(persona);
    console.log("Arrendador asignado");

    models.sequelize.close();
}
inicio();