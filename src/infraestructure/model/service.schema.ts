import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const ServiceSchema = new Schema(
  {
    uuid: {
        type: String,
        default: () => uuid(),
        required: true,
        unique: true,
    },
    nameService: {
        type: String,
        required: true,
    },
    idLocationService: {
        type: Schema.Types.ObjectId,
        ref: "locations",
    },
    descriptionService: {
        type: String,
        required: true,
    },
    typeService: {
        type: String,
        required: true,
    },
    scheduleService: {
        type: String,
        required: true,
    },
    deletedService: {
        type: Boolean,
        required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ServiceModel = model("services", ServiceSchema);

export default ServiceModel;
