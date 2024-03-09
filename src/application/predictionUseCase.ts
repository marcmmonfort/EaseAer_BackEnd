import { PredictionRepository } from "../domain/prediction/prediction.repository";
import { PredictionValue } from "../domain/prediction/prediction.value";
import { NotFoundError } from "./notFoundError";

export class PredictionUseCase {
    constructor(private readonly predictionRepository: PredictionRepository) {}

    // CASE 1: createPrediction(data: PredictionEntity): Promise<PredictionEntity | null | string>;
    public createPrediction = async ({ 
        uuid,
        idUserPrediction,
        idFlightPredition,
        datePrediction,
        exitHomeTimePrediction,
        transportTimePrediction,
        entranceTimePrediction,
        checkInTimePrediction,
        securityTimePrediction,
        passportTimePrediction,
        gateTimePrediction,
        planeTimePrediction,
        deletedPrediction
    }:  {
        uuid: string;
        idUserPrediction: string;
        idFlightPredition: string;
        datePrediction: Date;
        exitHomeTimePrediction: string;
        transportTimePrediction: string;
        entranceTimePrediction: string;
        checkInTimePrediction: string;
        securityTimePrediction: string;
        passportTimePrediction: string;
        gateTimePrediction: string;
        planeTimePrediction: string;
        deletedPrediction: boolean;
    }) => {
        const predictionValue = new PredictionValue({ 
            uuid,
            idUserPrediction,
            idFlightPredition,
            datePrediction,
            exitHomeTimePrediction,
            transportTimePrediction,
            entranceTimePrediction,
            checkInTimePrediction,
            securityTimePrediction,
            passportTimePrediction,
            gateTimePrediction,
            planeTimePrediction,
            deletedPrediction
        });
        const prediction = await this.predictionRepository.createPrediction(predictionValue);
        if (!prediction) {
            throw new NotFoundError("CANNOT_CREATE_PREDICTION");
        }
        return prediction;
    };

    // CASE 2: getPredictionById(uuid: string): Promise<PredictionEntity | null>;
    public getPredictionById = async (uuid: string) => {
        const prediction = await this.predictionRepository.getPredictionById(uuid);
        if (!prediction) {
            throw new NotFoundError("CANNOT_GET_PREDICTION_BY_ID");
        }
        return prediction;
    };

    // CASE 3: getNumPredictions(): Promise<String | null>;
    public getNumPredictions = async () => {
        const numberPredictions = await this.predictionRepository.getNumPredictions();
        return numberPredictions;
    };

    // CASE 4: getTravelTimeOfPrediction(uuid: string): Promise<Number | null>;ç
    public getTravelTimeOfPrediction = async (uuid: string) => {
        const timePrediction = await this.predictionRepository.getTravelTimeOfPrediction(uuid);
        if (!timePrediction) {
            throw new NotFoundError("CANNOT_GET_TIME_PREDICTION");
        }
        return timePrediction;
    };

    // CASE 5: updatePredictionById(uuid: string, data: PredictionEntity): Promise<PredictionEntity | null>;
    public updatePredictionById = async (
        uuid: string,
        {
            idUserPrediction,
            idFlightPredition,
            datePrediction,
            exitHomeTimePrediction,
            transportTimePrediction,
            entranceTimePrediction,
            checkInTimePrediction,
            securityTimePrediction,
            passportTimePrediction,
            gateTimePrediction,
            planeTimePrediction,
            deletedPrediction
        }: {
            idUserPrediction: string;
            idFlightPredition: string;
            datePrediction: Date;
            exitHomeTimePrediction: string;
            transportTimePrediction: string;
            entranceTimePrediction: string;
            checkInTimePrediction: string;
            securityTimePrediction: string;
            passportTimePrediction: string;
            gateTimePrediction: string;
            planeTimePrediction: string;
            deletedPrediction: boolean;
        }
      ) => {
        const predictionValue: PredictionValue = new PredictionValue({
            uuid,
            idUserPrediction,
            idFlightPredition,
            datePrediction,
            exitHomeTimePrediction,
            transportTimePrediction,
            entranceTimePrediction,
            checkInTimePrediction,
            securityTimePrediction,
            passportTimePrediction,
            gateTimePrediction,
            planeTimePrediction,
            deletedPrediction
        });
        const prediciton = await this.predictionRepository.updatePredictionById(uuid, predictionValue);
        if (!prediciton) {
            throw new NotFoundError("PREDICTION_TO_UPDATE_NOT_FOUND");
        }
        return prediciton;
    };

    // CASE 6: deletePrediction(uuid: string): Promise<PredictionEntity | null>;
    public deletePrediction = async (uuid: string) => {
        const prediction = await this.predictionRepository.deletePrediction(uuid);
        return prediction;
    };
  
}
