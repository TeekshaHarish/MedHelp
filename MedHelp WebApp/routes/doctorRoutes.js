const express=require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getDoctorInfoContoller, updateDoctorProfilecController, getDoctorByIdContoller, getDoctorAppointmentsController, markAppointmentCompletedController, deleteAppointmentController, giveRatingController } = require("../controllers/DoctorCtrl");
const router=express.Router();

router.get("/getDoctorInfo",authMiddleware,getDoctorInfoContoller);

router.post("/updateDoctorProfile",authMiddleware,updateDoctorProfilecController);

//for getting appointment doctor details
router.post("/getDoctorById",authMiddleware,getDoctorByIdContoller);

router.get("/getDoctorAppointments",authMiddleware,getDoctorAppointmentsController)

router.post("/markAppointmentCompleted",authMiddleware,markAppointmentCompletedController);

router.post("/deleteAppointment",authMiddleware,deleteAppointmentController);
router.post("/giveRating",authMiddleware,giveRatingController);
module.exports=router;