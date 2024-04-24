const mongoose=require("mongoose");

const appointmentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"doctors",
        required:true
    },
    startTime:{
        type:String,
        required:[true,'start time is required']
    },
    date:{
        type:String,
        required:[true,'date is required']
    },
    status:{
        type:String,
        default:'Scheduled',
        required:[true,'status is required']
    },
    description:{
        type:String
    }
})

const appointmentModel=new mongoose.model("appointments",appointmentSchema);
module.exports=appointmentModel;