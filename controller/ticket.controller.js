const notificationService = require ("../services/notification.service");
const {successResponseBody, errorResponseBody} = require("../utils/responcebody");
const {STATUS_CODES} = require ("../utils/constants");


const createTicket = async(req , res) =>{
    try {
        const responce = await notificationService.create(req.body);
        successResponseBody.data = responce;
        return res.status(STATUS_CODES.CREATED).json(successResponseBody);
        
    } catch (error) {
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getAllTickets = async (req, res) =>{
    try {
        const responce = await notificationService.getAll();
        successResponseBody.data = responce;
        successResponseBody.message = "Successfully fetched all the tickets";
        return res.status(STATUS_CODES.OK).json(successResponseBody);
        
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponseBody);
        
    }
}

const getTicket = async (req, res)=>{
    try {
        const responce = await notificationService.getById(req.params.id);
        successResponseBody.data = responce;
        successResponseBody.message = "Successfully fetched details of the given ticket id";
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
    getAllTickets,
    getTicket,
}