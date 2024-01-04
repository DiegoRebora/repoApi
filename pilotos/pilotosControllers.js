const dbConnection= require("../config/conexionDB");


const todosPilotos = (req, res) => {
    dbConnection.query("SELECT * FROM `suyairacing`",(err, data) =>{
        if (err){
            res.status(500).json({"mensaje":err})
        } else {
            const modifiedData = data.map((piloto) => ({
                ...piloto,
                img: piloto.img.replace(/\\/g, '/'),
            }));
            res.send(modifiedData)
            console.log(modifiedData)


        }
    } )

}



const cargarPiloto = (req, res) => {
    const {nombre, apellido, edad, apodo}= req.body
    const img="https://suyairacing.onrender.com" + req.file.path;
    dbConnection.query("INSERT INTO `suyairacing` (nombre,apellido,edad, apodo, img) VALUES (?,?,?,?,?)" , [nombre, apellido,edad, apodo,img], (err, data) => {
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
    let {nombre, apellido, edad, apodo, id_piloto}= req.body
    dbConnection.query("UPDATE `suyairacing` SET nombre=?, apellido=?, edad=?, apodo=? WHERE id_piloto=?", [nombre, apellido,edad, apodo, id_piloto], (err, data) => { 
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
    const {id_piloto}=req.body
    dbConnection.query("DELETE FROM `suyairacing` WHERE id_piloto =?",  [id_piloto], (err, data) => { 
        if (err){
            res.status(500).json({"mensaje": "Error en el servidor"})
            console.log(err)

        } else {
            console.log(data)
            if (data.affectedRows==0){
                res.status(404).json({"mensaje": "No existe ese piloto"})}
                else {res.status(201).json({"mensaje":"Piloto eliminado"})}
        }
    })

}

const cargarImagen=(req, res)=>{  
    let imagen="http://localhost:4000/"+ req.file.path;
    console.log(imagen)
    console.log(req.file)
    console.log(req.file.path)
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
    dbConnection.query("SELECT r.id_piloto, p.nombre AS nombre_piloto, SUM (r.puntaje) AS puntaje_total FROM resultados r JOIN suyairacing p ON r.id_piloto = p.id_piloto GROUP BY r.id_piloto, p.nombre ORDER BY puntaje_total DESC", (err, data) =>{
        if (err){
            res.status(500).json({"mensaje":err})
        } else {
            res.send(data)
            console.log(data)
        }
    } ) }

module.exports={todosPilotos, cargarPiloto, actualizarPiloto, borrarPiloto, cargarImagen, tablaGeneral}