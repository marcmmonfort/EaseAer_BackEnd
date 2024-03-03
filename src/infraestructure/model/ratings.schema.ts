import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const RatingsSchema = new Schema(
  {
    uuid: {
      type: String,
      default: () => uuid(),
      required: true,
      unique: true,
    },
    typeRating: {
      type: String,
      enum: ["news", "service", "shop", "product"],
      required: true,
    },
    idObjectRating: {
      type: String,
      required: true,
      validate: {
        validator: async function (value: string) {
          const collections = ["news", "service", "shop", "product"];
          for (const collection of collections) {
            const result = await model(collection)
              .findOne({ _id: value })
              .exec();
            if (result) {
              return true;
            }
          }
          return false;
        },
      },
    },
    averageRating: {
      type: Number,
      required: true,
    },
    idsUsersRating: {
      type: [Schema.Types.ObjectId],
      ref: "users",
      required: false,
    },
    commentRating: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RatingsModel = model("ratings", RatingsSchema);

export default RatingsModel;
