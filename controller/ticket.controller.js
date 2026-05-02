const notificationService = require ("../services/notification.service");
const {successResponseBody, errorResponseBody} = require("../utils/responcebody");
const {STATUS_CODES} = require ("../utils/constants");


const createTicket = async(req , res) =>{
    try {
        const responce = await notificationService.create(req.body);
        successResponseBody.data = responce;
        return res.status(STATUS_CODES.OK).json(successResponseBody);
        
    } catch (error) {
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    createTicket,
}