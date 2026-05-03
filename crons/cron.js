const cron = require("cron");
const TIcket = require("../models/ticketNotification");
const sendMail = require("../services/email.service");

cron.schedule("*/2 * * * *", async () => {
  const notificationsToBeSent = await TIcket.find({
    status: "PENDING",
  });

  notificationsToBeSent.forEach((Notification) => {
    const mailData = {
      from: "mba@support.com",
      to: notification.recepientEmails,
      subject: notification.subject,
      text: notification.content,
    };
    sendMail(process.env.EMAIL, process.env.EMAIL_PASS, mailData);
  });
});
