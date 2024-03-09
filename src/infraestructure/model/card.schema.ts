import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const CardSchema = new Schema(
  {
    uuid: {
      type: String,
      default: () => uuid(),
      required: true,
      unique: true,
    },
    idUserCard: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    numberCard: {
        type: Number,
        required: true,
        unique: true,
    },
    pointsCard: {
        type: Number,
        required: true,
    },
    levelCard: {
        type: String,
        enum: ["rookie", "explorer", "captain", "elite"],
        required: true,
    },
    deletedCard: {
        type: Boolean,
        required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CardModel = model("cards", CardSchema);

export default CardModel;
