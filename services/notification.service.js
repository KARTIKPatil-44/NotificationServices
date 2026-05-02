const Ticket = require("../models/ticketNotification");
const { STATUS_CODES } = require("../utils/constants");

const create = async (data) => {
  try {
    const ticket = await Ticket.create(data);
    return ticket;
  } catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw {
        err,
        code: STATUS_CODES.UNPROCESSABLE,
      };
    }
    throw error;
  }
};

const getAll = async () => {
  try {
    const responce = await Ticket.find();
    return responce;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const responce = await Ticket.findById(id);
    if (!responce) {
      throw {
        err: "No ticket details found",
        code: STATUS_CODES.NOT_FOUND,
      };
    }
    return responce;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
