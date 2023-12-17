const express=require("express");
const server=express();
const port=4000;
const cors=require("cors");


require("./config/conexionDB")

server.use(express.json());
server.use(cors());
server.use("", require("./pilotos/pilotosRoutes"));
server.use("", require("./carreras/carrerasRoutes"))
server.use("/public", express.static("./imagenes"))
// server.use("/usuario", require("./usuarios/usuariosRoutes"))

server.listen(port, ()=>{
    console.log("Server is running in  port" + port )
})