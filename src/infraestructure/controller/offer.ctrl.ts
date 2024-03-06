import { uploadUser } from "./multer/userMulter.ctrl";
import { OfferUseCase } from "../../application/offerUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { OfferEntity } from "../../domain/offer/offer.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { isImageFile } from "../utils/isImage.handle";
import { OfferValue } from "../../domain/offer/offer.value";

export class OfferController {
    emailService: EmailService;
    constructor(private offerUseCase: OfferUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createOfferCtrl = this.createOfferCtrl.bind(this);
        this.getOfferByIdCtrl = this.getOfferByIdCtrl.bind(this);
        this.getOffersByProductCtrl = this.getOffersByProductCtrl.bind(this);
        this.getOffersByShopCtrl = this.getOffersByShopCtrl.bind(this);
        this.listOfferCtrl = this.listOfferCtrl.bind(this);
        this.updateOfferCtrl = this.updateOfferCtrl.bind(this);
        this.deleteOfferCtrl = this.deleteOfferCtrl.bind(this);
    }

    // CASE 1: createOffer(data: OfferEntity): Promise<OfferEntity | null | string>;
    public async createOfferCtrl(req: Request, res: Response) {
        const {
            uuid,
            idShopOffer,
            priceOffer,
            idProductOffer,
            dateEndOffer
        } = req.body;
        try {
            const offer = new OfferValue({
                uuid: uuid,
                idShopOffer: idShopOffer,
                priceOffer: priceOffer,
                idProductOffer: idProductOffer,
                dateEndOffer: dateEndOffer
            });
            const response = await this.offerUseCase.createOffer(offer);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_OFFER");
        }
    }

    // CASE 2: getOfferById(uuid: string): Promise<OfferEntity | null>;
    public async getOfferByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.offerUseCase.getOfferById(`${uuid}`);
        res.send(response);
    }

    // CASE 3: getOffersByProduct(product: string): Promise<OfferEntity[] | null>;
    public async getOffersByProductCtrl({ params }: Request, res: Response) {
        const { product = "" } = params;
        const response = await this.offerUseCase.getOffersByProduct(`${product}`);
        res.send(response);
    }

    // CASE 4: getOffersByShop(shop: string): Promise<OfferEntity[] | null>;
    public async getOffersByShopCtrl({ params }: Request, res: Response) {
        const { shop = "" } = params;
        const response = await this.offerUseCase.getOffersByShop(`${shop}`);
        res.send(response);
    }

    // CASE 5: listOffer(): Promise<OfferEntity[] | null>;
    public async listOfferCtrl(req: Request, res: Response) {
        const response = await this.offerUseCase.listOffer();
        res.send(response);
    }

    // CASE 6: updateOffer(uuid: string, data: OfferEntity): Promise<OfferEntity | null>;
    public async updateOfferCtrl(req: Request, res: Response) {
        const {
            uuid,
            idShopOffer,
            priceOffer,
            idProductOffer,
            dateEndOffer
        } = req.body;
        try {
            const offer = new OfferValue({
                uuid: uuid,
                idShopOffer: idShopOffer,
                priceOffer: priceOffer,
                idProductOffer: idProductOffer,
                dateEndOffer: dateEndOffer
            });
            const response = await this.offerUseCase.updateOffer(uuid, offer);
            res.send(response);
        } catch (error) {
        console.log("CANNOT_UPDATE_OFFER");
        }
    }

    // CASE 7: deleteOffer(uuid: string): Promise<OfferEntity | null>;
    public async deleteOfferCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.offerUseCase.deleteOffer(`${uuid}`);
        res.send(response);
    }
}
