import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const PrizeSchema = new Schema(
  {
    uuid: {
      type: String,
      default: () => uuid(),
      required: true,
      unique: true,
    },
    pointsPrize: {
        type: Number,
        required: true,
    },
    namePrize: {
        type: String,
        required: true,
    },
    descriptionPrize: {
        type: String,
        required: true,
    },
    idShopPrize: {
        type: Schema.Types.ObjectId,
        ref: "shops",
        required: true,
    },
    dateEndPrize: {
        type: Schema.Types.Date,
        required: true,
    },
    codePrize: {
        type: String,
        required: true,
    },
    deletedPrize: {
        type: Boolean,
        required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PrizeModel = model("prizes", PrizeSchema);

export default PrizeModel;
