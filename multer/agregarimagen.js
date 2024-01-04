const multer=require("multer");

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, "./imagenes")     
    },
    filename:(req,file,callback)=>{
        const ext=file.originalname.split(".").pop()
        const nuevoFilename= "img-"+ Date.now() + "." + ext;
        callback(null, nuevoFilename);
    }
});

const upload=multer({storage});


module.exports=upload;