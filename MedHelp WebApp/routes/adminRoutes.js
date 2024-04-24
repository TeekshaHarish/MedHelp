const express=require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllUsersController, getAllDoctorsController, changeDoctorStatusController, deleteDoctorController, deleteUserController } = require("../controllers/adminCtrl");
const isAdminMiddleware = require("../middlewares/isAdminMiddleware");

const router=express.Router();

router.get("/getAllUsers",authMiddleware,isAdminMiddleware, getAllUsersController);

router.get("/getAllDoctors",authMiddleware,isAdminMiddleware, getAllDoctorsController);

router.post("/changeDoctorStatus",authMiddleware,isAdminMiddleware, changeDoctorStatusController);

router.post("/deleteDoctor",authMiddleware,isAdminMiddleware, deleteDoctorController);

router.post("/deleteUser",authMiddleware,isAdminMiddleware,deleteUserController);

module.exports=router; 