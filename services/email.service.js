const nodemailer = require("nodemailer");
const dns = require("dns");

const mailer = (userId, password, mailData) => {
  return nodemailer.createTransport({
    service: "Gmail",
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
