import { Types } from "mongoose";
import { PredictionEntity } from "../../domain/prediction/prediction.entity";
import { PredictionRepository } from "../../domain/prediction/prediction.repository";
import PredictionModel from "../model/prediction.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { NotFoundError } from "../../application/notFoundError";

export class MongoPredictionRepository implements PredictionRepository {

    // CASE 1: createPrediction(data: PredictionEntity): Promise<PredictionEntity | null | string>;
    async createPrediction(data: PredictionEntity): Promise<any> {
        const {
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
        } = data;
        const checkIs = await PredictionModel.findOne({ idUserPrediction, idFlightPredition });
        if (checkIs) return "ALREADY_PREDICTED";
        const prediction = await PredictionModel.create(data);
        const predictionUpdate = {
            uuid: prediction._id,
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
        };
        const response = await PredictionModel.findOneAndUpdate(
            { _id: predictionUpdate.uuid },
            predictionUpdate,
            { new: true }
        );
        return response;
    }

    // CASE 2: getPredictionById(uuid: string): Promise<PredictionEntity | null>;
    async getPredictionById(uuid: string): Promise<any> {
        const response = await PredictionModel.findOne({ _id: uuid });
        return response;
    }

    // CASE 3: getNumPredictions(): Promise<String | null>;
    async getNumPredictions(): Promise<any> {
        const response = (await PredictionModel.countDocuments({})).toString();
        return response;
    }

    // CASE 4: getTravelTimeOfPrediction(uuid: string): Promise<Number | null>;
    async getTravelTimeOfPrediction(uuid: string): Promise<any> {
        const prediction = await PredictionModel.findOne({ _id: uuid });
        
        if (!prediction) { throw new NotFoundError("CANNOT_GET_PREDICTION_BY_ID"); }
        
        const startTimeHHMM = prediction.exitHomeTimePrediction;
        const endTimeHHMM = prediction.planeTimePrediction;

        if (startTimeHHMM === undefined || endTimeHHMM === undefined) {
            throw new Error("START_AND_END_TIME_UNDEFINED");
        }

        const [startHour, startMinute] = startTimeHHMM.split(':').map(Number);
        const [endHour, endMinute] = endTimeHHMM.split(':').map(Number);

        const totalMinutesStart = startHour * 60 + startMinute;
        const totalMinutesEnd = endHour * 60 + endMinute;
        const travelTime = totalMinutesEnd - totalMinutesStart;

        return travelTime;
    }

    // CASE 5: updatePredictionById(uuid: string, data: PredictionEntity): Promise<PredictionEntity | null>;
    async updatePredictionById(uuid: string, data: PredictionEntity): Promise<any> {
        const response = await PredictionModel.findOneAndUpdate({ _id: uuid }, data, { new: true });
        return response;
    }

    // CASE 6: deletePrediction(uuid: string): Promise<PredictionEntity | null>;
    async deletePrediction(uuid: string): Promise<any> {
        const response = await PredictionModel.findOneAndRemove({ _id: uuid });
        return response;
    }
}


