import { LuggageRepository } from "../domain/luggage/luggage.repository";
import { LuggageValue } from "../domain/luggage/luggage.value";
import { NotFoundError } from "./notFoundError";

export class LuggageUseCase {
    constructor(private readonly luggageRepository: LuggageRepository) {}

    // CASE 1: createLuggage(data: LuggageEntity): Promise<LuggageEntity | null | string>;
    public createLuggage = async ({ 
        uuid,
        idUserLuggage,
        idFlightLuggage,
        infoLuggage,
        statusLuggage,
        deletedLuggage
        }: {
            uuid: string;
            idUserLuggage: string;
            idFlightLuggage: string;
            infoLuggage: string;
            statusLuggage: "waiting" | "admitted" | "security" | "presorting" | "finalsorting" | "handling" | "plane";
            deletedLuggage: boolean;
        }) => {
        const luggageValue = new LuggageValue({ 
            uuid,
            idUserLuggage,
            idFlightLuggage,
            infoLuggage,
            statusLuggage,
            deletedLuggage
        });
        const luggage = await this.luggageRepository.createLuggage(luggageValue);
        if (!luggage) {
            throw new NotFoundError("CANNOT_CREATE_LUGGAGE");
        }
        return luggage;
    };

    // CASE 2: getLuggageById(uuid: string): Promise<LuggageEntity | null>;
    public getLuggageById = async (uuid: string) => {
        const luggage = await this.luggageRepository.getLuggageById(uuid);
        if (!luggage) {
            throw new NotFoundError("CANNOT_GET_LUGGAGE_BY_ID");
        }
        return luggage;
    };

    // CASE 3: getLuggageByFlight(flight: string): Promise<LuggageEntity[] | null>;
    public getLuggageByFlight = async (flight: string) => {
        const luggage = await this.luggageRepository.getLuggageByFlight(flight);
        if (!luggage) {
            throw new NotFoundError("CANNOT_GET_LUGGAGE_OF_FLIGHT");
        }
        return luggage;
    };

    // CASE 4: getLuggageByUser(user: string): Promise<LuggageEntity[] | null>;
    public getLuggageByUser = async (user: string) => {
        const luggage = await this.luggageRepository.getLuggageByUser(user);
        if (!luggage) {
            throw new NotFoundError("CANNOT_GET_LUGGAGE_OF_USER");
        }
        return luggage;
    };

    // CASE 5: getNumLuggage(): Promise<String | null>;
    public getNumLuggage = async () => {
        const numLuggage = await this.luggageRepository.getNumLuggage();
        return numLuggage;
    };

    // CASE 6: updateLuggageById(uuid: string, data: LuggageEntity): Promise<LuggageEntity | null>;
    public updateLuggageById = async (
        uuid: string,
        {
            idUserLuggage,
            idFlightLuggage,
            infoLuggage,
            statusLuggage,
            deletedLuggage
        }: {
            idUserLuggage: string;
            idFlightLuggage: string;
            infoLuggage: string;
            statusLuggage: "waiting" | "admitted" | "security" | "presorting" | "finalsorting" | "handling" | "plane";
            deletedLuggage: boolean;
        }
      ) => {
        const luggageValue: LuggageValue = new LuggageValue({
            uuid,
            idUserLuggage,
            idFlightLuggage,
            infoLuggage,
            statusLuggage,
            deletedLuggage
        });
        const luggage = await this.luggageRepository.updateLuggageById(uuid, luggageValue);
        if (!luggage) {
            throw new NotFoundError("LUGGAGE_TO_UPDATE_NOT_FOUND");
        }
        return luggage;
    };

    // CASE 7: deleteLuggage(uuid: string): Promise<LuggageEntity | null>;
    public deleteLuggage = async (uuid: string) => {
        const luggage = await this.luggageRepository.deleteLuggage(uuid);
        return luggage;
    };
  
}
