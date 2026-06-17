const noticationController = require ("../controller/ticket.controller");
const ticketMiddlewares = require("../middlewares/ticket.middleware");

const routes = (app) =>{
    app.get(
        "/notiservice/api/v1/version",
        (req, res) => {
            const dns = require('dns');
            dns.lookup('smtp.gmail.com', (err, address, family) => {
                res.status(200).json({
                    version: "version-diagnostics-1",
                    resolved: address,
                    family: family,
                    error: err ? err.message : null
                });
            });
        }
    );

    app.post(
        "/notiservice/api/v1/notifications",
        ticketMiddlewares.verifyTicketNotificationCreateRequest,
        noticationController.createTicket
    )


    app.get(
        "/notiservice/api/v1/notifications/:id",
        noticationController.getTicket,
    )

    app.get(
        "/notiservice/api/v1/notifications",
        noticationController.getAllTickets
    )
}

module.exports =  routes;