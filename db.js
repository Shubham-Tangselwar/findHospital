const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/hospital";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on("open", () => {
  console.log("Connected to databse hospital");
});

conn.on("error", () => {
  console.log("could not connected to the database hospital");
});
