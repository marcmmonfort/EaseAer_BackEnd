import { uploadUser } from "./multer/userMulter.ctrl";
import { PredictionUseCase } from "../../application/predictionUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { PredictionEntity } from "../../domain/prediction/prediction.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { PredictionValue } from "../../domain/prediction/prediction.value";
import { isImageFile } from "../utils/isImage.handle";

export class PredictionController {
    emailService: EmailService;
    constructor(private predictionUseCase: PredictionUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createPredictionCtrl = this.createPredictionCtrl.bind(this);
        this.getPredictionByIdCtrl = this.getPredictionByIdCtrl.bind(this);
        this.getNumPredictionsCtrl = this.getNumPredictionsCtrl.bind(this);
        this.getTravelTimeOfPredictionCtrl = this.getTravelTimeOfPredictionCtrl.bind(this);
        this.updatePredictionByIdCtrl = this.updatePredictionByIdCtrl.bind(this);
        this.deletePredictionCtrl = this.deletePredictionCtrl.bind(this);
    }

    // CASE 1: createPrediction(data: PredictionEntity): Promise<PredictionEntity | null | string>;
    public async createPredictionCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserPrediction,
            idFlightPredition,
            datePrediction,
            exitHomeTimePrediction,
            transportTimePrediction,
            entranceTimePrediction,
            checkInTimePrediction,
            securityTimePrediction,
            passportTimePrediction,
            gateTimePrediction,
            planeTimePrediction,
            deletedPrediction
        } = req.body;
        try {
            const prediction = new PredictionValue({
                uuid: uuid,
                idUserPrediction: idUserPrediction,
                idFlightPredition: idFlightPredition,
                datePrediction: datePrediction,
                exitHomeTimePrediction: exitHomeTimePrediction,
                transportTimePrediction: transportTimePrediction,
                entranceTimePrediction: entranceTimePrediction,
                checkInTimePrediction: checkInTimePrediction,
                securityTimePrediction: securityTimePrediction,
                passportTimePrediction: passportTimePrediction,
                gateTimePrediction: gateTimePrediction,
                planeTimePrediction: planeTimePrediction,
                deletedPrediction: deletedPrediction
            });
            const response = await this.predictionUseCase.createPrediction(prediction);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_PREDICTION");
        }
    }

    // CASE 2: getPredictionById(uuid: string): Promise<PredictionEntity | null>;
    public async getPredictionByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.predictionUseCase.getPredictionById(`${uuid}`);
        res.send(response);
    }

    // CASE 3: getNumPredictions(): Promise<String | null>;
    public async getNumPredictionsCtrl(req: Request, res: Response) {
        const response = await this.predictionUseCase.getNumPredictions();
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }

    // CASE 4: getTravelTimeOfPrediction(uuid: string): Promise<Number | null>;
    public async getTravelTimeOfPredictionCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.predictionUseCase.getTravelTimeOfPrediction(`${uuid}`);
        res.send(response);
    }

    // CASE 5: updatePredictionById(uuid: string, data: PredictionEntity): Promise<PredictionEntity | null>;
    public async updatePredictionByIdCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserPrediction,
            idFlightPredition,
            datePrediction,
            exitHomeTimePrediction,
            transportTimePrediction,
            entranceTimePrediction,
            checkInTimePrediction,
            securityTimePrediction,
            passportTimePrediction,
            gateTimePrediction,
            planeTimePrediction,
            deletedPrediction
        } = req.body;
        try {
            const prediction = new PredictionValue({
                uuid: uuid,
                idUserPrediction: idUserPrediction,
                idFlightPredition: idFlightPredition,
                datePrediction: datePrediction,
                exitHomeTimePrediction: exitHomeTimePrediction,
                transportTimePrediction: transportTimePrediction,
                entranceTimePrediction: entranceTimePrediction,
                checkInTimePrediction: checkInTimePrediction,
                securityTimePrediction: securityTimePrediction,
                passportTimePrediction: passportTimePrediction,
                gateTimePrediction: gateTimePrediction,
                planeTimePrediction: planeTimePrediction,
                deletedPrediction: deletedPrediction
            });
            const response = await this.predictionUseCase.updatePredictionById(uuid, prediction);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_UPDATE_PREDICTION");
        }
    }

    // CASE 6: deletePrediction(uuid: string): Promise<PredictionEntity | null>;
    public async deletePredictionCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.predictionUseCase.deletePrediction(`${uuid}`);
        res.send(response);
    }

}
