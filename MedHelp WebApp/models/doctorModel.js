const mongoose=require("mongoose");

const doctorSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'First name is required']
    },
    lastName:{
        type:String,
        required:[true,'Last name is required']
    },
    phone:{
        type:String,
        required:[true,'phone is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    website:{
        type:String
    },
    address:{
        type:String,
        required:[true,'address is required']
    },
    specialization:{
        type:[String],
        required:[true,'specialization is required']
    },
    experience:{
        type:String,
        required:[true,'experience is required']
    },
    status:{
        type:String,
        default:'pending'
    },
    feesPerConsultation:{
        type:Number,
        required:[true,'feesPerConsultation is required']
    },
    timings:{
        type:Array,
        required:[true,'timings is required']
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    ratings:{
        type:[
            {
                userId:mongoose.Schema.Types.ObjectId,
                rating:mongoose.Schema.Types.Number
            }
        ],
        default:[]
    },
    netRating:{
        type:mongoose.Schema.Types.Number,
        default:0
    }
    
},{timestamps:true})

const doctorModel=mongoose.model("doctors",doctorSchema);
module.exports=doctorModel;