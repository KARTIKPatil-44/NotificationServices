const noticationController = require ("../controller/ticket.controller");
const ticketMiddlewares = require("../middlewares/ticket.middleware");

const routes = (app) =>{
    app.post(
        "/notiservice/api/v1/notifications",
        ticketMiddlewares.verifyTicketNotificationCreateRequest,
        noticationController.createTicket
    )
}

module.exports =  routes;