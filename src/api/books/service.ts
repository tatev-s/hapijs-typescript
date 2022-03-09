import * as _ from "lodash";
import mongoose from "mongoose";

import Book, { IBook } from "../../models/Book";
import { StoreDocName } from "../../models/Store";

// function sleep(ms:number) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }
export default class BookService {

  public static async create(payload: IBook) {
    try {
      const book: IBook = await Book.create(payload);
      return book
    } catch (e: any) {
      throw e;
    }
  }

  public static async getById(id: string) {
    try {
      //await sleep(1000);
      const book = await Book.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: StoreDocName,
            localField: "stores",
            foreignField: "_id",
            as: "stores",
          },
        },
      ]);
      return book;
    } catch (e: any) {
      throw e;
    }
  }
}
