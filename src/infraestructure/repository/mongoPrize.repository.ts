import { Types } from "mongoose";
import { PrizeEntity } from "../../domain/prize/prize.entity";
import { PrizeRepository } from "../../domain/prize/prize.repository";
import PrizeModel from "../model/prize.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoPrizeRepository implements PrizeRepository {

    // CREATE 1: createPrize(data: PrizeEntity): Promise<PrizeEntity | null | string>;
    async createPrize(data: PrizeEntity): Promise<any> {
        const {
            uuid,
            pointsPrize,
            namePrize,
            descriptionPrize,
            idShopPrize,
            dateEndPrize,
            codePrize,
            deletedPrize
        } = data;
        const checkIs = await PrizeModel.findOne({ uuid });
        if (checkIs) return "ALREADY_PRIZE";
        const prize = await PrizeModel.create(data);
        const updatedPrize = {
            uuid: prize._id,
            pointsPrize,
            namePrize,
            descriptionPrize,
            idShopPrize,
            dateEndPrize,
            codePrize,
            deletedPrize
        };
        const response = await PrizeModel.findOneAndUpdate(
            { _id: updatedPrize.uuid },
            updatedPrize,
            { new: true }
        );
        return response;
    }

    // CREATE 2: getPrizeById(uuid: string): Promise<PrizeEntity | null>;
    async getPrizeById(uuid: string): Promise<any> {
        const response = await PrizeModel.findOne({ _id: uuid });
        return response;
    }

    // CREATE 3: getPrizesAvailable(points: Number): Promise<PrizeEntity[] | null>;
    async getPrizesAvailable(points: Number): Promise<any> {
        const response = await PrizeModel.find({ pointsPrize: { $lt: points } }); // LT: Lower Than
        if (!response) {
            return "PRIZES_NOT_AVAILABLE";
        }
        return response;
    }

    // CREATE 4: getPrizesByShop(shop: string): Promise<PrizeEntity[] | null>;
    async getPrizesByShop(shop: string): Promise<any> {
        const response = await PrizeModel.find({ idShopPrize: shop });
        if (!response) {
            return "NOT_FOUND_PRIZES";
        }
        return response;
    }

    // CREATE 5: listPrizes(): Promise<PrizeEntity[] | null>;
    async listPrizes(): Promise<any> {
        const response = await PrizeModel.find();
        return response;
    }

    // CREATE 6: getNumPrizes(): Promise<string | null>;
    async getNumPrizes(): Promise<any> {
        const response = (await PrizeModel.countDocuments({})).toString();
        return response;
    }

    // CREATE 7: updatePrize(uuid: string, data: PrizeEntity): Promise<PrizeEntity | null>;
    async updatePrize(uuid: string, data: PrizeEntity): Promise<any> {
        const response = await PrizeModel.findOneAndUpdate({ _id: uuid }, data, { new: true });
        return response;
    }

    // CREATE 8: deletePrize(uuid: string): Promise<PrizeEntity | null>;
    async deletePrize(uuid: string): Promise<any> {
        const response = await PrizeModel.findOneAndRemove({ _id: uuid });
        return response;
    }
  
}