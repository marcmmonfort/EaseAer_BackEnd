import { LuggageEntity } from "./luggage.entity";

export interface LuggageRepository {

    createLuggage(data: LuggageEntity): Promise<LuggageEntity | null | string>;

    getLuggageById(uuid: string): Promise<LuggageEntity | null>;

    getLuggageByFlight(flight: string): Promise<LuggageEntity[] | null>;

    getLuggageByUser(user: string): Promise<LuggageEntity[] | null>;

    getNumLuggage(): Promise<String | null>;

    updateLuggageById(uuid: string, data: LuggageEntity): Promise<LuggageEntity | null>;

    deleteLuggage(uuid: string): Promise<LuggageEntity | null>;

    // CASE 1: createLuggage(data: LuggageEntity): Promise<LuggageEntity | null | string>;

    // CASE 2: getLuggageById(uuid: string): Promise<LuggageEntity | null>;

    // CASE 3: getLuggageByFlight(flight: string): Promise<LuggageEntity[] | null>;

    // CASE 4: getLuggageByUser(user: string): Promise<LuggageEntity[] | null>;

    // CASE 5: getNumLuggage(): Promise<String | null>;

    // CASE 6: updateLuggageById(uuid: string, data: LuggageEntity): Promise<LuggageEntity | null>;

    // CASE 7: deleteLuggage(uuid: string): Promise<LuggageEntity | null>;

}
