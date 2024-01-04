const multer=require("multer");

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, "https://suyairacing.onrender.com/imagenes")     
    },
    filename:(req,file,callback)=>{
        const ext=file.originalname.split(".").pop()
        const nuevoFilename= "img-"+ Date.now() + "." + ext;
        callback(null, nuevoFilename);
    }
});

const upload=multer({storage});


module.exports=upload;