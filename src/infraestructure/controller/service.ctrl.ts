import { uploadUser } from "./multer/userMulter.ctrl";
import { ServiceUseCase } from "../../application/serviceUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { ServiceEntity } from "../../domain/service/service.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { ServiceValue } from "../../domain/service/service.value";
import { isImageFile } from "../utils/isImage.handle";

export class ServiceController {
    emailService: EmailService;

    constructor(private serviceUseCase: ServiceUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createServiceCtrl = this.createServiceCtrl.bind(this);
        this.getServiceByIdCtrl = this.getServiceByIdCtrl.bind(this);
        this.getServiceByLocationCtrl = this.getServiceByLocationCtrl.bind(this);
        this.listServicesCtrl = this.listServicesCtrl.bind(this);
        this.listServicesByTypeCtrl = this.listServicesByTypeCtrl.bind(this);
        this.listOpenedServicesCtrl = this.listOpenedServicesCtrl.bind(this);
        this.updateServiceCtrl = this.updateServiceCtrl.bind(this);
        this.deleteServiceCtrl = this.deleteServiceCtrl.bind(this);
    }

    // CASE 1: createService(data: ServiceEntity): Promise<ServiceEntity | null | string>;
    public async createServiceCtrl(req: Request, res: Response) {
        const {
            uuid,
            nameService,
            idLocationService,
            descriptionService,
            typeService,
            scheduleService,
            deletedService
        } = req.body;
        try {
            const newService = new ServiceValue({
                uuid: uuid,
                nameService: nameService,
                idLocationService: idLocationService,
                descriptionService: descriptionService,
                typeService: typeService,
                scheduleService: scheduleService,
                deletedService: deletedService
            });
            const response = await this.serviceUseCase.createService(newService);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_SERVICE");
        }
    }

    // CASE 2: getServiceById(uuid: string): Promise<ServiceEntity | null>;
    public async getServiceByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.serviceUseCase.getServiceById(`${uuid}`);
        res.send(response);
    }

    // CASE 3: getServiceByLocation(location: string): Promise<ServiceEntity | null>;
    public async getServiceByLocationCtrl({ params }: Request, res: Response) {
        const { location = "" } = params;
        const response = await this.serviceUseCase.getServiceByLocation(`${location}`);
        res.send(response);
    }

    // CASE 4: listServices(): Promise<ServiceEntity[] | null>;
    public async listServicesCtrl(req: Request, res: Response) {
        const response = await this.serviceUseCase.listServices();
        res.send(response);
    }

    // CASE 5: listServicesByType(type: string): Promise<ServiceEntity[] | null>;
    public async listServicesByTypeCtrl({ params }: Request, res: Response) {
        const { type = "" } = params;
        const response = await this.serviceUseCase.listServicesByType(type);
        res.send(response);
    }

    // CASE 6: listOpenedServices(time: Date): Promise<ServiceEntity[] | null>;
    public async listOpenedServicesCtrl({ params }: Request, res: Response) {
        const { time = "" } = params;
        const dateObject = new Date(time);
        const response = await this.serviceUseCase.listOpenedServices(dateObject);
        res.send(response);
    }

    // CASE 7: updateService(uuid: string, data: ServiceEntity): Promise<ServiceEntity | null>;
    public async updateServiceCtrl(req: Request, res: Response) {
        const {
            uuid,
            nameService,
            idLocationService,
            descriptionService,
            typeService,
            scheduleService,
            deletedService
        } = req.body;
        try {
            const service = new ServiceValue({
                uuid: uuid,
                nameService: nameService,
                idLocationService: idLocationService,
                descriptionService: descriptionService,
                typeService: typeService,
                scheduleService: scheduleService,
                deletedService: deletedService
            });
            const response = await this.serviceUseCase.updateService(uuid, service);
            res.send(response);
        } catch (error) {
          console.log("CANNOT_UPDATE_SERVICE");
        }
    }

    // CASE 8: deleteService(uuid: string): Promise<ServiceEntity | null>;
    public async deleteServiceCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.serviceUseCase.deleteService(`${uuid}`);
        res.send(response);
    }

}

