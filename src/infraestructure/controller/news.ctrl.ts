import { uploadUser } from "./multer/userMulter.ctrl";
import { NewsUseCase } from "../../application/newsUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { NewsEntity } from "../../domain/news/news.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { isImageFile } from "../utils/isImage.handle";
import { NewsValue } from "../../domain/news/news.value";

export class NewsController {
    emailService: EmailService;
    constructor(private newsUseCase: NewsUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createNewsCtrl = this.createNewsCtrl.bind(this);
        this.getNewsByIdCtrl = this.getNewsByIdCtrl.bind(this);
        this.getNumNewsCtrl = this.getNumNewsCtrl.bind(this);
        this.listNewsCtrl = this.listNewsCtrl.bind(this);
        this.listNewsPagCtrl = this.listNewsPagCtrl.bind(this);
        this.updateNewsCtrl = this.updateNewsCtrl.bind(this);
        this.deleteNewsCtrl = this.deleteNewsCtrl.bind(this);
    }

    // CASE 1: createNews(data: NewsEntity): Promise<NewsEntity | null | string>;
    public async createNewsCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserAuthorNews,
            titleNews,
            subtitleNews,
            descriptionNews,
            dateNews,
            deletedNews
        } = req.body;
        try {
            const news = new NewsValue({
                uuid: uuid,
                idUserAuthorNews: idUserAuthorNews,
                titleNews: titleNews,
                subtitleNews: subtitleNews,
                descriptionNews: descriptionNews,
                dateNews: dateNews,
                deletedNews: deletedNews,
            });
            const response = await this.newsUseCase.createNews(news);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_NEWS");
        }
    }

    // CASE 2: getNewsById(uuid: string): Promise<NewsEntity | null>;
    public async getNewsByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.newsUseCase.getNewsById(`${uuid}`);
        res.send(response);
    }

    // CASE 3: getNumNews(): Promise<string | null>;
    public async getNumNewsCtrl(req: Request, res: Response) {
        const response = await this.newsUseCase.getNumNews();
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }

    // CASE 4: listNews(): Promise<NewsEntity[] | null>;
    public async listNewsCtrl(req: Request, res: Response) {
        const response = await this.newsUseCase.listNews();
        res.send(response);
    }

    // CASE 5: listNewsPag(numPage: string): Promise<NewsEntity[] | null>;
    public async listNewsPagCtrl({ params }: Request, res: Response) {
        const { numPage = "" } = params;
        const response = await this.newsUseCase.listNewsPag(`${numPage}`);
        res.send(response);
    }

    // CASE 6: updateNews(uuid: string, data: NewsEntity): Promise<NewsEntity | null>;
    public async updateNewsCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserAuthorNews,
            titleNews,
            subtitleNews,
            descriptionNews,
            dateNews,
            deletedNews
        } = req.body;
        try {
            const news = new NewsValue({
                uuid: uuid,
                idUserAuthorNews: idUserAuthorNews,
                titleNews: titleNews,
                subtitleNews: subtitleNews,
                descriptionNews: descriptionNews,
                dateNews: dateNews,
                deletedNews: deletedNews,
            });
            const response = await this.newsUseCase.updateNews(uuid, news);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_UPDATE_NEWS");
        }
    }

    // CASE 7: deleteNews(uuid: string): Promise<NewsEntity | null>;
    public async deleteNewsCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.newsUseCase.deleteNews(`${uuid}`);
        res.send(response);
    }
    
}
