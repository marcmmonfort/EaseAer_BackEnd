import { QuestionEntity } from "./question.entity";

export interface QuestionRepository {

    createQuestion(data: QuestionEntity): Promise<QuestionEntity | null | string>;

    getQuestionById(uuid: string): Promise<QuestionEntity | null>;

    getQuestionsByDestination(destination: string): Promise<QuestionEntity[] | null>;

    getAnsToQuestion(uuid: string): Promise<String | null>;

    getNumQuestions(): Promise<string | null>;

    updateQuestion(uuid: string, data: QuestionEntity): Promise<QuestionEntity | null>;

    deleteQuestion(uuid: string): Promise<QuestionEntity | null>;

    // CASE 1: createQuestion(data: QuestionEntity): Promise<QuestionEntity | null | string>;

    // CASE 2: getQuestionById(uuid: string): Promise<QuestionEntity | null>;

    // CASE 3: getQuestionsByDestination(destination: string): Promise<QuestionEntity[] | null>;

    // CASE 4: getAnsToQuestion(uuid: string): Promise<String | null>;

    // CASE 5: getNumQuestions(): Promise<string | null>;

    // CASE 6: updateQuestion(uuid: string, data: QuestionEntity): Promise<QuestionEntity | null>;

    // CASE 7: deleteQuestion(uuid: string): Promise<QuestionEntity | null>;

}
