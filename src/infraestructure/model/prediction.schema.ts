import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const PredictionSchema = new Schema(
  {
    uuid: {
        type: String,
        default: () => uuid(),
        required: true,
        unique: true,
    },
    idUserPrediction: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    idFlightPredition: {
        type: Schema.Types.ObjectId,
        ref: "flights",
    },
    datePrediction: {
        type: Date,
        required: true,
    },
    exitHomeTimePrediction: {
        type: String,
        required: false,
    },
    transportTimePrediction: {
        type: String,
        required: false,
    },
    entranceTimePrediction: {
        type: String,
        required: false,
    },
    checkInTimePrediction: {
        type: String,
        required: false,
    },
    securityTimePrediction: {
        type: String,
        required: false,
    },
    passportTimePrediction: {
        type: String,
        required: false,
    },
    gateTimePrediction: {
        type: String,
        required: false,
    },
    planeTimePrediction: {
        type: String,
        required: false,
    },
    deletedPrediction: {
        type: Boolean,
        required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PredictionModel = model("predictions", PredictionSchema);

export default PredictionModel;
