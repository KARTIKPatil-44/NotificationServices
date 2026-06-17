const nodemailer = require("nodemailer");
const dns = require("dns");

const mailer = (userId, password, mailData) => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    lookup: (hostname, options, callback) => {
      dns.lookup(hostname, { family: 4 }, callback);
    },
    auth: {
      user: userId,
      pass: password,
    },
  });
};

module.exports = mailer;
