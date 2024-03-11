import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const IncidentSchema = new Schema(
  {
    uuid: {
      type: String,
      default: () => uuid(),
      required: true,
      unique: true,
    },
    idUserIncident: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    descriptionIncident: {
        type: String,
        required: true,
    },
    collectivesIncident: {
        type: String,
        enum: ["security", "medical", "fire", "cleaning", "assistance", "tech", "other"],
        required: true,
    },
    statusIncident: {
        type: String,
        enum: ["new", "received", "managed", "solved", "unsolved"],
        required: true,
    },
    deletedIncident: {
        type: Boolean,
        required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const IncidentModel = model("incidents", IncidentSchema);

export default IncidentModel;
