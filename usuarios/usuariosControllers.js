const dbConnection= require("../config/conexionDB");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const cargarUsuario = async (req, res) => {
    const {usuario, password, categoria}= req.body
    let passEnc= await bcrypt.hash(password, 10)


    dbConnection.query("INSERT INTO `usuarios` (usuario, password, categoria) VALUES (?,?,?)" , [usuario, passEnc,categoria], (err, data) => {
        if (err){
            res.status(500).json({"mensaje": "Error en el servidor"})
            console.log(err)
        } else {
            console.log(data)
            res.status(201).json({"mensaje":"Usuario cargado"})
        }
    })

}

const logIn = (req, res) => {
    const { usuario, password } = req.body;

    dbConnection.query("SELECT * FROM `usuarios` WHERE usuario=?", [usuario], async (err, data) => {
        if (err) {
            res.status(500).json({ "mensaje": "Error en la petición" });
        } else {
            let userData = data[0];
            let userPass = userData.password;
            let auth = await bcrypt.compare(password, userPass);

            console.log(auth);

            if (auth === true) {
                if (userData.categoria === "admin") {
                    jwt.sign({ usuario }, "suyaicarreras", { expiresIn: "45min" }, (err, token) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                           
                            res.status(200).json({ message: "usuario ok", "token": token });
                        }
                    });
                } else {
                    res.status(401).json({ message: "Usuario o contraseña incorrectos" });
                }
            } else {
                res.status(401).json({ message: "Usuario o contraseña incorrectos" });
            }
        }
    });
};



module.exports = { logIn, cargarUsuario};