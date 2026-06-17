const cron = require("node-cron");
const Ticket = require("../models/ticketNotification");
const Mailer = require("../services/email.service");

const mailerCron = () => {
  const mailer = Mailer(process.env.EMAIL, process.env.EMAIL_PASS);
  cron.schedule("*/30 * * * * *", async () => {
    console.log("Executing cron again");
    const notificationsToBeSent = await Ticket.find({
      status: "PENDING",
    });

    notificationsToBeSent.forEach(async (notification) => {
      console.log("Locking and processing Notification ID:", notification._id);
      
      // Lock ticket immediately to prevent duplicate runs
      notification.status = "SUCCESS";
      await notification.save();

      const mailData = {
        from: process.env.EMAIL,
        to: notification.recepientEmails,
        subject: notification.subject,
        text: notification.content,
      };

      mailer.sendMail(mailData, async (err, data) => {
        if (err) {
          console.error(`[CRON_MAIL_ERROR] Failed to send ID ${notification._id}:`, err.message);
          
          // Revert status to PENDING on failure for retry
          const savedNotification = await Ticket.findById(notification._id);
          if (savedNotification) {
            savedNotification.status = "PENDING";
            await savedNotification.save();
          }
        } else {
          console.log(`[CRON_MAIL_SUCCESS] Successfully sent ID ${notification._id}:`, data);
        }
      });
    });
  });
};

module.exports = {
  mailerCron,
};
