import { IncidentRepository } from "../domain/incident/incident.repository";
import { IncidentValue } from "../domain/incident/incident.value";
import { NotFoundError } from "./notFoundError";

export class IncidentUseCase {
    constructor(private readonly incidentRepository: IncidentRepository) {}

    // CASE 1: createIncident(data: IncidentEntity): Promise<IncidentEntity | null | string>;
    public createIncident = async ({
        uuid,
        idUserIncident,
        descriptionIncident,
        collectivesIncident,
        statusIncident,
        deletedIncident
    }: {
        uuid: string;
        idUserIncident: string;
        descriptionIncident: string;
        collectivesIncident: "security" | "medical" | "fire" | "cleaning" | "assistance" | "tech" | "other";
        statusIncident: "new" | "received" | "managed" | "solved" | "unsolved";
        deletedIncident: boolean;
    }) => {
        const incidentValue = new IncidentValue({
            uuid,
            idUserIncident,
            descriptionIncident,
            collectivesIncident,
            statusIncident,
            deletedIncident,
        });
        const user = await this.incidentRepository.createIncident(incidentValue);
        if (!user) {
            throw new NotFoundError("CANNOT_CREATE_INCIDENT");
        }
        return user;
    };

    // CASE 2: getIncidentById(uuid: string): Promise<IncidentEntity | null>;
    public getIncidentById = async (uuid: string) => {
        const user = await this.incidentRepository.getIncidentById(uuid);
        if (!user) {
            throw new NotFoundError("CANNOT_GET_INCIDENT_BY_ID");
        }
        return user;
    };

    // CASE 3: listIncidents(): Promise<IncidentEntity[] | null>;
    public listIncidents = async () => {
        const listIncidents = await this.incidentRepository.listIncidents();
        if (!listIncidents) {
            throw new NotFoundError("CANNOT_LIST_INCIDENTS");
        }
        return listIncidents;
    };

    // CASE 4: listIncidentsPag(numPage: string): Promise<IncidentEntity[] | null>;
    public listIncidentsPag = async (numPage: string) => {
        const listIncidents = await this.incidentRepository.listIncidentsPag(numPage);
        if (!listIncidents) {
            throw new NotFoundError("CANNOT_LIST_INCIDENTS_PAG");
        }
        return listIncidents;
    };

    // CASE 5: getNumIncidents(): Promise<string | null>;
    public getNumIncidents = async () => {
        const numIncidents = await this.incidentRepository.getNumIncidents();
        return numIncidents;
    };

    // CASE 6: getNumIncidentsStatus(status: string): Promise<string | null>;
    public getNumIncidentsStatus = async (status: string) => {
        const numIncidents = await this.incidentRepository.getNumIncidentsStatus(status);
        return numIncidents;
    };

    // CASE 7: updateIncident(uuid: string, data: IncidentEntity): Promise<IncidentEntity | null>;
    public updateIncident = async (
        uuid: string,
        {
            idUserIncident,
            descriptionIncident,
            collectivesIncident,
            statusIncident,
            deletedIncident
        }: {
            uuid: string;
            idUserIncident: string;
            descriptionIncident: string;
            collectivesIncident: "security" | "medical" | "fire" | "cleaning" | "assistance" | "tech" | "other";
            statusIncident: "new" | "received" | "managed" | "solved" | "unsolved";
            deletedIncident: boolean;
        }
    ) => {
        const incidentValue: IncidentValue = new IncidentValue({
            uuid,
            idUserIncident,
            descriptionIncident,
            collectivesIncident,
            statusIncident,
            deletedIncident
        });
        const incident = await this.incidentRepository.updateIncident(uuid, incidentValue);
        if (!incident) {
            throw new NotFoundError("CANNOT_UPDATE_USER");
        }
        return incident;
    };

    // CASE 8: deleteIncident(uuid: string): Promise<IncidentEntity | null>;
    public deleteIncident = async (uuid: string) => {
        const incident = await this.incidentRepository.deleteIncident(uuid);
        return incident;
    };
  
}