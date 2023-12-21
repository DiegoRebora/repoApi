const express=require("express");
const route=express.Router();
const {todosPilotos, cargarPiloto, actualizarPiloto, borrarPiloto, cargarImagen, tablaGeneral}=require("./pilotosControllers");
const upload=require("../multer/agregarimagen")

route.get("/", todosPilotos);
route.post("/cargarPiloto", upload.single ("imagen"), cargarPiloto );
route.post("/borrarPiloto", borrarPiloto);
route.put("/actualizarPiloto/:id", actualizarPiloto);
route.delete("/borrarPiloto", borrarPiloto);
route.put("/cargarImagen/:id", upload.single("imagen"), cargarImagen)
route.get("/tablaGeneral", tablaGeneral)

module.exports=route