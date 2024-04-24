const userModel=require("../models/userModels");
const doctorModel=require("../models/doctorModel");
const appointmentModel=require("../models/appointmentModel");


const getAllUsersController=async(req,res)=>{
    try {
        const users=await userModel.find({});
        res.status(200).send({
            success:true, 
            message:"User data fetched successfully",
            data:users
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:true,
            error,
            message:":Error while fetching user data"
        })
    }
}

const getAllDoctorsController=async(req,res)=>{
    try {
        const doctors=await doctorModel.find({});
        res.status(200).send({
            success:true, 
            message:"doctor data fetched successfully",
            data:doctors
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:true,
            error,
            message:":Error while fetching doctor data"
        })
    }
}

const changeDoctorStatusController=async(req,res)=>{
    try {
        const {doctorId,status}=req.body;
        const doctor=await doctorModel.findByIdAndUpdate(doctorId,{status});
        const user=await userModel.findById(doctor.userId);
        user.notification.push({
            type:'doctor-account-request-updated',
            message:`Your doctor account request has been ${status}`,
            onClickPath:'/notifications'
        })
        user.isDoctor= status==='approved'?true:false;
        await user.save();
        res.status(200).send({
            success:true,
            message:"Doctor status Updated",
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in updating doctor status"
        });
    }
}

//only admin can access admin routes
//delete the user and doctor
//doctor request cant pe placed twice from same account,check existing userId

const deleteDoctorController=async(req,res)=>{
    try {
        const {doctorId}=req.body;
        const doctor=await doctorModel.findByIdAndDelete(doctorId);
        const user=await userModel.findByIdAndUpdate(doctor.userId,{isDoctor:false});
        console.log(doctor);
        console.log(user);
        const appointments=await appointmentModel.deleteMany({doctorId});
        res.status(200).send({
            success:true,
            message:"Doctor account deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in deleting doctor"
        });
    }
}

const deleteUserController=async(req,res)=>{
    try {
        const {userToDeleteId}=req.body;
        const deletedUser=await userModel.deleteOne({_id:userToDeleteId});
        const deletedDoctor=await doctorModel.deleteMany({userId:userToDeleteId});
        const appointments=await appointmentModel.deleteMany({$or:[{userId:userToDeleteId},{doctorId:deletedDoctor._id}]});
        res.status(200).send({
            success:true,
            message:"User account deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in deleting user"
        });
    }
}
module.exports={getAllDoctorsController,getAllUsersController,changeDoctorStatusController,deleteDoctorController,deleteUserController};