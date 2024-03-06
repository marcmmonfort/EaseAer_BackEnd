import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const ShopSchema = new Schema(
  {
    uuid: {
        type: String,
        default: () => uuid(),
        required: true,
        unique: true,
    },
    idCompanyShop: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    idLocationShop: {
        type: Schema.Types.ObjectId,
        ref: "locations",
    },
    descriptionShop: {
        type: String,
        required: true,
    },
    webShop: {
        type: String,
        required: true,
    },
    scheduleShop: {
        type: String,
        required: true,
    },
    deletedShop: {
        type: Boolean,
        required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ShopModel = model("shops", ShopSchema);

export default ShopModel;
