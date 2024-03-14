import { Router } from "express";
import { QuestionUseCase } from "../../application/questionUseCase";
import { QuestionController } from "../controller/question.ctrl";
import { MongoQuestionRepository } from "../repository/mongoQuestion.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeQuestion = Router();

const questionRepo = new MongoQuestionRepository();
const questionUseCase = new QuestionUseCase(questionRepo);
const questionCtrl = new QuestionController(questionUseCase);

// CASE 1: createQuestion(data: QuestionEntity): Promise<QuestionEntity | null | string>;
routeQuestion.post("/question/create", questionCtrl.createQuestionCtrl);

// CASE 2: getQuestionById(uuid: string): Promise<QuestionEntity | null>;
routeQuestion.get("/question/getbyid/:uuid", checkJwt, questionCtrl.getQuestionByIdCtrl);

// CASE 3: getQuestionsByDestination(destination: string): Promise<QuestionEntity[] | null>;
routeQuestion.get("/question/getbydestination/:destination", checkJwt, questionCtrl.getQuestionsByDestinationCtrl);

// CASE 4: getAnsToQuestion(uuid: string): Promise<String | null>;
routeQuestion.get("/question/getans/:uuid", checkJwt, questionCtrl.getAnsToQuestionCtrl);

// CASE 5: getNumQuestions(): Promise<string | null>;
routeQuestion.get("/question/all/count/docs", checkJwt, questionCtrl.getNumQuestionsCtrl);

// CASE 6: updateQuestion(uuid: string, data: QuestionEntity): Promise<QuestionEntity | null>;
routeQuestion.put("/question/update/:uuid", checkJwt, questionCtrl.updateQuestionCtrl);

// CASE 7: deleteQuestion(uuid: string): Promise<QuestionEntity | null>;
routeQuestion.delete("/question/delete/:uuid", checkJwt, questionCtrl.deleteQuestionCtrl);

export default routeQuestion;
