import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const UserSchema = new Schema(
  {
    uuid: {
      type: String,
      default: () => uuid(),
      required: true,
      unique: true,
    },
    appUser: {
      type: String,
      required: true,
      unique: true,
    },
    nameUser: {
      type: String,
      required: true,
    },
    surnameUser: {
      type: String,
      required: true,
    },
    mailUser: {
      type: String,
      required: true,
      unique: true,
    },
    passwordUser: {
      type: String,
      required: true,
    },
    photoUser: {
      type: String,
      required: false,
    },
    birthdateUser: {
      type: Schema.Types.Date,
      required: true,
    },
    genderUser: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    descriptionUser: {
      type: String,
      required: true,
    },
    privacyUser: {
      type: Boolean,
      required: true,
    },
    roleUser: {
      type: String,
      enum: ["pax", "company", "admin", "tech"],
      required: true,
    },
    deletedUser: {
      type: Boolean,
      required: true,
    },
    flightsUser: {
      type: [Schema.Types.ObjectId],
      ref: "flights",
    },
    recordGameUser: {
      type: Number,
      required: false,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model("users", UserSchema);

export default UserModel;
