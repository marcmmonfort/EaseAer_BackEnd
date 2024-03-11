import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const MatchSchema = new Schema(
  {
    uuid: {
      type: String,
      default: () => uuid(),
      required: true,
      unique: true,
    },
    idUserAMatch: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    idUserBMatch: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false,
    },
    dateMatch: {
        type: Schema.Types.Date,
        required: false,
    },
    showMatch: {
        type: Boolean,
        required: true,
    },
    deletedMatch: {
        type: Boolean,
        required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MatchModel = model("matches", MatchSchema);

export default MatchModel;
