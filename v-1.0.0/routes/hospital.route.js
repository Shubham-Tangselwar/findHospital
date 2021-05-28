const express = require("express");
const HospitalCtrl = require("../controllers/hospital.controller");
const router = express.Router();

router.post("/", HospitalCtrl.createHospital);

router.put("/:id", HospitalCtrl.updateHospital);

router.delete("/:id", HospitalCtrl.deleteHospital);

router.get("/", HospitalCtrl.getHospitals);

router.get("/:id", HospitalCtrl.getHospital);
module.exports = router;
