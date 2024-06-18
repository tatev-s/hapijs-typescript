import Mongoose from "mongoose";

import Book, { IBook } from "../models/Book";
import Store, { IStore } from "../models/Store";

import { IDataConfiguration } from "../utils/settings";

export interface IDatabase {
  bookModel: Mongoose.Model<IBook>;
  storeModel: Mongoose.Model<IStore>;
}

export function init(config: IDataConfiguration): IDatabase {
  Mongoose.Promise = Promise;
  Mongoose.connect(config.connectionString);

  const mongoDb = Mongoose.connection;
  // Mongodb error when unable to connect
  mongoDb.on("error", () => {
    console.log(`Unable to connect to database: ${config.connectionString}`);
  });
  // Mongodb success on connection
  mongoDb.once("open", () => {
    console.log(`Connected to database: ${config.connectionString}`);
  });

  return {
    bookModel: Book,
    storeModel: Store,
  };
}
