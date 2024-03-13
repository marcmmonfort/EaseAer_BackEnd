import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const GameSchema = new Schema(
    {
        uuid: {
            type: String,
            default: () => uuid(),
            required: true,
            unique: true,
        },
        idUserGame: {
            type: [Schema.Types.ObjectId],
            ref: "users",
            required: true,
        },
        destinationGame: {
            type: String,
            required: true,
        },
        questionsGame: {
            type: [Schema.Types.ObjectId],
            ref: "questions",
            required: true,
        },
        pointsGame: {
            type: Number,
            required: true,
        },
        deletedGame: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const GameModel = model("games", GameSchema);

export default GameModel;
