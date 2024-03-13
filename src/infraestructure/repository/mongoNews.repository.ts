import { Types } from "mongoose";
import { NewsEntity } from "../../domain/news/news.entity";
import { NewsRepository } from "../../domain/news/news.repository";
import NewsModel from "../model/news.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoNewsRepository implements NewsRepository {

    // CASE 1: createNews(data: NewsEntity): Promise<NewsEntity | null | string>;
    async createNews(data: NewsEntity): Promise<any> {
        const {
            uuid,
            idUserAuthorNews,
            titleNews,
            subtitleNews,
            descriptionNews,
            dateNews,
            deletedNews
        } = data;
        const checkIs = await NewsModel.findOne({ uuid });
        if (checkIs) return "ALREADY_NEWS";
        const news = await NewsModel.create(data);
        const updatedNews = {
            uuid: news._id,
            idUserAuthorNews,
            titleNews,
            subtitleNews,
            descriptionNews,
            dateNews,
            deletedNews
        };
        const response = await NewsModel.findOneAndUpdate(
            { _id: updatedNews.uuid },
            updatedNews,
            { new: true }
        );
        return response;
    }

    // CASE 2: getNewsById(uuid: string): Promise<NewsEntity | null>;
    async getNewsById(uuid: string): Promise<any> {
        const response = await NewsModel.findOne({ _id: uuid });
        return response;
    }

    // CASE 3: getNumNews(): Promise<string | null>;
    async getNumNews(): Promise<any> {
        const response = (await NewsModel.countDocuments({})).toString();
        return response;
    }

    // CASE 4: listNews(): Promise<NewsEntity[] | null>;
    async listNews(): Promise<any> {
        const response = await NewsModel.find();
        return response;
    }

    // CASE 5: listNewsPag(numPage: string): Promise<NewsEntity[] | null>;
    async listNewsPag(numPage: string): Promise<any> {
        const items = 2;
        const hop = (parseInt(numPage, 10) - 1) * items;
        const response = await NewsModel.find({}).skip(hop).limit(items).exec();
        return response;
    }

    // CASE 6: updateNews(uuid: string, data: NewsEntity): Promise<NewsEntity | null>;
    async updateNews(uuid: string, data: NewsEntity): Promise<any> {
        const response = await NewsModel.findOneAndUpdate({ _id: uuid }, data, { new: true });
        return response;
    }

    // CASE 7: deleteNews(uuid: string): Promise<NewsEntity | null>;
    async deleteNews(uuid: string): Promise<any> {
        const response = await NewsModel.findOneAndRemove({ _id: uuid });
        return response;
    }

}
