import { Types } from "mongoose";
import { IncidentEntity } from "../../domain/incident/incident.entity";
import { IncidentRepository } from "../../domain/incident/incident.repository";
import IncidentModel from "../model/incident.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoIncidentRepository implements IncidentRepository {

    // CASE 1: createIncident(data: IncidentEntity): Promise<IncidentEntity | null | string>;
    async createIncident(data: IncidentEntity): Promise<any> {
        const {
            uuid,
            idUserIncident,
            descriptionIncident,
            collectivesIncident,
            statusIncident,
            deletedIncident
        } = data;
        const incident = await IncidentModel.create(data);
        const incidentUpdate = {
            uuid: incident._id,
            idUserIncident,
            descriptionIncident,
            collectivesIncident,
            statusIncident,
            deletedIncident
        };
        const response = await IncidentModel.findOneAndUpdate(
            { _id: incidentUpdate.uuid },
            incidentUpdate,
            { new: true }
        );
        return response;
    }

    // CASE 2: getIncidentById(uuid: string): Promise<IncidentEntity | null>;
    async getIncidentById(uuid: string): Promise<any> {
        const response = await IncidentModel.findOne({ _id: uuid });
        return response;
    }

    // CASE 3: listIncidents(): Promise<IncidentEntity[] | null>;
    async listIncidents(): Promise<any> {
        const response = await IncidentModel.find();
        return response;
    }

    // CASE 4: listIncidentsPag(numPage: string): Promise<IncidentEntity[] | null>;
    async listIncidentsPag(numPage: string): Promise<any> {
        const items = 2;
        const hop = (parseInt(numPage, 10) - 1) * items;
        const response = await IncidentModel.find({}).skip(hop).limit(items).exec();
        return response;
    }

    // CASE 5: getNumIncidents(): Promise<string | null>;
    async getNumIncidents(): Promise<any> {
        const response = (await IncidentModel.countDocuments({})).toString();
        return response;
    }

    // CASE 6: getNumIncidentsStatus(status: string): Promise<string | null>;
    async getNumIncidentsStatus(status: string): Promise<any> {
        const count = await IncidentModel.countDocuments({ statusIncident: status });
        return count.toString();
    }

    // CASE 7: updateIncident(uuid: string, data: IncidentEntity): Promise<IncidentEntity | null>;
    async updateIncident(uuid: string, data: IncidentEntity): Promise<any> {
        const response = await IncidentModel.findOneAndUpdate({ _id: uuid }, data, {
            new: true,
        });
        return response;
    }

    // CASE 8: deleteIncident(uuid: string): Promise<IncidentEntity | null>;
    async deleteIncident(uuid: string): Promise<any> {
        const response = await IncidentModel.findOneAndRemove({ _id: uuid });
        return response;
    }

}


