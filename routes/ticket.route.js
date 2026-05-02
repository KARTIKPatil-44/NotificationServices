const noticationController = require ("../controller/ticket.controller");
const ticketMiddlewares = require("../middlewares/ticket.middleware");

const routes = (app) =>{
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