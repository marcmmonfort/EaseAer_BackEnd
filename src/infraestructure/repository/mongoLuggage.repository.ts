import { Types } from "mongoose";
import { LuggageEntity } from "../../domain/luggage/luggage.entity";
import { LuggageRepository } from "../../domain/luggage/luggage.repository";
import LuggageModel from "../model/luggage.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoLuggageRepository implements LuggageRepository {

    // CASE 1: createLuggage(data: LuggageEntity): Promise<LuggageEntity | null | string>;
    async createLuggage(data: LuggageEntity): Promise<any> {
        const {
            uuid,
            idUserLuggage,
            idFlightLuggage,
            infoLuggage,
            statusLuggage,
            deletedLuggage
        } = data;
        const checkIs = await LuggageModel.findOne({ uuid });
        if (checkIs) return "ALREADY_LUGGAGE";
        const luggage = await LuggageModel.create(data);
        const updatedLuggage = {
            uuid: luggage._id,
            idUserLuggage,
            idFlightLuggage,
            infoLuggage,
            statusLuggage,
            deletedLuggage
        };
        const response = await LuggageModel.findOneAndUpdate(
            { _id: updatedLuggage.uuid },
            updatedLuggage,
            { new: true }
        );
        return response;
    }

    // CASE 2: getLuggageById(uuid: string): Promise<LuggageEntity | null>;
    async getLuggageById(uuid: string): Promise<any> {
        const response = await LuggageModel.findOne({ _id: uuid });
        return response;
    }

    // CASE 3: getLuggageByFlight(flight: string): Promise<LuggageEntity[] | null>;
    async getLuggageByFlight(flight: string): Promise<any> {   
        try {
            const luggages = await LuggageModel.find({ idFlightLuggage: flight });
            return luggages;
        } catch (error) {
            return "ANY_LUGGAGE_FOUND_IN_FLIGHT";
        }
    }

    // CASE 4: getLuggageByUser(user: string): Promise<LuggageEntity[] | null>;
    async getLuggageByUser(user: string): Promise<any> {   
        try {
            const luggages = await LuggageModel.find({ idUserLuggage: user });
            return luggages;
        } catch (error) {
            return "ANY_LUGGAGE_FOUND_OF_USER";
        }
    }

    // CASE 5: getNumLuggage(): Promise<String | null>;
    async getNumLuggage(): Promise<any> {
        const response = (await LuggageModel.countDocuments({})).toString();
        return response;
    }

    // CASE 6: updateLuggageById(uuid: string, data: LuggageEntity): Promise<LuggageEntity | null>;
    async updateLuggageById(uuid: string, data: LuggageEntity): Promise<any> {
        const response = await LuggageModel.findOneAndUpdate({ _id: uuid }, data, { new: true });
        return response;
    }

    // CASE 7: deleteLuggage(uuid: string): Promise<LuggageEntity | null>;
    async deleteLuggage(uuid: string): Promise<any> {
        const response = await LuggageModel.findOneAndRemove({ _id: uuid });
        return response;
    }

}


