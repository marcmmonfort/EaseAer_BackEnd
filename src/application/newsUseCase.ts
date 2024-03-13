import { NewsRepository } from "../domain/news/news.repository";
import { NewsValue } from "../domain/news/news.value";
import { NotFoundError } from "./notFoundError";

export class NewsUseCase {
    constructor(private readonly newsRepository: NewsRepository) {}

    // CASE 1: createNews(data: NewsEntity): Promise<NewsEntity | null | string>;
    public createNews = async ({
        uuid,
        idUserAuthorNews,
        titleNews,
        subtitleNews,
        descriptionNews,
        dateNews,
        deletedNews
    }: {
        uuid: string;
        idUserAuthorNews: string;
        titleNews: string;
        subtitleNews: string;
        descriptionNews: string;
        dateNews: Date;
        deletedNews: boolean;
    }) => {
        const newsValue = new NewsValue({
            uuid,
            idUserAuthorNews,
            titleNews,
            subtitleNews,
            descriptionNews,
            dateNews,
            deletedNews
        });
        const news = await this.newsRepository.createNews(newsValue);
        if (!news) {
            throw new NotFoundError("CANNOT_CREATE_NEWS");
        }
        return news;
    };

    // CASE 2: getNewsById(uuid: string): Promise<NewsEntity | null>;
    public getNewsById = async (uuid: string) => {
        const news = await this.newsRepository.getNewsById(uuid);
        if (!news) {
            throw new NotFoundError("CANNOT_GET_NEWS_BY_ID");
        }
        return news;
    };

    // CASE 3: getNumNews(): Promise<string | null>;
    public getNumNews = async () => {
        const numNews = await this.newsRepository.getNumNews();
        return numNews;
    };

    // CASE 4: listNews(): Promise<NewsEntity[] | null>;
    public listNews = async () => {
        const listNews = await this.newsRepository.listNews();
        if (!listNews) {
            throw new NotFoundError("CANNOT_LIST_NEWS");
        }
        return listNews;
    };

    // CASE 5: listNewsPag(numPage: string): Promise<NewsEntity[] | null>;
    public listNewsPag = async (numPage: string) => {
        const listNews = await this.newsRepository.listNewsPag(numPage);
        return listNews;
    };

    // CASE 6: updateNews(uuid: string, data: NewsEntity): Promise<NewsEntity | null>;
    public updateNews = async (
        uuid: string,
        {
            idUserAuthorNews,
            titleNews,
            subtitleNews,
            descriptionNews,
            dateNews,
            deletedNews
        }: {
            idUserAuthorNews: string;
            titleNews: string;
            subtitleNews: string;
            descriptionNews: string;
            dateNews: Date;
            deletedNews: boolean;
        }
    ) => {
        const newsValue: NewsValue = new NewsValue({
            uuid,
            idUserAuthorNews,
            titleNews,
            subtitleNews,
            descriptionNews,
            dateNews,
            deletedNews
        });
        const news = await this.newsRepository.updateNews(uuid, newsValue);
        if (!news) {
            throw new NotFoundError("NEWS_TO_UPDATE_NOT_FOUND");
        }
        return news;
    };

    // CASE 7: deleteNews(uuid: string): Promise<NewsEntity | null>;
    public deleteNews = async (uuid: string) => {
        const news = await this.newsRepository.deleteNews(uuid);
        return news;
    };

}