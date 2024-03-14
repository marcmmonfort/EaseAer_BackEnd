import { uploadUser } from "./multer/userMulter.ctrl";
import { QuestionUseCase } from "../../application/questionUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { QuestionEntity } from "../../domain/question/question.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { QuestionValue } from "../../domain/question/question.value";
import { isImageFile } from "../utils/isImage.handle";

export class QuestionController {
    emailService: EmailService;
    constructor(private questionUseCase: QuestionUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createQuestionCtrl = this.createQuestionCtrl.bind(this);
        this.getQuestionByIdCtrl = this.getQuestionByIdCtrl.bind(this);
        this.getQuestionsByDestinationCtrl = this.getQuestionsByDestinationCtrl.bind(this);
        this.getAnsToQuestionCtrl = this.getAnsToQuestionCtrl.bind(this);
        this.getNumQuestionsCtrl = this.getNumQuestionsCtrl.bind(this);
        this.updateQuestionCtrl = this.updateQuestionCtrl.bind(this);
        this.deleteQuestionCtrl = this.deleteQuestionCtrl.bind(this);
    }

    // CASE 1: createQuestion(data: QuestionEntity): Promise<QuestionEntity | null | string>;
    public async createQuestionCtrl(req: Request, res: Response) {
        const {
            uuid,
            destinationQuestion,
            statementQuestion,
            ansAQuestion,
            ansBQuestion,
            ansCQuestion,
            ansDQuestion,
            correctAnsQuestion
        } = req.body;
        try {
            const question = new QuestionValue({
                uuid: uuid,
                destinationQuestion: destinationQuestion,
                statementQuestion: statementQuestion,
                ansAQuestion: ansAQuestion,
                ansBQuestion: ansBQuestion,
                ansCQuestion: ansCQuestion,
                ansDQuestion: ansDQuestion,
                correctAnsQuestion: correctAnsQuestion
            });
            const response = await this.questionUseCase.createQuestion(question);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_QUESTION");
        }
    }

    // CASE 2: getQuestionById(uuid: string): Promise<QuestionEntity | null>;
    public async getQuestionByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.questionUseCase.getQuestionById(`${uuid}`);
        res.send(response);
    }

    // CASE 3: getQuestionsByDestination(destination: string): Promise<QuestionEntity[] | null>;
    public async getQuestionsByDestinationCtrl({ params }: Request, res: Response) {
        const { destination = "" } = params;
        const response = await this.questionUseCase.getQuestionsByDestination(`${destination}`);
        res.send(response);
    }

    // CASE 4: getAnsToQuestion(uuid: string): Promise<String | null>;
    public async getAnsToQuestionCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.questionUseCase.getAnsToQuestion(`${uuid}`);
        res.send(response);
    }

    // CASE 5: getNumQuestions(): Promise<string | null>;
    public async getNumQuestionsCtrl(req: Request, res: Response) {
        const response = await this.questionUseCase.getNumQuestions();
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }

    // CASE 6: updateQuestion(uuid: string, data: QuestionEntity): Promise<QuestionEntity | null>;
    public async updateQuestionCtrl(req: Request, res: Response) {
        const {
            uuid,
            destinationQuestion,
            statementQuestion,
            ansAQuestion,
            ansBQuestion,
            ansCQuestion,
            ansDQuestion,
            correctAnsQuestion
        } = req.body;
        try {
            const question = new QuestionValue({
                uuid: uuid,
                destinationQuestion,
                statementQuestion,
                ansAQuestion,
                ansBQuestion,
                ansCQuestion,
                ansDQuestion,
                correctAnsQuestion
            });
            const response = await this.questionUseCase.updateQuestion(uuid, question);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_UPDATE_QUESTION");
        }
    }

    // CASE 7: deleteQuestion(uuid: string): Promise<QuestionEntity | null>;
    public async deleteQuestionCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.questionUseCase.deleteQuestion(`${uuid}`);
        res.send(response);
    }
}
