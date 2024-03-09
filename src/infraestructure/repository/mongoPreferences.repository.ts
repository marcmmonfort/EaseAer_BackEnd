import { Types } from "mongoose";
import { PreferencesEntity } from "../../domain/preferences/preferences.entity";
import { PreferencesRepository } from "../../domain/preferences/preferences.repository";
import PreferencesModel from "../model/preferences.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { NotFoundError } from "../../application/notFoundError";

export class MongoPreferencesRepository implements PreferencesRepository {

    // CASE 1: createPreferences(data: PreferencesEntity): Promise<PreferencesEntity | null | string>;
    async createPreferences(data: PreferencesEntity): Promise<any> {
        const {
            uuid,
            idPredPreferences,
            foodPreferences,
            shopPreferences,
            carParkPreferences,
            luggagePreferences,
            marginPreferences,
            deletedPreferences
        } = data;
        const checkIs = await PreferencesModel.findOne({ idPredPreferences });
        if (checkIs) return "ALREADY_PREFERENCES";
        const preferences = await PreferencesModel.create(data);
        const preferencesUpdate = {
            uuid: preferences._id,
            idPredPreferences,
            foodPreferences,
            shopPreferences,
            carParkPreferences,
            luggagePreferences,
            marginPreferences,
            deletedPreferences
        };
        const response = await PreferencesModel.findOneAndUpdate(
            { _id: preferencesUpdate.uuid },
            preferencesUpdate,
            { new: true }
        );
        return response;
    }

    // CASE 2: getPreferencesById(uuid: string): Promise<PreferencesEntity | null>;
    async getPreferencesById(uuid: string): Promise<any> {
        const response = await PreferencesModel.findOne({ _id: uuid });
        return response;
    }

    // CASE 3: getDeltaOfPreferences(uuid: string): Promise<Number | null>;
    async getDeltaOfPreferences(uuid: string): Promise<any> {
        const preferences = await PreferencesModel.findOne({ _id: uuid });

        if (!preferences) { throw new NotFoundError("CANNOT_GET_PREFERENCES_BY_ID"); }

        // APLICAR LÓGICA (TIEMPOS) PARA OBTENER DELTA ...

        let delta = 0;

        const foodPref = preferences.foodPreferences; // "none" | "lightmeal" | "fullmeal";
        if (foodPref == "none"){ delta = delta + 1; }
        if (foodPref == "lightmeal"){ delta = delta + 2; }
        if (foodPref == "fullmeal"){ delta = delta + 3; }
        const shopPref = preferences.shopPreferences; // "none" | "look" | "search";
        if (shopPref == "none"){ delta = delta + 1; }
        if (shopPref == "look"){ delta = delta + 2; }
        if (shopPref == "search"){ delta = delta + 3; }
        const carParkPref = preferences.carParkPreferences; // "none" | "own" | "rentacar";
        if (carParkPref == "none"){ delta = delta + 1; }
        if (carParkPref == "own"){ delta = delta + 2; }
        if (carParkPref == "rentacar"){ delta = delta + 3; }
        const luggagePref = preferences.luggagePreferences; // "none" | "one" | "multiple" | "special";
        if (luggagePref == "none"){ delta = delta + 1; }
        if (luggagePref == "one"){ delta = delta + 2; }
        if (luggagePref == "multiple"){ delta = delta + 3; }
        if (luggagePref == "special"){ delta = delta + 4; }
        const marginPref = preferences.marginPreferences; // "none" | "low" | "mid" | "high";
        if (marginPref == "none"){ delta = delta + 1; }
        if (marginPref == "low"){ delta = delta + 2; }
        if (marginPref == "mid"){ delta = delta + 3; }
        if (marginPref == "high"){ delta = delta + 4; }

        return delta;
    }

    // CASE 4: getNumPreferences(): Promise<String | null>;
    async getNumPreferences(): Promise<any> {
        const response = (await PreferencesModel.countDocuments({})).toString();
        return response;
    }

    // CASE 5: updatePreferencesById(uuid: string, data: PreferencesEntity): Promise<PreferencesEntity | null>;
    async updatePreferencesById(uuid: string, data: PreferencesEntity): Promise<any> {
        const response = await PreferencesModel.findOneAndUpdate({ _id: uuid }, data, { new: true });
        return response;
    }

    // CASE 6: deletePreferences(uuid: string): Promise<PreferencesEntity | null>;
    async deletePreferences(uuid: string): Promise<any> {
        const response = await PreferencesModel.findOneAndRemove({ _id: uuid });
        return response;
    }

}


