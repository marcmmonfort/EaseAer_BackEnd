import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const OfferSchema = new Schema(
  {
    uuid: {
        type: String,
        default: () => uuid(),
        required: true,
        unique: true,
    },
    idShopOffer: {
        type: Schema.Types.ObjectId,
        ref: "shops",
        required: true,
    },
    priceOffer: {
        type: Number,
        required: true,
    },
    idProductOffer: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    dateEndOffer: {
        type: Date,
        required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OfferModel = model("offers", OfferSchema);

export default OfferModel;
