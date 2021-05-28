const nodemailer = require("nodemailer");
const smtptransport = require("nodemailer-smtp-transport");

function sendEmail(to, from, pass, subject, body, htmlBody) {
  const transporter = nodemailer.createTransport(
    smtptransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: from,
        pass: pass,
      },
    })
  );

  const mailOption = {
    from: `'Find Hospital' <${from}>`,
    replyTo: `'Find Hospital'<${from}>`,
    to: to,
    subject: subject,
    text: body,
    html: htmlBody,
  };

  transporter.sendMail(mailOption, (err, res) => {
    if (err) console.log(err);
    else console.log(res);
  });
}

module.exports = sendEmail;
