const mysql2=require("mysql2");
require("dotenv").config();

const infoDB={    
    host: process.env.DB_HOST, 
   user: process.env.DB_USER, 
   database: process.env.DB_DATABASE,
   password:process.env.DB_PASS
}
const dbConnection=mysql2.createConnection(infoDB)//despues creo la conexión con el objeto como parámetro

dbConnection.connect((error)=>{
   if (error) {
       if(error.code ==="ER_BAD_DB_ERROR"){
      console.log("error con la conexión: " + error.sqlMessage)}

   } else {
      console.log("Connected")
  }
});


module.exports=dbConnection;