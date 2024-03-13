import { NewsEntity } from "./news.entity";

export interface NewsRepository {

    createNews(data: NewsEntity): Promise<NewsEntity | null | string>;

    getNewsById(uuid: string): Promise<NewsEntity | null>;

    getNumNews(): Promise<string | null>;

    listNews(): Promise<NewsEntity[] | null>;

    listNewsPag(numPage: string): Promise<NewsEntity[] | null>;

    updateNews(uuid: string, data: NewsEntity): Promise<NewsEntity | null>;

    deleteNews(uuid: string): Promise<NewsEntity | null>;

    // CASE 1: createNews(data: NewsEntity): Promise<NewsEntity | null | string>;

    // CASE 2: getNewsById(uuid: string): Promise<NewsEntity | null>;

    // CASE 3: getNumNews(): Promise<string | null>;

    // CASE 4: listNews(): Promise<NewsEntity[] | null>;

    // CASE 5: listNewsPag(numPage: string): Promise<NewsEntity[] | null>;

    // CASE 6: updateNews(uuid: string, data: NewsEntity): Promise<NewsEntity | null>;

    // CASE 7: deleteNews(uuid: string): Promise<NewsEntity | null>;

}
