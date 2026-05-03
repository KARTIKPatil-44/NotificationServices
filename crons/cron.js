const cron = require("node-cron");
const TIcket = require("../models/ticketNotification");
const Mailer = require("../services/email.service");

const mailerCron = () => {
  const mailer = Mailer(process.env.EMAIL, process.env.EMAIL_PASS);
  cron.schedule("*/2 * * * *", async () => {
    console.log("Executing cron again");
    const notificationsToBeSent = await TIcket.find({
      status: "PENDING",
    });

    notificationsToBeSent.forEach(notification =>{
        const mailData = {
            from: "mba@support.com",
            to: notification.recepientEmails,
            subject: notification.subject,
            text: notification.content
        };
        mailer.sendMail(mailData, async (err , data) =>{
            if(err){
                console.log(err);
            }else{
                console.log(data);
                const savedNotification = await TIcket.findOne({_id: notification._id});
                savedNotification.status = "SUCCESS";
                await savedNotification.save();
            }
        })
    }) 
  });
};

module.exports = {
    mailerCron,
}
