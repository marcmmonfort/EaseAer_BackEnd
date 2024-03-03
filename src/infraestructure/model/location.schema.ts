import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const LocationSchema = new Schema(
  {
    uuid: {
      type: String,
      default: () => uuid(),
      required: true,
      unique: true,
    },
    nameLocation: {
      type: String,
      required: true,
    },
    latLocation: {
      type: String,
      required: true,
    },
    lonLocation: {
      type: String,
      required: true,
    },
    typeLocation: {
      type: String,
      enum: ["shop", "service"],
      required: true,
    },
    deletedLocation: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const LocationModel = model("locations", LocationSchema);

export default LocationModel;
