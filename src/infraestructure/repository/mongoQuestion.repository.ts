import { Types } from "mongoose";
import { QuestionEntity } from "../../domain/question/question.entity";
import { QuestionRepository } from "../../domain/question/question.repository";
import QuestionModel from "../model/question.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoQuestionRepository implements QuestionRepository {

    // CASE 1: createQuestion(data: QuestionEntity): Promise<QuestionEntity | null | string>;
    async createQuestion(data: QuestionEntity): Promise<any> {
        const {
            uuid,
            destinationQuestion,
            statementQuestion,
            ansAQuestion,
            ansBQuestion,
            ansCQuestion,
            ansDQuestion,
            correctAnsQuestion
        } = data;
        const checkIs = await QuestionModel.findOne({ uuid });
        if (checkIs) return "ALREADY_QUESTION";
        const question = await QuestionModel.create(data);
        const questionUpdate = {
            uuid: question._id,
            destinationQuestion,
            statementQuestion,
            ansAQuestion,
            ansBQuestion,
            ansCQuestion,
            ansDQuestion,
            correctAnsQuestion
        };
        const response = await QuestionModel.findOneAndUpdate(
            { _id: questionUpdate.uuid },
            questionUpdate,
            { new: true }
        );
        return response;
    }

    // CASE 2: getQuestionById(uuid: string): Promise<QuestionEntity | null>;
    async getQuestionById(uuid: string): Promise<any> {
        const response = await QuestionModel.findOne({ _id: uuid });
        return response;
    }

    // CASE 3: getQuestionsByDestination(destination: string): Promise<QuestionEntity[] | null>;
    async getQuestionsByDestination(destination: string): Promise<any> {
        const response = await QuestionModel.find({ destinationQuestion: destination });
        if (!response) {
            return "NOT_FOUND_QUESTIONS";
        }
        return response;
    }

    // CASE 4: getAnsToQuestion(uuid: string): Promise<String | null>;
    async getAnsToQuestion(uuid: string): Promise<any> {
        const question = await QuestionModel.findOne({ _id: uuid });
        if (!question) {
            return "NOT_FOUND_QUESTIONS";
        }
        return question.correctAnsQuestion;
    }

    // CASE 5: getNumQuestions(): Promise<string | null>;
    async getNumQuestions(): Promise<any> {
        const response = (await QuestionModel.countDocuments({})).toString();
        return response;
    }

    // CASE 6: updateQuestion(uuid: string, data: QuestionEntity): Promise<QuestionEntity | null>;
    async updateQuestion(uuid: string, data: QuestionEntity): Promise<any> {
        const response = await QuestionModel.findOneAndUpdate({ _id: uuid }, data, { new: true });
        return response;
    }

    // CASE 7: deleteQuestion(uuid: string): Promise<QuestionEntity | null>;
    async deleteQuestion(uuid: string): Promise<any> {
        const response = await QuestionModel.findOneAndRemove({ _id: uuid });
        return response;
    }

}
