import mongoose, { Schema, ObjectId } from "mongoose";
import { StoreDocName } from "./Store";

export const BookDocName: string = "Books";

export interface IBook {
  name: string;
  size: number;
  price: number;
  createdAt: Date;
  updateAt: Date;
  stores: ObjectId[];
}

// Schema
export const Book = new Schema<IBook>(
  {
    name: { type: String, required: true },
    size: { type: Number, integer: true },
    price: { type: Number, required: true },
    stores: [
      {
        type: Schema.Types.ObjectId,
        ref: StoreDocName,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    collection: BookDocName,
  }
);

export default mongoose.model<IBook>(BookDocName, Book);
