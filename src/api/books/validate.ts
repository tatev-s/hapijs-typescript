import Joi from "joi";

import { ObjectId } from "mongoose";
import StoreDocModel, { IStore } from "../../models/Store";

export const validateStoreIds = async (stores: ObjectId[]) => {
  const storePromises = stores.map((storeId) =>
    StoreDocModel.findById(storeId)
  );
  try {
    const data = await Promise.allSettled(storePromises);
    const res: ObjectId[] = data
      .filter(
        (item) => item.status === "fulfilled" && item.value && item.value._id
      )// @ts-ignore
      .map((item): ObjectId => item.value._id);
    return res;
  } catch (error) {
    throw error;
  }
};
export default {
  create: {
    payload: {
      price: Joi.number().positive().required(),
      size: Joi.number().positive().integer().required(),
      name: Joi.string().min(3).required(),
      store: Joi.string(),
      stores: Joi.array().items(Joi.string()).unique().required(),
    },
  },
  getById: {
    params: {
      id: Joi.string().required(),
    },
  },
};
