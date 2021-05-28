const mongoose = require("mongoose");
const { Schema } = mongoose;
const AutoIncrement = require("mongoose-sequence")(mongoose);
const hospitalSchema = new Schema({
  hospitalId: Number,
  name: { type: String, minlength: 3, maxlength: 45 },
  mobile: { type: String, minlength: 10, maxlength: 15, unique: true },
  email: { type: String, minlength: 5, maxlength: 45, unique: true },
  status: { type: Number },
  address: { street: String, city: String, country: String, pincode: Number },
  createdAt: { type: Date, default: Date.now() },
  totalBeds: { type: Number, min: 0 },
  occupiedBeds: [],
});

hospitalSchema.plugin(AutoIncrement, { inc_field: "hispitalId" });
const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
