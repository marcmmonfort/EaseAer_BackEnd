import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const NewsSchema = new Schema(
  {
    uuid: {
        type: String,
        default: () => uuid(),
        required: true,
        unique: true,
    },
    idUserAuthorNews: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    titleNews: {
        type: String,
        required: true,
    },
    subtitleNews: {
        type: String,
        required: true,
    },
    descriptionNews: {
        type: String,
        required: true,
    },
    dateNews: {
        type: Schema.Types.Date,
        required: true,
    },
    deletedNews: {
        type: Boolean,
        required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const NewsModel = model("news", NewsSchema);

export default NewsModel;
