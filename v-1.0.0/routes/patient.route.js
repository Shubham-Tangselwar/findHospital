const express = require("express");

const PatientCtrl = require("../controllers/patient.controller");
const router = express.Router();

router.get("/:id", PatientCtrl.getPatient);

router.post("/", PatientCtrl.createPatient);

router.put("/:id", PatientCtrl.updatePatient);

router.delete("/:id", PatientCtrl.deletePatient);

router.get("/", PatientCtrl.getPatients);

module.exports = router;
