const express=require("express");
const route=express.Router();
const {todasCarreras, cargarCarrera, actualizarCarrera, borrarCarrera}=require("./carrerasControllers");


route.get("/carreras", todasCarreras);
route.post("/cargarCarrera", cargarCarrera);
route.put("/cargarCarrera/:id_carrera", actualizarCarrera);
route.delete("/borrarCarrera/:id_carrera", borrarCarrera);

module.exports=route