import { uploadUser } from "./multer/userMulter.ctrl";
import { ShopUseCase } from "../../application/shopUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { ShopEntity } from "../../domain/shop/shop.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { ShopValue } from "../../domain/shop/shop.value";
import { isImageFile } from "../utils/isImage.handle";

export class ShopController {
    emailService: EmailService;

    constructor(private shopUseCase: ShopUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createShopCtrl = this.createShopCtrl.bind(this);
        this.getShopByIdCtrl = this.getShopByIdCtrl.bind(this);
        this.getShopByLocationCtrl = this.getShopByLocationCtrl.bind(this);
        this.listShopCtrl = this.listShopCtrl.bind(this);
        this.listOpenedShopsCtrl = this.listOpenedShopsCtrl.bind(this);
        this.updateShopCtrl = this.updateShopCtrl.bind(this);
        this.deleteShopCtrl = this.deleteShopCtrl.bind(this);
    }

    // CASE 1: createShop(data: ShopEntity): Promise<ShopEntity | null | string>;
    public async createShopCtrl(req: Request, res: Response) {
        const {
            uuid,
            idCompanyShop,
            idLocationShop,
            descriptionShop,
            webShop,
            scheduleShop,
            deletedShop
        } = req.body;
    
        try {
            const newShop = new ShopValue({
                uuid: uuid,
                idCompanyShop: idCompanyShop,
                idLocationShop: idLocationShop,
                descriptionShop: descriptionShop,
                webShop: webShop,
                scheduleShop: scheduleShop,
                deletedShop: deletedShop
            });
            const response = await this.shopUseCase.createShop(newShop);
            res.send(response);
        } catch (error) {
          console.log("CANNOT_CREATE_SHOP");
        }
    }

    // CASE 2: getShopById(uuid: string): Promise<ShopEntity | null>;
    public async getShopByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.shopUseCase.getShopById(`${uuid}`);
        res.send(response);
    }

    // CASE 3: getShopByLocation(location: string): Promise<ShopEntity | null>;
    public async getShopByLocationCtrl({ params }: Request, res: Response) {
        const { location = "" } = params;
        const response = await this.shopUseCase.getShopByLocation(`${location}`);
        res.send(response);
    }

    // CASE 4: listShop(): Promise<ShopEntity[] | null>;
    public async listShopCtrl(req: Request, res: Response) {
        const response = await this.shopUseCase.listShop();
        res.send(response);
    }

    // CASE 5: listOpenedShops(time: Date): Promise<ShopEntity[] | null>;
    public async listOpenedShopsCtrl({ params }: Request, res: Response) {
        const { time = "" } = params;
        const dateObject = new Date(time);
        const response = await this.shopUseCase.listOpenedShops(dateObject);
        res.send(response);
    }

    // CASE 6: updateShop(uuid: string, data: ShopEntity): Promise<ShopEntity | null>;
    public async updateShopCtrl(req: Request, res: Response) {
        const {
            uuid,
            idCompanyShop,
            idLocationShop,
            descriptionShop,
            webShop,
            scheduleShop,
            deletedShop
        } = req.body;
        try {
            const shop = new ShopValue({
                uuid: uuid,
                idCompanyShop: idCompanyShop,
                idLocationShop: idLocationShop,
                descriptionShop: descriptionShop,
                webShop: webShop,
                scheduleShop: scheduleShop,
                deletedShop: deletedShop
            });
            const response = await this.shopUseCase.updateShop(uuid, shop);
            res.send(response);
        } catch (error) {
          console.log("CANNOT_UPDATE_SHOP");
        }
    }

    // CASE 7: deleteShop(uuid: string): Promise<ShopEntity | null>;
    public async deleteShopCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.shopUseCase.deleteShop(`${uuid}`);
        res.send(response);
    }
  
}

