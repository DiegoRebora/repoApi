const jwt=require("jsonwebtoken");



const verifUsuario = (req, res, next)=>{
    const autoUsuario= req.headers.authorization;

    const token=autoUsuario.split(" ").pop()
    jwt.verify(token, "suyaicarreras", (err,data)=>{ //recordar usar dotenv y después cambiar la variable de la clave segura. 
        if(err){
            res.json({"message": "Error en la autorización", "error": err})

        }else{
            console.log(data)
            next()
        }
    } )
}

module.exports=verifUsuario;