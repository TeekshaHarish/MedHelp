const JWT=require("jsonwebtoken");

const authMiddleware= (req,res,next)=>{
    try{
        const token=req.headers["authorization"].split(" ")[1];
        // console.log(token);
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                console.log(err);
                return res.status(200).send({success:false, message:"Auth Failed"});
            }
            // console.log("DECODED: ",decode);
            req.body.userId=decode.id;
            next();
        })
    }catch(error){
        console.log(error);
        res.status(500).send({success:false, message:`Auth Error ${error}`})
    }
}
module.exports=authMiddleware;