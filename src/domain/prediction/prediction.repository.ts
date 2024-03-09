import { PredictionEntity } from "./prediction.entity";

export interface PredictionRepository {

    createPrediction(data: PredictionEntity): Promise<PredictionEntity | null | string>;

    getPredictionById(uuid: string): Promise<PredictionEntity | null>;

    getNumPredictions(): Promise<String | null>;

    getTravelTimeOfPrediction(uuid: string): Promise<Number | null>;

    updatePredictionById(uuid: string, data: PredictionEntity): Promise<PredictionEntity | null>;

    deletePrediction(uuid: string): Promise<PredictionEntity | null>;

    // CASE 1: createPrediction(data: PredictionEntity): Promise<PredictionEntity | null | string>;

    // CASE 2: getPredictionById(uuid: string): Promise<PredictionEntity | null>;

    // CASE 3: getNumPredictions(): Promise<String | null>;

    // CASE 4: getTravelTimeOfPrediction(uuid: string): Promise<Number | null>;

    // CASE 5: updatePredictionById(uuid: string, data: PredictionEntity): Promise<PredictionEntity | null>;

    // CASE 6: deletePrediction(uuid: string): Promise<PredictionEntity | null>;

}