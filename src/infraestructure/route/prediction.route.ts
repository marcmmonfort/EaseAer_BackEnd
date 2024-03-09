import { Router } from "express";
import { PredictionUseCase } from "../../application/predictionUseCase";
import { PredictionController } from "../controller/prediction.ctrl";
import { MongoPredictionRepository } from "../repository/mongoPrediction.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routePrediction = Router();

const predictionRepo = new MongoPredictionRepository();
const predictionUseCase = new PredictionUseCase(predictionRepo);
const predictionCtrl = new PredictionController(predictionUseCase);

// CASE 1: createPrediction(data: PredictionEntity): Promise<PredictionEntity | null | string>;
routePrediction.post("/prediction/create", predictionCtrl.createPredictionCtrl);

// CASE 2: getPredictionById(uuid: string): Promise<PredictionEntity | null>;
routePrediction.get("/prediction/getbyid/:uuid", checkJwt, predictionCtrl.getPredictionByIdCtrl);

// CASE 3: getNumPredictions(): Promise<String | null>;
routePrediction.get("/prediction/all/count/docs", checkJwt, predictionCtrl.getNumPredictionsCtrl);

// CASE 4: getTravelTimeOfPrediction(uuid: string): Promise<Number | null>;
routePrediction.get("/prediction/gettraveltime/:uuid", checkJwt, predictionCtrl.getTravelTimeOfPredictionCtrl);

// CASE 5: updatePredictionById(uuid: string, data: PredictionEntity): Promise<PredictionEntity | null>;
routePrediction.put("/prediction/update/:uuid", checkJwt, predictionCtrl.updatePredictionByIdCtrl);

// CASE 6: deletePrediction(uuid: string): Promise<PredictionEntity | null>;
routePrediction.delete("/prediction/delete/:uuid", checkJwt, predictionCtrl.deletePredictionCtrl);

export default routePrediction;
