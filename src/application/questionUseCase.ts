import { QuestionRepository } from "../domain/question/question.repository";
import { QuestionValue } from "../domain/question/question.value";
import { NotFoundError } from "./notFoundError";

export class QuestionUseCase {
    constructor(private readonly questionRepository: QuestionRepository) {}

    // CASE 1: createQuestion(data: QuestionEntity): Promise<QuestionEntity | null | string>;

    public createQuestion = async ({
        uuid,
        destinationQuestion,
        statementQuestion,
        ansAQuestion,
        ansBQuestion,
        ansCQuestion,
        ansDQuestion,
        correctAnsQuestion
    }: {
        uuid: string;
        destinationQuestion: string;
        statementQuestion: string;
        ansAQuestion: string;
        ansBQuestion: string;
        ansCQuestion: string;
        ansDQuestion: string;
        correctAnsQuestion: string;
    }) => {
        const questionValue = new QuestionValue({
            uuid,
            destinationQuestion,
            statementQuestion,
            ansAQuestion,
            ansBQuestion,
            ansCQuestion,
            ansDQuestion,
            correctAnsQuestion
        });
        const question = await this.questionRepository.createQuestion(questionValue);
        if (!question) {
            throw new NotFoundError("CANNOT_CREATE_QUESTION");
        }
        return question;
    };

    // CASE 2: getQuestionById(uuid: string): Promise<QuestionEntity | null>;
    public getQuestionById = async (uuid: string) => {
        const question = await this.questionRepository.getQuestionById(uuid);
        if (!question) {
            throw new NotFoundError("CANNOT_GET_QUESTION_BY_ID");
        }
        return question;
    };

    // CASE 3: getQuestionsByDestination(destination: string): Promise<QuestionEntity[] | null>;
    public getQuestionsByDestination = async (destination: string) => {
        const questions = await this.questionRepository.getQuestionsByDestination(destination);
        if (!questions) {
            throw new NotFoundError("CANNOT_GET_QUESTIONS_BY_DESTINATION");
        }
        return questions;
    };

    // CASE 4: getAnsToQuestion(uuid: string): Promise<String | null>;
    public getAnsToQuestion = async (uuid: string) => {
        const ans = await this.questionRepository.getAnsToQuestion(uuid);
        if (!ans) {
            throw new NotFoundError("CANNOT_GET_ANS_TO_QUESTION");
        }
        return ans;
    };

    // CASE 5: getNumQuestions(): Promise<string | null>;
    public getNumQuestions = async () => {
        const numQuestions = await this.questionRepository.getNumQuestions();
        return numQuestions;
    };

    // CASE 6: updateQuestion(uuid: string, data: QuestionEntity): Promise<QuestionEntity | null>;
    public updateQuestion = async (
        uuid: string,
        {
            destinationQuestion,
            statementQuestion,
            ansAQuestion,
            ansBQuestion,
            ansCQuestion,
            ansDQuestion,
            correctAnsQuestion
        }: {
            destinationQuestion: string;
            statementQuestion: string;
            ansAQuestion: string;
            ansBQuestion: string;
            ansCQuestion: string;
            ansDQuestion: string;
            correctAnsQuestion: string;
        }
    ) => {
        const questionValue: QuestionValue = new QuestionValue({
            uuid,
            destinationQuestion,
            statementQuestion,
            ansAQuestion,
            ansBQuestion,
            ansCQuestion,
            ansDQuestion,
            correctAnsQuestion
        });
        const question = await this.questionRepository.updateQuestion(uuid, questionValue);
        if (!question) {
            throw new NotFoundError("QUESTION_TO_UPDATE_NOT_FOUND");
        }
        return question;
    };

    // CASE 7: deleteQuestion(uuid: string): Promise<QuestionEntity | null>;
    public deleteQuestion = async (uuid: string) => {
        const question = await this.questionRepository.deleteQuestion(uuid);
        return question;
    };
  
}
