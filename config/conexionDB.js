const mysql2=require("mysql2");

const infoDB={    //primero creo el objeto 
    host: "localhost", 
   user: "root", 
   database: "suyairacing"
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