const Hospital = require("../models/hospital.model");

class HospitalCtrl {
  // createHospital
  static createHospital(req, res) {
    const hosp = new Hospital(req.body);

    hosp
      .save()
      .then((result) => {
        res.status(200).send({ message: "Hospital created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not created the hospital", error: err });
      });
  }
  // end of createHospital

  // updateHospital
  static updateHospital(req, res) {
    const { id } = req.params;

    Hospital.findByIdAndUpdate(id, req.body, { new: true }, (err, result) => {
      if (err)
        res.status(404).send({ message: "Could not updated", error: Err });
      else
        res.status(200).send({ message: "Updated successfully", data: result });
    });
  }
  //   end of updateHospital

  // deleteHospital
  static deleteHospital(req, res) {
    const { id } = req.params;

    Hospital.findByIdAndUpdate(id, { status: 2 }, (err, result) => {
      if (err)
        res.status(404).send({ message: "Could not deleted", error: Err });
      else
        res.status(200).send({ message: "deleted successfully", data: result });
    });
  }
  //   end of deleteHospital

  // getHospital
  static getHospital(req, res) {
    const { id } = req.params;

    Hospital.findOne({ _id: id, $or: [{ status: 0 }, { status: 1 }] })
      .exec()
      .then((result) => {
        res.status(200).send({ message: "Hospital List", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "Hospital not available", error: err });
      });
  }
  //   end of getHospital

  // getHospitals

  static getHospitals(req, res) {
    Hospital.find({
      $or: [{ status: 1 }, { status: 0 }],
    })
      .exec()
      .then((result) => {
        res.status(200).send({ message: "Hospital List", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could load the hospitals", error: err });
      });
  }
  //   end of getHospitals
}

module.exports = HospitalCtrl;
