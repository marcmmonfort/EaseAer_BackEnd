import { Types } from "mongoose";
import { OfferEntity } from "../../domain/offer/offer.entity";
import { OfferRepository } from "../../domain/offer/offer.repository";
import OfferModel from "../model/offer.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoOfferRepository implements OfferRepository {

    // CASE 1: createOffer(data: OfferEntity): Promise<OfferEntity | null | string>;
    async createOffer(data: OfferEntity): Promise<any> {
        const {
            uuid,
            idShopOffer,
            priceOffer,
            idProductOffer,
            dateEndOffer
        } = data;
        const checkIs = await OfferModel.findOne({ uuid });
        if (checkIs) return "ALREADY_USER";
        const offer = await OfferModel.create(data);
        const updateOffer = {
            uuid: offer._id,
            idShopOffer,
            priceOffer,
            idProductOffer,
            dateEndOffer
        };
        const response = await OfferModel.findOneAndUpdate(
            { _id: updateOffer.uuid },
            updateOffer,
            { new: true }
        );
        return response;
    }

    // CASE 2: getOfferById(uuid: string): Promise<OfferEntity | null>;
    async getOfferById(uuid: string): Promise<any> {
        const response = await OfferModel.findOne({ _id: uuid });
        return response;
    }

    // CASE 3: getOffersByProduct(product: string): Promise<OfferEntity[] | null>;
    async getOffersByProduct(product: string): Promise<any> {
        const response = await OfferModel.find({ idProductOffer: product });
        if (!response) {
            return "NO_OFFERS_OF_THIS_PRODUCT";
        }
        return response;
    }

    // CASE 4: getOffersByShop(shop: string): Promise<OfferEntity[] | null>;
    async getOffersByShop(shop: string): Promise<any> {
        const response = await OfferModel.find({ idShopOffer: shop });
        if (!response) {
            return "NO_OFFERS_IN_THIS_SHOP";
        }
        return response;
    }

    // CASE 5: listOffer(): Promise<OfferEntity[] | null>;
    async listOffer(): Promise<any> {
        const response = await OfferModel.find();
        return response;
    }

    // CASE 6: updateOffer(uuid: string, data: OfferEntity): Promise<OfferEntity | null>;
    async updateOffer(uuid: string, data: OfferEntity): Promise<any> {
        const response = await OfferModel.findOneAndUpdate({ _id: uuid }, data, {new: true});
        return response;
    }

    // CASE 7: deleteOffer(uuid: string): Promise<OfferEntity | null>;
    async deleteOffer(uuid: string): Promise<any> {
        const response = await OfferModel.findOneAndRemove({ _id: uuid });
        return response;
    }

}
