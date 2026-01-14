import mongoose, { Schema, Document } from "mongoose";
import { Inform } from "./Inform"; // si ya tienes el modelo Inform

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  informes: Inform["_id"][]; 
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  informes: [{ type: Schema.Types.ObjectId, ref: "Inform" }]
}, { timestamps: true });

//Aquí se crea y exporta el UserModel
const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
