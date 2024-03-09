import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const PreferencesSchema = new Schema(
  {
    uuid: {
        type: String,
        default: () => uuid(),
        required: true,
        unique: true,
    },
    idPredPreferences: {
        type: Schema.Types.ObjectId,
        ref: "predictions",
    },
    foodPreferences: {
        type: String,
        enum: ["none", "lightmeal", "fullmeal"],
        required: true,
    },
    shopPreferences: {
        type: String,
        enum: ["none", "look", "search"],
        required: true,
    },
    carParkPreferences: {
        type: String,
        enum: ["none", "own", "rentacar"],
        required: true,
    },
    luggagePreferences: {
        type: String,
        enum: ["none", "one", "multiple", "special"],
        required: true,
    },
    marginPreferences: {
        type: String,
        enum: ["none", "low", "mid", "high"],
        required: true,
    },
    deletedPreferences: {
        type: Boolean,
        required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PreferencesModel = model("preferences", PreferencesSchema);

export default PreferencesModel;
