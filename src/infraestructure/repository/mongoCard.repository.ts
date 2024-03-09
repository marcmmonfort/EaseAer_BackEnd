import { Types } from "mongoose";
import { CardEntity } from "../../domain/card/card.entity";
import { CardRepository } from "../../domain/card/card.repository";
import CardModel from "../model/card.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoCardRepository implements CardRepository {

    // CASE 1: createCard(data: CardEntity): Promise<CardEntity | null | string>;
    async createCard(data: CardEntity): Promise<any> {
        const {
            uuid,
            idUserCard,
            numberCard,
            pointsCard,
            levelCard,
            deletedCard
        } = data;
        const checkIs = await CardModel.findOne({ numberCard });
        if (checkIs) return "ALREADY_CARD";
        const user = await CardModel.create(data);
        const updatedData = {
            uuid: user._id,
            idUserCard,
            numberCard,
            pointsCard,
            levelCard,
            deletedCard
        };
        const response = await CardModel.findOneAndUpdate(
            { _id: updatedData.uuid },
            updatedData,
            { new: true }
        );
        return response;
    }
    
    // CASE 2: getCardById(uuid: string): Promise<CardEntity | null>;
    async getCardById(uuid: string): Promise<any> {
        const response = await CardModel.findOne({ _id: uuid });
        return response;
    }
    
    // CASE 3: getCardByUser(user: string): Promise<CardEntity | null>;
    async getCardByUser(user: string): Promise<any> {
        const response = await CardModel.findOne({ idUserCard: user });
        if (!response) {
            return "NOT_FOUND_CARD";
        }
        return response;
    }
    
    // CASE 4: listCards(): Promise<CardEntity[] | null>;
    async listCards(): Promise<any> {
        const response = await CardModel.find();
        return response;
    }
    
    // CASE 5: listCardsPag(numPage: string): Promise<CardEntity[] | null>;
    async listCardsPag(numPage: string): Promise<any> {
        const items = 2;
        const hop = (parseInt(numPage, 10) - 1) * items;
        const response = await CardModel.find({}).skip(hop).limit(items).exec();
        return response;
    }
    
    // CASE 6: updateCard(uuid: string, data: CardEntity): Promise<CardEntity | null>;
    async updateCard(uuid: string, data: CardEntity): Promise<any> {
        const response = await CardModel.findOneAndUpdate({ _id: uuid }, data, { new: true });
        return response;
    }
    
    // CASE 7: deleteCard(uuid: string): Promise<CardEntity | null>;
    async deleteCard(uuid: string): Promise<any> {
        const response = await CardModel.findOneAndRemove({ _id: uuid });
        return response;
    }
    
    // CASE 8: getNumCards(): Promise<string | null>;
    async getNumCards(): Promise<any> {
        const response = (await CardModel.countDocuments({})).toString();
        return response;
    }

}
