const userModel = require("../models/userModels");

const isAdminMiddleware= async(req,res,next)=>{
    try{
        const currentUser=await userModel.findById(req.body.userId);
        if(currentUser.isAdmin){
            next();
        }else{
            throw "Not an admin";
        } 
    }catch(error){
        console.log(error);
        res.status(500).send({success:false, message:`You are not an admin`});
    }
}
module.exports=isAdminMiddleware;