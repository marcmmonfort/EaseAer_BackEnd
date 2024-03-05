import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const UserSchema = new Schema(
  {
    uuid: {
        type: String,
        default: () => uuid(),
        required: true,
        unique: true,
    },
    nameProduct: {
        type: String,
        required: true,
    },
    descriptionProduct: {
        type: String,
        required: true,
    },
    codeProduct: {
        type: String,
        required: true,
        unique: true,
    },
    deletedProduct: {
        type: Boolean,
        required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model("products", UserSchema);

export default UserModel;
