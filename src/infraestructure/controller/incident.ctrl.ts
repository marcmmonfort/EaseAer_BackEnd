import { uploadUser } from "./multer/userMulter.ctrl";
import { IncidentUseCase } from "../../application/incidentUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { IncidentEntity } from "../../domain/incident/incident.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { IncidentValue } from "../../domain/incident/incident.value";
import { isImageFile } from "../utils/isImage.handle";

export class IncidentController {
    emailService: EmailService;
    constructor(private incidentUseCase: IncidentUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createIncidentCtrl = this.createIncidentCtrl.bind(this);
        this.getIncidentByIdCtrl = this.getIncidentByIdCtrl.bind(this);
        this.listIncidentsCtrl = this.listIncidentsCtrl.bind(this);
        this.listIncidentsPagCtrl = this.listIncidentsPagCtrl.bind(this);
        this.getNumIncidentsCtrl = this.getNumIncidentsCtrl.bind(this);
        this.getNumIncidentsStatusCtrl = this.getNumIncidentsStatusCtrl.bind(this);
        this.updateIncidentCtrl = this.updateIncidentCtrl.bind(this);
        this.deleteIncidentCtrl = this.deleteIncidentCtrl.bind(this);
    }

    // CASE 1: createIncident(data: IncidentEntity): Promise<IncidentEntity | null | string>;
    public async createIncidentCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserIncident,
            descriptionIncident,
            collectivesIncident,
            statusIncident,
            deletedIncident,
        } = req.body;
        try {
            const incident = new IncidentValue({
                uuid: uuid,
                idUserIncident: idUserIncident,
                descriptionIncident: descriptionIncident,
                collectivesIncident: collectivesIncident,
                statusIncident: statusIncident,
                deletedIncident: deletedIncident,
            });
            const response = await this.incidentUseCase.createIncident(incident);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_INCIDENT");
        }
    }

    // CASE 2: getIncidentById(uuid: string): Promise<IncidentEntity | null>;
    public async getIncidentByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.incidentUseCase.getIncidentById(`${uuid}`);
        res.send(response);
    }

    // CASE 3: listIncidents(): Promise<IncidentEntity[] | null>;
    public async listIncidentsCtrl(req: Request, res: Response) {
        const response = await this.incidentUseCase.listIncidents();
        res.send(response);
    }

    // CASE 4: listIncidentsPag(numPage: string): Promise<IncidentEntity[] | null>;
    public async listIncidentsPagCtrl({ params }: Request, res: Response) {
        const { numPage = "" } = params;
        const response = await this.incidentUseCase.listIncidentsPag(`${numPage}`);
        res.send(response);
    }

    // CASE 5: getNumIncidents(): Promise<string | null>;
    public async getNumIncidentsCtrl(req: Request, res: Response) {
        const response = await this.incidentUseCase.getNumIncidents();
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }

    // CASE 6: getNumIncidentsStatus(status: string): Promise<string | null>;
    public async getNumIncidentsStatusCtrl({ params }: Request, res: Response) {
        const { status = "" } = params;
        const response = await this.incidentUseCase.getNumIncidentsStatus(status);
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }

    // CASE 7: updateIncident(uuid: string, data: IncidentEntity): Promise<IncidentEntity | null>;
    public async updateIncidentCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserIncident,
            descriptionIncident,
            collectivesIncident,
            statusIncident,
            deletedIncident
        } = req.body;
        try {
            const incident = new IncidentValue({
                uuid: uuid,
                idUserIncident,
                descriptionIncident,
                collectivesIncident,
                statusIncident,
                deletedIncident
            });
            const response = await this.incidentUseCase.updateIncident(uuid, incident);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_UPDATE_INCIDENT");
        }
    }

    // CASE 8: deleteIncident(uuid: string): Promise<IncidentEntity | null>;
    public async deleteIncidentCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.incidentUseCase.deleteIncident(`${uuid}`);
        res.send(response);
    }

}
