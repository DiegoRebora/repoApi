const dbConnection= require("../config/conexionDB");


const todasCarreras = (req, res) => {
    dbConnection.query("SELECT * FROM `carreras`",(err, data) =>{
        if (err){
            res.status(500).json({"mensaje":err})
        } else {
            res.send(data)
            console.log(data)
        }
    } )

}

const cargarCarrera = (req, res) => {
    let {nombre_carrera, fecha, corredores}= req.body
    dbConnection.query("INSERT INTO `carreras` (nombre_carrera,fecha, corredores) VALUES (?,?,?)" , [nombre_carrera, fecha, corredores], (err, data) => {
        if (err){
            res.status(500).json({"mensaje": "error en el servidor"})
            console.log(err)
        } else {
            console.log(data)
            res.status(201).json({"mensaje":"Carrera cargada"})
        }
    })

}

const actualizarCarrera = (req, res) => {
    let {nombre_carrera, fecha, corredores}= req.body
    const id=req.params.id
    dbConnection.query("UPDATE `carreras` SET nombre_carrera=?, fecha=?, corredores=? WHERE id_carrera=?", [nombre_carrera, fecha, corredores, id], (err, data) => { 
        if (err){
            res.status(500).json({"mensaje": "Error en el servidor"})
            console.log(err)
        } else {
            console.log(data)
            if (data.affectedRows==0){
                res.status(404).json({"mensaje": "No existe esa carrera"})
            } else {
            res.status(201).json({"mensaje":"Carrera actualizada"})}
        }
    })


}

const borrarCarrera = (req, res) => {    
    let id=req.params.id
    dbConnection.query("DELETE FROM carreras WHERE id_carrera=?",  [id], (err, data) => { 
        if (err){
            res.status(500).json({"mensaje": "error en sistema"})
            console.log(err)
            console.log(id)
        } else {
            console.log(data)
            if (data.affectedRows==0){
                res.status(404).json({"mensaje": "No existe esa carrera"})
            } else {
            res.status(201).json({"mensaje":"Carrera eliminada"})}
        }
    })

}
// const traerPodios=(req, res)=>{
//     dbConnection.query("SELECT r.id_piloto, p.nombre AS nombre_piloto, p.apellido AS apellido_piloto, FROM resultados r JOIN suyairacing p ON r.id_piloto = p.id_piloto GROUP BY r.id_piloto, p.nombre ORDER BY puntaje_total DESC", (err, data) =>{
//         if (err){
//             res.status(500).json({"mensaje":err})
//         } else {
//             res.send(data)
//             console.log(data)
//         }
//     } ) }


module.exports={todasCarreras, cargarCarrera, actualizarCarrera, borrarCarrera}