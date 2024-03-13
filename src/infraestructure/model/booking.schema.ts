import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const BookingSchema = new Schema(
  {
    uuid: {
      type: String,
      default: () => uuid(),
      required: true,
      unique: true,
    },
    idUserBooking: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    idOfferBooking: {
        type: Schema.Types.ObjectId,
        ref: "offers",
        required: false,
    },
    idServiceBooking: {
        type: Schema.Types.ObjectId,
        ref: "services",
        required: false,
    },
    scheduleBooking: {
        type: String,
        required: true,
    },
    statusBooking: {
        type: String,
        enum: ["sent", "accepted", "rejected"],
        required: true,
    },
    commentsBooking: {
        type: String,
        required: true,
    },
    deletedBooking: {
        type: Boolean,
        required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BookingModel = model("bookings", BookingSchema);

export default BookingModel;
