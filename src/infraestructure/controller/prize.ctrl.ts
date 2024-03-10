import { uploadUser } from "./multer/userMulter.ctrl";
import { PrizeUseCase } from "../../application/prizeUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { PrizeEntity } from "../../domain/prize/prize.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { PrizeValue } from "../../domain/prize/prize.value";
import { isImageFile } from "../utils/isImage.handle";

export class PrizeController {
    emailService: EmailService;
    constructor(private prizeUseCase: PrizeUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createPrizeCtrl = this.createPrizeCtrl.bind(this);
        this.getPrizeByIdCtrl = this.getPrizeByIdCtrl.bind(this);
        this.getPrizesAvailableCtrl = this.getPrizesAvailableCtrl.bind(this);
        this.getPrizesByShopCtrl = this.getPrizesByShopCtrl.bind(this);
        this.listPrizesCtrl = this.listPrizesCtrl.bind(this);
        this.getNumPrizesCtrl = this.getNumPrizesCtrl.bind(this);
        this.updatePrizeCtrl = this.updatePrizeCtrl.bind(this);
        this.deletePrizeCtrl = this.deletePrizeCtrl.bind(this);
    }

    // CREATE 1: createPrize(data: PrizeEntity): Promise<PrizeEntity | null | string>;
    public async createPrizeCtrl(req: Request, res: Response) {
        const {
            uuid,
            pointsPrize,
            namePrize,
            descriptionPrize,
            idShopPrize,
            dateEndPrize,
            codePrize,
            deletedPrize
        } = req.body;
        try {
            const prize = new PrizeValue({
                uuid: uuid,
                pointsPrize: pointsPrize,
                namePrize: namePrize,
                descriptionPrize: descriptionPrize,
                idShopPrize: idShopPrize,
                dateEndPrize: dateEndPrize,
                codePrize: codePrize,
                deletedPrize: deletedPrize
            });
            const response = await this.prizeUseCase.createPrize(prize);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_PRIZE");
        }
    }

    // CREATE 2: getPrizeById(uuid: string): Promise<PrizeEntity | null>;
    public async getPrizeByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.prizeUseCase.getPrizeById(`${uuid}`);
        res.send(response);
    }

    // CREATE 3: getPrizesAvailable(points: Number): Promise<PrizeEntity[] | null>;
    public async getPrizesAvailableCtrl({ params }: Request, res: Response) {
        const { points = "" } = params;
        const pointsNumber = parseInt(points, 10);
        const response = await this.prizeUseCase.getPrizesAvailable(pointsNumber);
        res.send(response);
    }

    // CREATE 4: getPrizesByShop(shop: string): Promise<PrizeEntity[] | null>;
    public async getPrizesByShopCtrl({ params }: Request, res: Response) {
        const { shop = "" } = params;
        const response = await this.prizeUseCase.getPrizesByShop(shop);
        res.send(response);
    }

    // CREATE 5: listPrizes(): Promise<PrizeEntity[] | null>;
    public async listPrizesCtrl(req: Request, res: Response) {
        const response = await this.prizeUseCase.listPrizes();
        res.send(response);
    }

    // CREATE 6: getNumPrizes(): Promise<string | null>;
    public async getNumPrizesCtrl(req: Request, res: Response) {
        const response = await this.prizeUseCase.getNumPrizes();
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }

    // CREATE 7: updatePrize(uuid: string, data: PrizeEntity): Promise<PrizeEntity | null>;
    public async updatePrizeCtrl(req: Request, res: Response) {
        const {
            uuid,
            pointsPrize,
            namePrize,
            descriptionPrize,
            idShopPrize,
            dateEndPrize,
            codePrize,
            deletedPrize
        } = req.body;
        try {
            const prize = new PrizeValue({
                uuid: uuid,
                pointsPrize: pointsPrize,
                namePrize: namePrize,
                descriptionPrize: descriptionPrize,
                idShopPrize: idShopPrize,
                dateEndPrize: dateEndPrize,
                codePrize: codePrize,
                deletedPrize: deletedPrize
            });
            const response = await this.prizeUseCase.updatePrize(uuid, prize);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_UPDATE_PRIZE");
        }
    }

    // CREATE 8: deletePrize(uuid: string): Promise<PrizeEntity | null>;
    public async deletePrizeCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.prizeUseCase.deletePrize(`${uuid}`);
        res.send(response);
    }

}
