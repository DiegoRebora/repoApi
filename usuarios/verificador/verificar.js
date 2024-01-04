const jwt=require("jsonwebtoken");
require("dotenv").config();

//Finalmente, nada de esto lo utilicé, pero el plan es utilizarlo más adelante. 

const verifUsuario = (req, res, next)=>{
    const autoUsuario= req.headers.authorization;

    const token=autoUsuario.split(" ").pop()
    jwt.verify(token, process.env.JWT_PASS, (err,data)=>{
        if(err){
            if(err.name =="TokenExpiredError"){
                res.json({"message":"Expiro el token"})
            }
            res.json({"message": "Error en la autorización", "error": err})

        }else{
            
            next()
        }
    } )
}

module.exports=verifUsuario;