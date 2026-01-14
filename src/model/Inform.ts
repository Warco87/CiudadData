import mongoose, { Schema, Document } from "mongoose";

export interface Inform extends Document {
  title: string;
  description: string;
  email:string;
}

const InformSchema = new Schema<Inform>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true }
});

const InformModel = mongoose.model<Inform>("Inform", InformSchema);
export default InformModel;