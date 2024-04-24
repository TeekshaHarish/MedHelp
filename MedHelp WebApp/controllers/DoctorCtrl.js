const doctorModel = require("../models/doctorModel");
const appointmentModel=require("../models/appointmentModel");

const getDoctorInfoContoller=async(req,res)=>{
    try {
        const doctor=await doctorModel.findOne({userId:req.body.userId});
        if(!doctor){
            return res.status(200).send({
                success:false,
                message:"Doctor not found"
            })
        }
        res.status(200).send({
            success:true,
            message:"DOctor detailed fetched",
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while fetching doctor data",
            error
        })
    }
}

const updateDoctorProfilecController=async(req,res)=>{
    try {
        const doctor=await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body);
        res.status(200).send({
            success:true,
            message:"Doctor profile updated",
            data:doctor
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while updating doctor details",
            error
        })
    }
}

const getDoctorByIdContoller=async(req,res)=>{
    try {
        const doctor=await doctorModel.findById(req.body.doctorId);
        if(!doctor){
            return res.status(200).send({
                success:false,
                message:"Doctor not found"
            })
        }
        res.status(200).send({
            success:true,
            message:"Doctor detailed fetched",
            data:doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while fetching doctor data",
            error
        })
    }
}

const getDoctorAppointmentsController=async(req,res)=>{
    try {
        const doctor=await doctorModel.findOne({userId:req.body.userId});
        const appointments=await appointmentModel.find({doctorId:doctor._id}).populate('userId');
        console.log(appointments);
        res.status(200).send({
            success:true,
            message:'Doctor apoointments fetched successfully',
            data:appointments
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while fetching doctor appointments",
            error
        })
    }
}

const markAppointmentCompletedController=async(req,res)=>{
    try {
        const appt=await appointmentModel.findByIdAndUpdate(req.body.appointmentId,{status:'Completed'});
        res.status(200).send({
            success:true,
            message:'Appointment marked completed'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while marking appointment completed",
            error
        })
    }
}

const deleteAppointmentController=async(req,res)=>{
    try {
        const appt=await appointmentModel.findByIdAndDelete(req.body.appointmentId);
        res.status(200).send({
            success:true,
            message:'Appointment deleted'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while deleting appointment",
            error
        })
    }
};

const giveRatingController=async(req,res)=>{
    try {
        const {doctorId,rating,userId}=req.body;
        const doctor=await doctorModel.findById(doctorId);
        let found=false;
        let sum=0;
        doctor.ratings.forEach((rat)=>{
            sum+=rat.rating
            if(rat.userId==userId){
                found=true;
            }
        })
        if(found){
            return res.status(200).send({
                success:false,
                message:"You have already given a rating to this doctor",
                error:"Already done"
            })
        }
        sum+=rating;
        avg=(sum)/(doctor.ratings.length+1.0)
        doctor.ratings.push({userId,rating});
        doctor.netRating=avg;
        await doctor.save();
        // const res=doctorModel.findByIdAndUpdate(doctorId,{ratings})
        res.status(200).send({
            success:true,
            message:'Rating Submitted'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while giving rating",
            error
        })
    }

}
module.exports={getDoctorInfoContoller,updateDoctorProfilecController,getDoctorByIdContoller,getDoctorAppointmentsController,markAppointmentCompletedController,deleteAppointmentController,giveRatingController};