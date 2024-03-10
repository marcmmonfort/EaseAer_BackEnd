import { LuggageEntity  } from "./luggage.entity";

export class LuggageValue implements LuggageEntity {
    uuid: string;
    idUserLuggage: string;
    idFlightLuggage: string;
    infoLuggage: string;
    statusLuggage: string;
    deletedLuggage: boolean;
    constructor({
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
        statusLuggage: string;
        deletedLuggage: boolean;
    }) {
        this.uuid = uuid,
        this.idUserLuggage = idUserLuggage,
        this.idFlightLuggage = idFlightLuggage,
        this.infoLuggage = infoLuggage,
        this.statusLuggage = statusLuggage,
        this.deletedLuggage = deletedLuggage
    }
}