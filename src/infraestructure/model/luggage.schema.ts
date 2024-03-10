import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const LuggageSchema = new Schema(
  {
    uuid: {
        type: String,
        default: () => uuid(),
        required: true,
        unique: true,
    },
    idUserLuggage: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    idFlightLuggage: {
        type: Schema.Types.ObjectId,
        ref: "flights",
        required: true,
    },
    infoLuggage: {
        type: String,
        required: true,
    },
    statusLuggage: {
        type: String,
        enum: ["waiting", "admitted", "security", "presorting", "finalsorting", "handling", "plane"],
        required: true,
    },
    deletedLuggage: {
        type: Boolean,
        required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const LuggageModel = model("luggages", LuggageSchema);

export default LuggageModel;
