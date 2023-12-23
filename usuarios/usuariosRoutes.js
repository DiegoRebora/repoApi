const express=require('express');
const route=express.Router();
const {logIn, cargarUsuario} = require('./usuariosControllers');
//const {todosPilotos}= require("../pilotos/pilotosControllers")
const verifUsuario = require("./verificador/verificar");

route.post("/login", logIn)
route.get("/accederInfo", verifUsuario)
route.post("/cargarUsuario", cargarUsuario)


module.exports=route;