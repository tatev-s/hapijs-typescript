import mongoose from "mongoose";

import Book, {IBook} from "../../models/Book";
import {StoreDocName} from "../../models/Store";

export default class BookService {

  public static async create(payload: IBook) {
    try {
      const book: IBook = await Book.create(payload);
      return book;
    } catch (e: any) {
      throw e;
    }
  }

  public static async getById(id: string) {
    try {
      return await Book.aggregate([
        {$match: {_id: new mongoose.Types.ObjectId(id)}},
        {
          $lookup: {
            from: StoreDocName,
            localField: "stores",
            foreignField: "_id",
            as: "stores",
          },
        },
      ]);
    } catch (e: any) {
      throw e;
    }
  }
}
