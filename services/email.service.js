const nodemailer = require("nodemailer");

const sendMail = (userId, password) => {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: userId,
      pass: password,
    },
  });
  transport.sendMail({
    from: "mba@support.com",
    to: "kartikpatilgames@gmail.com",
    subject: "Testing another email for nodemailer",
    text: "Hey, this is a test email",
  });
};

module.exports = sendMail;
