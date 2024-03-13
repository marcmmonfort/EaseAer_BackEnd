import { Router } from "express";
import { NewsUseCase } from "../../application/newsUseCase";
import { NewsController } from "../controller/news.ctrl";
import { MongoNewsRepository } from "../repository/mongoNews.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeNews = Router();

const newsRepo = new MongoNewsRepository();
const newsUseCase = new NewsUseCase(newsRepo);
const newsCtrl = new NewsController(newsUseCase);

// CASE 1: createNews(data: NewsEntity): Promise<NewsEntity | null | string>;
routeNews.post("/news/create", newsCtrl.createNewsCtrl);

// CASE 2: getNewsById(uuid: string): Promise<NewsEntity | null>;
routeNews.get("/news/getbyid/:uuid", checkJwt, newsCtrl.getNewsByIdCtrl);

// CASE 3: getNumNews(): Promise<string | null>;
routeNews.get("/news/all/count/docs", checkJwt, newsCtrl.getNumNewsCtrl);

// CASE 4: listNews(): Promise<NewsEntity[] | null>;
routeNews.get("/news/listall", checkJwt, newsCtrl.listNewsCtrl);

// CASE 5: listNewsPag(numPage: string): Promise<NewsEntity[] | null>;
routeNews.get("/news/listpag/:numPage", checkJwt, newsCtrl.listNewsPagCtrl);

// CASE 6: updateNews(uuid: string, data: NewsEntity): Promise<NewsEntity | null>;
routeNews.put("/news/update/:uuid", checkJwt, newsCtrl.updateNewsCtrl);

// CASE 7: deleteNews(uuid: string): Promise<NewsEntity | null>;
routeNews.delete("/news/delete/:uuid", checkJwt, newsCtrl.deleteNewsCtrl);

export default routeNews;
