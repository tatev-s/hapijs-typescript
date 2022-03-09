import * as _ from "lodash";

import mongoose from "mongoose";
import Store, { IStore } from "../../models/Store";

import { BookDocName } from "../../models/Book";

export default class StoreService {
  public static async create(payload: IStore) {
    try {
      const store: IStore = await Store.create(payload);
      return store;
    } catch (e: any) {
      throw e;
    }
  }

  public static async getById(id: string) {
    try {
      const store = await Store.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: BookDocName,
            foreignField: "stores",
            localField: "_id",
            pipeline: [
              {
                $project: {
                  stores: 0,
                },
              },
            ],
            as: "books",
          },
        },
      ]);
      return store;
    } catch (e: any) {
      throw e;
    }
  }
}
