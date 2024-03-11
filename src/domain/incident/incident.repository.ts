import { IncidentEntity } from "./incident.entity";

export interface IncidentRepository {

    createIncident(data: IncidentEntity): Promise<IncidentEntity | null | string>;

    getIncidentById(uuid: string): Promise<IncidentEntity | null>;

    listIncidents(): Promise<IncidentEntity[] | null>;

    listIncidentsPag(numPage: string): Promise<IncidentEntity[] | null>;

    getNumIncidents(): Promise<string | null>;

    getNumIncidentsStatus(status: string): Promise<string | null>;

    updateIncident(uuid: string, data: IncidentEntity): Promise<IncidentEntity | null>;

    deleteIncident(uuid: string): Promise<IncidentEntity | null>;

    // CASE 1: createIncident(data: IncidentEntity): Promise<IncidentEntity | null | string>;

    // CASE 2: getIncidentById(uuid: string): Promise<IncidentEntity | null>;

    // CASE 3: listIncidents(): Promise<IncidentEntity[] | null>;

    // CASE 4: listIncidentsPag(numPage: string): Promise<IncidentEntity[] | null>;

    // CASE 5: getNumIncidents(): Promise<string | null>;

    // CASE 6: getNumIncidentsStatus(status: string): Promise<string | null>;

    // CASE 7: updateIncident(uuid: string, data: IncidentEntity): Promise<IncidentEntity | null>;

    // CASE 8: deleteIncident(uuid: string): Promise<IncidentEntity | null>;

}
