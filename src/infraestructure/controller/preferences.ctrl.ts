import { uploadUser } from "./multer/userMulter.ctrl";
import { PreferencesUseCase } from "../../application/preferencesUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { PreferencesEntity } from "../../domain/preferences/preferences.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { PreferencesValue } from "../../domain/preferences/preferences.value";
import { isImageFile } from "../utils/isImage.handle";

export class PreferencesController {
    emailService: EmailService;
    constructor(private preferencesUseCase: PreferencesUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createPreferencesCtrl = this.createPreferencesCtrl.bind(this);
        this.getPreferencesByIdCtrl = this.getPreferencesByIdCtrl.bind(this);
        this.getDeltaOfPreferencesCtrl = this.getDeltaOfPreferencesCtrl.bind(this);
        this.getNumPreferencesCtrl = this.getNumPreferencesCtrl.bind(this);
        this.updatePreferencesByIdCtrl = this.updatePreferencesByIdCtrl.bind(this);
        this.deletePreferencesCtrl = this.deletePreferencesCtrl.bind(this);
    }

    // CASE 1: createPreferences(data: PreferencesEntity): Promise<PreferencesEntity | null | string>;
    public async createPreferencesCtrl(req: Request, res: Response) {
        const {
            uuid,
            idPredPreferences,
            foodPreferences,
            shopPreferences,
            carParkPreferences,
            luggagePreferences,
            marginPreferences,
            deletedPreferences
        } = req.body;
        try {
            const preferences = new PreferencesValue({
                uuid: uuid,
                idPredPreferences: idPredPreferences,
                foodPreferences: foodPreferences,
                shopPreferences: shopPreferences,
                carParkPreferences: carParkPreferences,
                luggagePreferences: luggagePreferences,
                marginPreferences: marginPreferences,
                deletedPreferences: deletedPreferences
            });
            const response = await this.preferencesUseCase.createPreferences(preferences);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_PREFERENCES");
        }
    }

    // CASE 2: getPreferencesById(uuid: string): Promise<PreferencesEntity | null>;
    public async getPreferencesByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.preferencesUseCase.getPreferencesById(`${uuid}`);
        res.send(response);
    }

    // CASE 3: getDeltaOfPreferences(uuid: string): Promise<Number | null>;
    public async getDeltaOfPreferencesCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.preferencesUseCase.getDeltaOfPreferences(`${uuid}`);
        res.send(response);
    }

    // CASE 4: getNumPreferences(): Promise<String | null>;
    public async getNumPreferencesCtrl(req: Request, res: Response) {
        const response = await this.preferencesUseCase.getNumPreferences();
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }

    // CASE 5: updatePreferencesById(uuid: string, data: PreferencesEntity): Promise<PreferencesEntity | null>;
    public async updatePreferencesByIdCtrl(req: Request, res: Response) {
        const {
            uuid,
            idPredPreferences,
            foodPreferences,
            shopPreferences,
            carParkPreferences,
            luggagePreferences,
            marginPreferences,
            deletedPreferences
        } = req.body;
        try {
            const preferences = new PreferencesValue({
                uuid: uuid,
                idPredPreferences: idPredPreferences,
                foodPreferences: foodPreferences,
                shopPreferences: shopPreferences,
                carParkPreferences: carParkPreferences,
                luggagePreferences: luggagePreferences,
                marginPreferences: marginPreferences,
                deletedPreferences: deletedPreferences
            });
            const response = await this.preferencesUseCase.updatePreferencesById(uuid, preferences);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_UPDATE_PREFERENCES");
        }
    }

    // CASE 6: deletePreferences(uuid: string): Promise<PreferencesEntity | null>;
    public async deletePreferencesCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.preferencesUseCase.deletePreferences(`${uuid}`);
        res.send(response);
    }

}
