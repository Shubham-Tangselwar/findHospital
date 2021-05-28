const { verifyToken, createToken } = require("../helpers/token");
const sendEmail = require("../helpers/email");
const User = require("../models/user.model");
class AuthController {
  static refreshToken(req, res) {
    const token = req.headers.authorization;
    console.log("Token - ", token);
    if (!token) {
      res.status(403).send({ message: "You need to login", error: null });
    } else {
      try {
        var payload = verifyToken(token);
      } catch {
        res.status(401).send({ message: "You need to login", error: null });
      }
      if (!payload) {
        res.status(401).send({ message: "You need to login", error: null });
      } else {
        const { id, role } = payload;
        const token = createToken({ id, role });
        res.set("x-token", token);

        User.findOne({
          _id: id,
          $or: [{ status: 1 }, { status: 0 }],
        })
          .select("name mobile email userId age status role createdAt")
          .populate("hospitalId")
          .exec()
          .then((result) => {
            console.log("user- ", result);
            res.status(200).send({ message: "User", data: result });
          })

          .catch((err) => {
            console.log(err);
            res
              .status(404)
              .send({ message: "Could not load the user", error: err });
          });
      }
    }
  } //refershToken

  static passwordResetLink(req, res) {
    const { email } = req.body;

    User.findOne({
      email: email,
      status: 1,
    })

      .exec()
      .then((result) => {
        const token = createToken({ id: result._id, role: result.role });
        const resetURL = `${req.headers.origin}/change-password/${token}`;

        const textBody = `Copy the below url and paste into the web browser addressbar 
        ${resetURL}`;

        const htmlBody = `<p>click the below password reset link</p>
        <a href="${resetURL}"> ${resetURL}</a>`;

        sendEmail(
          email,
          "topperskills25@gmail.com",
          "Admin@12345",
          "Password reset link",
          textBody,
          htmlBody
        );

        res.set("x-token", token);
        res.status(200).send({ message: "Email sent", data: null });
      })

      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Invalid email or user is disabled", error: err });
      });
  }
}

module.exports = AuthController;
