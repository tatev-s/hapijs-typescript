import Joi from "joi";

export default {
  create: {
    payload: {
      name: Joi.string().min(3).required(),
    },
  },
  getById: {
    params: {
      id: Joi.string().required(),
    },
  },
};
