const express=require('express');
const router=express.Router();
const {logIn,verData} = require('./usuariosControllers');
router.get("/login", logIn)
router.post("/accederInfo", verData)


module.exports=router;