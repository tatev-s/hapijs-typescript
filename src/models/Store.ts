import mongoose, { Schema, Document } from "mongoose";

export const StoreDocName: string = "Stores";

export interface IStore extends Document {
  name: string;
}

// Schema
export const Store = new Schema<IStore>(
  {
    name: { type: String, required: true, index: { unique: true } },
  },
  {
    timestamps: true,
    collection: StoreDocName,
  }
);
export default mongoose.model<IStore>(StoreDocName, Store);
