const express=require("express");
const route=express.Router();
const {todasCarreras, cargarCarrera, actualizarCarrera, borrarCarrera}=require("./carrerasControllers");


route.get("/carreras", todasCarreras);
route.post("/cargarCarrera", cargarCarrera);
route.put("/actualizarCarrera/:id", actualizarCarrera);
route.delete("/borrarCarrera/:id", borrarCarrera);

module.exports=route