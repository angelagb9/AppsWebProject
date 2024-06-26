const express=require("express");
const passport = require("./auth/passport");
const morgan =require("morgan");
const fs = require("fs");
const cors= require("cors");
const https = require("https");
const app=express(); 

app.use(cors());

//settings
process.env.port=4000; //establece el puerto 3000
app.set('json spaces', 2); //da un espaciado a los formatos json

//middlewares
app.use(passport.initialize());
app.use(morgan('dev')); //ver info de las peticiones que llegan
app.use(express.urlencoded({extended: false})); //permite entender datos de formularios
app.use(express.json()); //permite recibir formatos json

app.use("/login", require("./rutas/loginRoutes.js"));
app.use("/propiedades", require("./rutas/propiedadRoutes.js"));
app.use("/personas", require("./rutas/personaRoutes.js"));
app.use("/users", require("./rutas/userRoutes.js"));

const llavePrivada = fs.readFileSync("private.key");
const certificado= fs.readFileSync("certificate.crt");
const credenciales ={
    key: llavePrivada,
    cert: certificado,
    passphrase: "angelagarcia"
};
const httpsServer = https.createServer(credenciales, app)

//empezando el server
httpsServer.listen(process.env.port,()=>{
    console.log("Servidor escuchado por puerto: ", process.env.port);
}).on("error",(error)=>{
    console.log("Error: ", error);
});