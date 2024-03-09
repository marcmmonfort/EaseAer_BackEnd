import { PreferencesEntity } from "./preferences.entity";

export interface PreferencesRepository {

    createPreferences(data: PreferencesEntity): Promise<PreferencesEntity | null | string>;

    getPreferencesById(uuid: string): Promise<PreferencesEntity | null>;

    getDeltaOfPreferences(uuid: string): Promise<Number | null>;

    getNumPreferences(): Promise<String | null>;

    updatePreferencesById(uuid: string, data: PreferencesEntity): Promise<PreferencesEntity | null>;

    deletePreferences(uuid: string): Promise<PreferencesEntity | null>;

    // CASE 1: createPreferences(data: PreferencesEntity): Promise<PreferencesEntity | null | string>;

    // CASE 2: getPreferencesById(uuid: string): Promise<PreferencesEntity | null>;

    // CASE 3: getDeltaOfPreferences(uuid: string): Promise<Number | null>;

    // CASE 4: getNumPreferences(): Promise<String | null>;

    // CASE 5: updatePreferencesById(uuid: string, data: PreferencesEntity): Promise<PreferencesEntity | null>;

    // CASE 6: deletePreferences(uuid: string): Promise<PreferencesEntity | null>;

}