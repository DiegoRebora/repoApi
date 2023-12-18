const dbConnection= require("../config/conexionDB");


const todosPilotos = (req, res) => {
    dbConnection.query("SELECT * FROM `suyairacing`",(err, data) =>{
        if (err){
            res.status(500).json({"mensaje":err})
        } else {
            res.send(data)
            console.log(data)
        }
    } )

}

const cargarPiloto = (req, res) => {
    const {nombre, apellido, edad, apodo}= req.body
    //const img="http://localhost:4000/" + req.file.path;/// ver la clase y chequear TODO TEMA IMAGEN
    dbConnection.query("INSERT INTO `suyairacing` (nombre,apellido,edad, apodo) VALUES (?,?,?,?)" , [nombre, apellido,edad, apodo], (err, data) => {
        if (err){
            res.status(500).json({"mensaje": "Error en el servidor"})
            console.log(err)
        } else {
            console.log(data)
            res.status(201).json({"mensaje":"Piloto cargado"})
        }
    })

}

const actualizarPiloto = (req, res) => {
    let {nombre, apellido, edad, apodo}= req.body
    dbConnection.query("UPDATE `suyairacing` SET nombre=?, apellido=?, edad=?, apodo=? WHERE id_piloto=?", [nombre, apellido,edad, apodo, req.params.id], (err, data) => { 
        if (err){
            res.status(500).json({"mensaje": "Error en el servidor"})
            console.log(err)
        } else {
            console.log(data)
            if (data.affectedRows==0){
                res.status(404).json({"mensaje": "No existe ese piloto"})}
                else {res.status(201).json({"mensaje":"Piloto actualizado"})}
        }
    })


}

const borrarPiloto = (req, res) => {    
    dbConnection.query("DELETE FROM `suyairacing` WHERE id_piloto =?",  [req.params.id], (err, data) => { 
        if (err){
            res.status(500).json({"mensaje": "Error en el servidor"})
            console.log(err)
            console.log(req.params.id)
        } else {
            console.log(data)
            if (data.affectedRows==0){
                res.status(404).json({"mensaje": "No existe ese piloto"})}
                else {res.status(201).json({"mensaje":"Piloto eliminado"})}
        }
    })

}

const cargarImagen=(req, res)=>{  
    let imagen="http:localhost:4000/"+ req.file.path;
    console.log(imagen)
    dbConnection.query("UPDATE `suyairacing` SET img=? WHERE id_piloto=?", [imagen, req.params.id], (err, data) => { 
        if (err){
            res.status(500).json({"mensaje": "Error en el servidor"})
            console.log(err)
        } else {
            console.log(data)
            if (data.affectedRows==0){
                res.status(404).json({"mensaje": "No existe ese piloto"})}
                else {res.status(201).json({"mensaje":"Imagen cargada"})}
        }
    })

}

const tablaGeneral =(req, res)=>{
    dbConnection.query("SELECT r.id_piloto, p.nombre AS nombre_piloto, SUM (r.puntaje) AS puntaje_total FROM resultados r JOIN suyairacing p ON r.id_piloto = p.id_piloto GROUP BY r.id_piloto, p.nombre", (err, data) =>{
        if (err){
            res.status(500).json({"mensaje":err})
        } else {
            res.send(data)
            console.log(data)
        }
    } ) }

module.exports={todosPilotos, cargarPiloto, actualizarPiloto, borrarPiloto, cargarImagen, tablaGeneral}