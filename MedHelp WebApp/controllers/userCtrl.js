const userModel=require("../models/userModels");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const doctorModel=require("../models/doctorModel");
const appointmentModel=require("../models/appointmentModel");

const registerController=async(req,res)=>{
    try {
        // return res.status(200).send({success:true,message:"YAY"});
        const existingUser=await userModel.findOne({email:req.body.email});
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"User Already Exists"
            });
        }
        const password=req.body.password;
        const salt=await bcrypt.genSalt(10);
        const hashedPassowrd=await bcrypt.hash(password,salt);
        req.body.password=hashedPassowrd;
        const newUser= new userModel(req.body);
        await newUser.save();
        res.status(201).send({success:true,message:"Registered Successfully"})

    } catch (error) {
        console.log(error);
        // console.log("OUTER BLOCK TRY CATCH");
        res.status(500).send({
            success:false,
            message:`Register Conroller ${error}`
        });
    }
}

const loginController=async(req,res)=>{
    try {
        const user=await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(200).send({
                success:false,
                message:"User not found"
            });
        }
        // console.log(req.body,user);
        const isMatch=await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res.status(200).send({
                success:false,
                message:"Invalid Email or Password"
            });
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.status(200).send({
            success:true,
            message:"Login Success", 
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:`Register Conroller ${error}`
        });
    }
}

const authController=async(req,res)=>{
    // return res.status(300).send({message:"HEY",success:true});
    try {
        const user=await userModel.findOne({_id:req.body.userId});
        user.password=undefined;
        if(!user){
            return res.status(200).send({
                message:"User not found",
                success:false
            })
        }else{
            return res.status(200).send({
                message:"Auth success",
                success:true,
                data:user
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"something went wrong",success:false});
    }
}

const applyDoctorController= async(req,res)=>{
    try{
        const existingDoctor=await doctorModel.findOne({userId:req.body.userId});
        if(existingDoctor){
            return res.status(200).send({
                success:false,
                message:"You have already applied for doctor position"
            })
        }
        const newDoctor=new doctorModel({...req.body,status:'pending',userId:req.body.userId});
        await newDoctor.save();
        const adminUser=await userModel.findOne({isAdmin:true});
        const notification=adminUser.notification;
        notification.push({
            type:'apply-doctor-request',
            message:`${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
            onClickPath:"/admin/doctors",
            data:{
                doctorId:newDoctor._id,
                name:newDoctor.firstName+" "+newDoctor.lastName,
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id,{notification});
        res.status(200).send({
            success:true,
            message:"Doctor Account applied successfully 🥳"
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false, error,
            message:"Error in applying for doctor"
        })
    }
}

const getAllNotificationsController=async(req,res)=>{
    try {
        const user=await userModel.findById(req.body.userId);
        const seenNotification=user.seenNotification;
        const notification=user.notification;
        seenNotification.push(...notification);
        user.notification=[];
        user.seenNotification=seenNotification;
        const updatedUser=await user.save();
        updatedUser.password=undefined;
        // console.log(user);
            res.status(200).send({
                success:true,
                message:"All notifications marked as read",
                data:updatedUser
            })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while fetching notifications"
        })
    }
}

const deleteAllNotificationsController= async(req,res)=>{
    try {
        const user=await userModel.findById(req.body.userId);
        user.seenNotification=[];
        const updatedUser=await user.save();
        updatedUser.password=undefined;
        res.status(200).send({
            success:true,
            message:"Notifications Deleted Successfully",
            data:updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while deleting notifications",
            error
        })
    }
}
const getAllDoctorsController=async(req,res)=>{
    try {
        const {query}=req.body;
        const doctors=await doctorModel.find({...query, status:"approved"});
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

const bookAppointmentController=async(req,res)=>{
    try {
        
        req.body.status='Scheduled';
        const newAppointment=new appointmentModel(req.body);
        const doctor=await doctorModel.findById(req.body.doctorId).populate('userId');

        //check if the person booking isnt the same as the doctor
        if(doctor.userId._id==req.body.userId){
            return res.status(200).send({
                success:false,
                message:"You can't book you own appointment dear 😉"
            })
        }
        await newAppointment.save();
        
        const user=await userModel.findById(req.body.userId);
        console.log(doctor.userId.notification);
        doctor.userId.notification.push({
            type:'New appointment request',
            message:`A new appointment request from ${user.name}`,
            onClickPath:'/users/appointments'
        })
        doctor.userId.save();
        //doc id , time and date in formatted way
        res.status(200).send({
            success:true, 
            message:"Appointment booked successfully 😊",
            data:newAppointment
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while booking appointment",
            error
        })
    }
}

const checkAvailabilityController=async(req,res)=>{
    try {
        const {date,startTime,endTime,doctorId,userId,beforeTime}= req.body;
        console.log(beforeTime,startTime,endTime);
        const appt=await appointmentModel.find({date:date,doctorId:doctorId, startTime:{$lt:endTime,$gt:beforeTime}});
        console.log(appt);
        if(appt.length==0){
            const dayAppt=await appointmentModel.find({date,doctorId,userId});
            if(dayAppt.length>0){
                return res.status(200).send({
                    success:false, 
                    message:"You already have an appointment booked for that day!",
                    isAvailable:false
                })
            }
            res.status(200).send({
                success:true, 
                message:"Appointment Available",
                isAvailable:true
            })
        }else{
            res.status(200).send({
                success:false, 
                message:"Time Slot Not Available🥲",
                isAvailable:false
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while chcking availaity of appointment"
        })
    }
}

const getAppointmentsController=async(req,res)=>{
    try {
        const appointments=await appointmentModel.find({userId:req.body.userId,status:"Scheduled"}).populate('userId').populate('doctorId').sort({date:1});
        res.status(200).send({
            success:true,
            message:"Appointments fecthed successfully",
            data:appointments
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error while fetching appointments"
        })
    }
}

const getRecommendedDoctorsController=async(req,res)=>{
    try {
        // console.log("SPZ MONGO ",req.body.specializations)
        const {query}=req.body;
        console.log("qr",{status:"approved",...query});
        const doctors=await doctorModel.find({status:"approved",...query});
        console.log(doctors)
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

const sortAllDoctorsController=async(req,res)=>{
    try {
        const {query,querysort}=req.body;
        const doctors=await doctorModel.find({...query, status:"approved"}).sort(querysort);
        console.log(doctors, query, querysort);
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

const sortRecommendedDoctorsController=async(req,res)=>{
    try {
        const {query,querysort}=req.body;
        clg(query,querysort);
        const doctors=await doctorModel.find({...query, status:"approved"}).sort(querysort);
        console.log(doctors, query, querysort);
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
module.exports={loginController,registerController,authController,applyDoctorController,getAllNotificationsController,deleteAllNotificationsController,getAllDoctorsController,bookAppointmentController,checkAvailabilityController,getAppointmentsController,getRecommendedDoctorsController,sortAllDoctorsController,sortRecommendedDoctorsController};