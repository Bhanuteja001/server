let express=require("express");
require('../db');
let LoginModal=require('../modal/LoginModal');
let LoginRout=express.Router();
let jwt = require('jsonwebtoken')



LoginRout.post('/login',async(req,res)=>{
    let {username , password} = req.body;

    let user =await LoginModal.findOne({username:username })
    if (!user || user.password!=password) {
        return res.send({error:"Invalid Credentials" , success:false})
    }
    let token =  jwt.sign(password , process.env.JWT_SECRET)
    
    res.send({token:token , success:true})
})



module.exports=LoginRout
