const mysql2=require("mysql2");
require("dotenv").config();

const infoDB={    
    host: process.env.HOST, 
   user: process.env.HOST_NAME, 
   database: process.env.HOST_DB,
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