import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const FlightSchema = new Schema(
  {

    uuid: {
        type: String,
        default: () => uuid(),
        required: true,
        unique: true,
    },
    numberFlight: {
        type: String,
        required: true,
    },
    companyFlight: {
        type: String,
        required: true,
    },
    originFlight: {
        type: String,
        required: true,
    },
    destinationFlight: {
        type: String,
        required: true,
    },
    stdFlight: {
        type: Schema.Types.Date,
        required: true,
    },
    etdFlight: {
        type: Schema.Types.Date,
        required: true,
    },
    staFlight: {
        type: Schema.Types.Date,
        required: true,
    },
    etaFlight: {
        type: Schema.Types.Date,
        required: true,
    },
    depTerminalFlight: {
        type: String,
        required: false,
    },
    statusFlight: {
        type: String,
        enum: ["ontime", "delayed", "cancelled"],
        required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const FlightModel = model("flights", FlightSchema);

export default FlightModel;
