import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const QuestionSchema = new Schema(
  {
    uuid: {
      type: String,
      default: () => uuid(),
      required: true,
      unique: true,
    },
    destinationQuestion: {
        type: String,
        required: true,
    },
    statementQuestion: {
        type: String,
        required: true,
    },
    ansAQuestion: {
        type: String,
        required: true,
    },
    ansBQuestion: {
        type: String,
        required: true,
    },
    ansCQuestion: {
        type: String,
        required: true,
    },
    ansDQuestion: {
        type: String,
        required: true,
    },
    correctAnsQuestion: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const QuestionModel = model("questions", QuestionSchema);

export default QuestionModel;
