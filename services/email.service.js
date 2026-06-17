const nodemailer = require("nodemailer");
const dns = require("dns");

const mailer = (userId, password, mailData) => {
  return {
    sendMail: (mailData, callback) => {
      dns.lookup('smtp.gmail.com', { family: 4 }, (err, address) => {
        if (err) {
          console.error("[MAILER_DNS] DNS lookup failed for smtp.gmail.com:", err.message);
          return callback(err);
        }
        const transporter = nodemailer.createTransport({
          host: address,
          port: 465,
          secure: true,
          tls: {
            servername: 'smtp.gmail.com'
          },
          auth: {
            user: userId,
            pass: password,
          },
        });
        transporter.sendMail(mailData, callback);
      });
    }
  };
};

module.exports = mailer;
