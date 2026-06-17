const nodemailer = require("nodemailer");
const dns = require("dns");

const mailer = (userId, password) => {
  return {
    sendMail: async (mailData, callback) => {
      // Use Resend HTTP API if key is present (avoids SMTP port blocks on Render Free Tier)
      if (process.env.RESEND_API_KEY) {
        try {
          console.log("[MAILER] Attempting to send email via Resend API...");
          const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
          
          const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: fromEmail,
              to: mailData.to,
              subject: mailData.subject,
              text: mailData.text || mailData.html,
            }),
          });

          const resData = await response.json();
          if (!response.ok) {
            throw new Error(resData.message || `HTTP error! status: ${response.status}`);
          }

          console.log("[MAILER] Email sent successfully via Resend API:", resData);
          return callback(null, resData);
        } catch (err) {
          console.error("[MAILER] Resend API failed:", err.message);
          return callback(err);
        }
      }

      // Fallback to standard SMTP
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
