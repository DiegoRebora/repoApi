const express=require("express");
const route=express.Router();
const {todosPilotos, cargarPiloto, actualizarPiloto, borrarPiloto, cargarImagen, tablaGeneral}=require("./pilotosControllers");
const upload=require("../multer/agregarimagen")

route.get("/", todosPilotos);
route.post("/cargarPiloto", upload.single ("img"), cargarPiloto );
route.put("/cargarPiloto/:id_piloto", actualizarPiloto);
route.delete("/borrarPiloto", borrarPiloto);
route.put("/cargarImagen/:id", upload.single("imagen"), cargarImagen)
route.get("/tablaGeneral", tablaGeneral)

module.exports=route