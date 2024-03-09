import { uploadUser } from "./multer/userMulter.ctrl";
import { CardUseCase } from "../../application/cardUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { CardEntity } from "../../domain/card/card.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { CardValue } from "../../domain/card/card.value";
import { isImageFile } from "../utils/isImage.handle";

export class CardController {
    emailService: EmailService;
    constructor(private cardUseCase: CardUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createCardCtrl = this.createCardCtrl.bind(this);
        this.getCardByIdCtrl = this.getCardByIdCtrl.bind(this);
        this.getCardByUserCtrl = this.getCardByUserCtrl.bind(this);
        this.listCardsCtrl = this.listCardsCtrl.bind(this);
        this.listCardsPagCtrl = this.listCardsPagCtrl.bind(this);
        this.updateCardCtrl = this.updateCardCtrl.bind(this);
        this.deleteCardCtrl = this.deleteCardCtrl.bind(this);
        this.getNumCardsCtrl = this.getNumCardsCtrl.bind(this);
    }

    // CASE 1: createCard(data: CardEntity): Promise<CardEntity | null | string>;
    public async createCardCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserCard,
            numberCard,
            pointsCard,
            levelCard,
            deletedCard
        } = req.body;
        try {
            const newCard = new CardValue({
                uuid: uuid,
                idUserCard: idUserCard,
                numberCard: numberCard,
                pointsCard: pointsCard,
                levelCard: levelCard,
                deletedCard: deletedCard,
            });
            const response = await this.cardUseCase.createCard(newCard);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_CARD");
        }
    }
    
    // CASE 2: getCardById(uuid: string): Promise<CardEntity | null>;
    public async getCardByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.cardUseCase.getCardById(`${uuid}`);
        res.send(response);
    }
    
    // CASE 3: getCardByUser(user: string): Promise<CardEntity | null>;
    public async getCardByUserCtrl({ params }: Request, res: Response) {
        const { user = "" } = params;
        const response = await this.cardUseCase.getCardByUser(`${user}`);
        res.send(response);
    }
    
    // CASE 4: listCards(): Promise<CardEntity[] | null>;
    public async listCardsCtrl(req: Request, res: Response) {
        const response = await this.cardUseCase.listCards();
        res.send(response);
    }
    
    // CASE 5: listCardsPag(numPage: string): Promise<CardEntity[] | null>;
    public async listCardsPagCtrl({ params }: Request, res: Response) {
        const { numPage = "" } = params;
        const response = await this.cardUseCase.listCardsPag(`${numPage}`);
        res.send(response);
    }
    
    // CASE 6: updateCard(uuid: string, data: CardEntity): Promise<CardEntity | null>;
    public async updateCardCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserCard,
            numberCard,
            pointsCard,
            levelCard,
            deletedCard
        } = req.body;
        try {
            const newCard = new CardValue({
                uuid: uuid,
                idUserCard: idUserCard,
                numberCard: numberCard,
                pointsCard: pointsCard,
                levelCard: levelCard,
                deletedCard: deletedCard,
             });
            const response = await this.cardUseCase.updateCard(uuid, newCard);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_UPDATE_CARD");
        }
    }
    
    // CASE 7: deleteCard(uuid: string): Promise<CardEntity | null>;
    public async deleteCardCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.cardUseCase.deleteCard(`${uuid}`);
        res.send(response);
    }
    
    // CASE 8: getNumCards(): Promise<string | null>;
    public async getNumCardsCtrl(req: Request, res: Response) {
        const response = await this.cardUseCase.getNumCards();
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }

}
