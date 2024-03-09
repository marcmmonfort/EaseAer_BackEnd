import { PreferencesRepository } from "../domain/preferences/preferences.repository";
import { PreferencesValue } from "../domain/preferences/preferences.value";
import { NotFoundError } from "./notFoundError";

export class PreferencesUseCase {
    constructor(private readonly preferencesRepository: PreferencesRepository) {}

    // CASE 1: createPreferences(data: PreferencesEntity): Promise<PreferencesEntity | null | string>;
    public createPreferences = async ({ 
        uuid,
        idPredPreferences,
        foodPreferences,
        shopPreferences,
        carParkPreferences,
        luggagePreferences,
        marginPreferences,
        deletedPreferences
    }:  {
        uuid: string;
        idPredPreferences: string; // idPrediction
        foodPreferences: "none" | "lightmeal" | "fullmeal";
        shopPreferences: "none" | "look" | "search";
        carParkPreferences: "none" | "own" | "rentacar";
        luggagePreferences: "none" | "one" | "multiple" | "special";
        marginPreferences: "none" | "low" | "mid" | "high";
        deletedPreferences: boolean;
    }) => {
        const preferencesValue = new PreferencesValue({ 
            uuid,
            idPredPreferences,
            foodPreferences,
            shopPreferences,
            carParkPreferences,
            luggagePreferences,
            marginPreferences,
            deletedPreferences
        });
        const preferences = await this.preferencesRepository.createPreferences(preferencesValue);
        if (!preferences) {
            throw new NotFoundError("CANNOT_CREATE_PREFERENCES");
        }
        return preferences;
    };

    // CASE 2: getPreferencesById(uuid: string): Promise<PreferencesEntity | null>;
    public getPreferencesById = async (uuid: string) => {
        const preferences = await this.preferencesRepository.getPreferencesById(uuid);
        if (!preferences) {
            throw new NotFoundError("CANNOT_GET_PREFERENCES_BY_ID");
        }
        return preferences;
    };

    // CASE 3: getDeltaOfPreferences(uuid: string): Promise<Number | null>;
    public getDeltaOfPreferences = async (uuid: string) => {
        const timePrediction = await this.preferencesRepository.getDeltaOfPreferences(uuid);
        if (!timePrediction) {
            throw new NotFoundError("CANNOT_GET_DELTA_PREFERENCES");
        }
        return timePrediction;
    };

    // CASE 4: getNumPreferences(): Promise<String | null>;
    public getNumPreferences = async () => {
        const numPreferences = await this.preferencesRepository.getNumPreferences();
        return numPreferences;
    };

    // CASE 5: updatePreferencesById(uuid: string, data: PreferencesEntity): Promise<PreferencesEntity | null>;
    public updatePreferencesById = async (
        uuid: string,
        {
            idPredPreferences,
            foodPreferences,
            shopPreferences,
            carParkPreferences,
            luggagePreferences,
            marginPreferences,
            deletedPreferences
        }: {
            uuid: string;
            idPredPreferences: string; // idPrediction
            foodPreferences: "none" | "lightmeal" | "fullmeal";
            shopPreferences: "none" | "look" | "search";
            carParkPreferences: "none" | "own" | "rentacar";
            luggagePreferences: "none" | "one" | "multiple" | "special";
            marginPreferences: "none" | "low" | "mid" | "high";
            deletedPreferences: boolean;
        }
      ) => {
        const preferencesValue: PreferencesValue = new PreferencesValue({
            uuid,
            idPredPreferences,
            foodPreferences,
            shopPreferences,
            carParkPreferences,
            luggagePreferences,
            marginPreferences,
            deletedPreferences
        });
        const preferences = await this.preferencesRepository.updatePreferencesById(uuid, preferencesValue);
        if (!preferences) {
            throw new NotFoundError("PREFERENCES_TO_UPDATE_NOT_FOUND");
        }
        return preferences;
    };

    // CASE 6: deletePreferences(uuid: string): Promise<PreferencesEntity | null>;
    public deletePreferences = async (uuid: string) => {
        const prediction = await this.preferencesRepository.deletePreferences(uuid);
        return prediction;
    };

}
