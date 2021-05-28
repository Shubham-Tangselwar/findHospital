const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: Number },
  name: {
    first_name: { type: String, minlength: 3, maxlength: 20 },
    last_name: { type: String, minlength: 3, maxlength: 20 },
  },
  mobile: { type: String, maxlength: 15, unique: true },
  email: { type: String, maxlength: 40, required: true, unique: true },
  password: { type: String, maxlength: 100, required: true },
  role: String,
  status: Number,
  createdAt: { type: Date, default: Date.now() },
  hospitalId: { type: mongoose.Types.ObjectId, ref: "Hospital" },
});

userSchema.plugin(AutoIncrement, { inc_field: "userId" });

const User = mongoose.model("User", userSchema);

module.exports = User;
