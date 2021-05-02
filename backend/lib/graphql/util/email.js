"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sendEmail = (email, subject, content) => {
  const transporter = _nodemailer.default.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SYSTEM_EMAIL,
      pass: process.env.SYSTEM_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.SYSTEM_EMAIL,
    to: email,
    subject,
    text: content
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return err;
    } else {
      return "Email sent: " + info.response;
    }
  });
};

exports.sendEmail = sendEmail;