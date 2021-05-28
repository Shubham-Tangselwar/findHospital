const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const { Schema } = mongoose;

const patientSchema = new Schema({
  patientId: Number,
  name: {
    first: { type: String, minlength: 3, maxlength: 20 },
    last: { type: String, minlength: 3, maxlength: 20 },
  },
  mobile: { type: String, maxlength: 15, unique: true },
  email: { type: String, maxlength: 45, required: true, unique: true },
  address: { street: String, city: String, country: String, pincode: Number },
  age: { type: Number, min: 1 },
  status: Number,
  createdAt: { type: Date, default: Date.now() },
});

patientSchema.plugin(AutoIncrement, { inc_field: "patientId" });

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
