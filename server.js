require("dotenv").config();
const express=require("express");
const server=express();
const port=process.env.PORT || 4000;
const cors=require("cors");

require("./config/conexionDB")

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({extended:true}))
server.use("", require("./pilotos/pilotosRoutes"));
server.use("", require("./carreras/carrerasRoutes"))
server.use("/imagenes", express.static("./imagenes"))
server.use("/usuario", require("./usuarios/usuariosRoutes"))

server.listen(port, ()=>{
    console.log("Server is running in  port" + port )
})