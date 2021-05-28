const Patient = require("../models/patient.model");

class PatientCtrl {
  static createPatient(req, res) {
    const u = req.body;

    const patientObj = new Patient(u);

    patientObj
      .save()
      .then((result) => {
        res.status(200).send({ message: "Patient created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not created a patient", error: err });
      });
  }
  // end of createPatient

  // updatePatient
  static updatePatient(req, res) {
    const { id } = req.params;
    const u = req.body;

    Patient.findByIdAndUpdate(id, u, { new: true }, (err, result) => {
      if (err)
        res
          .status(404)
          .send({ message: "Could not updated the patient", error: err });
      else
        res.status(200).send({
          message: "Patient updated successsfully",
          data: result,
        });
    });
  }
  // end of updatePatient

  // deletePatient
  static deletePatient(req, res) {
    const { id } = req.params;

    Patient.findByIdAndUpdate(
      id,
      { status: 2 },
      { new: true },
      (err, result) => {
        if (err)
          res
            .status(404)
            .send({ message: "Could not deleted the patient", error: err });
        else
          res.status(200).send({
            message: "Patient deleted successsfully",
            data: result,
          });
      }
    );
  }
  // end of deletePatient

  // getPatient
  static getPatient(req, res) {
    const { id } = req.params;

    Patient.findOne({
      _id: id,
      $or: [{ status: 1 }, { status: 0 }],
    })
      .select("name mobile email address patientId age status  createdAt")

      .exec()
      .then((result) => {
        res.status(200).send({ message: "Patient ", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the patient", error: err });
      });
  }
  // end of getPatient

  // getPatients
  static getPatients(req, res) {
    Patient.find({
      $or: [{ status: 0 }, { status: 1 }],
    })
      .select("name mobile email patientId age status address createdAt")

      .exec()
      .then((result) => {
        res.status(200).send({ message: "Patient List", data: result });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not load the patients", error: err });
      });
  }
  // end of getPatients
}

module.exports = PatientCtrl;
