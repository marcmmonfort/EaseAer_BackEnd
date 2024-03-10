import { uploadUser } from "./multer/userMulter.ctrl";
import { LuggageUseCase } from "../../application/luggageUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { LuggageEntity } from "../../domain/luggage/luggage.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { LuggageValue } from "../../domain/luggage/luggage.value";
import { isImageFile } from "../utils/isImage.handle";

export class LuggageController {
    emailService: EmailService;
    constructor(private luggageUseCase: LuggageUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createLuggageCtrl = this.createLuggageCtrl.bind(this);
        this.getLuggageByIdCtrl = this.getLuggageByIdCtrl.bind(this);
        this.getLuggageByFlightCtrl = this.getLuggageByFlightCtrl.bind(this);
        this.getLuggageByUserCtrl = this.getLuggageByUserCtrl.bind(this);
        this.getNumLuggageCtrl = this.getNumLuggageCtrl.bind(this);
        this.updateLuggageByIdCtrl = this.updateLuggageByIdCtrl.bind(this);
        this.deleteLuggageCtrl = this.deleteLuggageCtrl.bind(this);
    }

    // CASE 1: createLuggage(data: LuggageEntity): Promise<LuggageEntity | null | string>;
    public async createLuggageCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserLuggage,
            idFlightLuggage,
            infoLuggage,
            statusLuggage,
            deletedLuggage
        } = req.body;
        try {
            const luggage = new LuggageValue({
                uuid: uuid,
                idUserLuggage: idUserLuggage,
                idFlightLuggage: idFlightLuggage,
                infoLuggage: infoLuggage,
                statusLuggage: statusLuggage,
                deletedLuggage: deletedLuggage
            });
            const response = await this.luggageUseCase.createLuggage(luggage);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_LUGGAGE");
        }
    }

    // CASE 2: getLuggageById(uuid: string): Promise<LuggageEntity | null>;
    public async getLuggageByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.luggageUseCase.getLuggageById(`${uuid}`);
        res.send(response);
    }

    // CASE 3: getLuggageByFlight(flight: string): Promise<LuggageEntity[] | null>;
    public async getLuggageByFlightCtrl({ params }: Request, res: Response) {
        const { flight = "" } = params;
        const response = await this.luggageUseCase.getLuggageByFlight(`${flight}`);
        res.send(response);
    }

    // CASE 4: getLuggageByUser(user: string): Promise<LuggageEntity[] | null>;
    public async getLuggageByUserCtrl({ params }: Request, res: Response) {
        const { user = "" } = params;
        const response = await this.luggageUseCase.getLuggageByUser(`${user}`);
        res.send(response);
    }

    // CASE 5: getNumLuggage(): Promise<String | null>;
    public async getNumLuggageCtrl(req: Request, res: Response) {
        const response = await this.luggageUseCase.getNumLuggage();
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }

    // CASE 6: updateLuggageById(uuid: string, data: LuggageEntity): Promise<LuggageEntity | null>;
    public async updateLuggageByIdCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserLuggage,
            idFlightLuggage,
            infoLuggage,
            statusLuggage,
            deletedLuggage
        } = req.body;
        try {
            const luggage = new LuggageValue({
                uuid: uuid,
                idUserLuggage: idUserLuggage,
                idFlightLuggage: idFlightLuggage,
                infoLuggage: infoLuggage,
                statusLuggage: statusLuggage,
                deletedLuggage: deletedLuggage
            });
            const response = await this.luggageUseCase.updateLuggageById(uuid, luggage);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_UPDATE_LUGGAGE");
        }
    }

    // CASE 7: deleteLuggage(uuid: string): Promise<LuggageEntity | null>;
    public async deleteLuggageCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.luggageUseCase.deleteLuggage(`${uuid}`);
        res.send(response);
    }

}
