import { Router } from "express";
import { CardUseCase } from "../../application/cardUseCase";
import { CardController } from "../controller/card.ctrl";
import { MongoCardRepository } from "../repository/mongoCard.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeCard = Router();

const cardRepo = new MongoCardRepository();
const cardUseCase = new CardUseCase(cardRepo);
const cardCtrl = new CardController(cardUseCase);

// CASE 1: createCard(data: CardEntity): Promise<CardEntity | null | string>;
routeCard.post("/card/create", cardCtrl.createCardCtrl);
    
// CASE 2: getCardById(uuid: string): Promise<CardEntity | null>;
routeCard.get("/card/getbyid/:uuid", checkJwt, cardCtrl.getCardByIdCtrl);

// CASE 3: getCardByUser(user: string): Promise<CardEntity | null>;
routeCard.get("/card/getbyuser/:user", cardCtrl.getCardByUserCtrl),

// CASE 4: listCards(): Promise<CardEntity[] | null>;
routeCard.get("/card/getall", checkJwt, cardCtrl.listCardsCtrl);

// CASE 5: listCardsPag(numPage: string): Promise<CardEntity[] | null>;
routeCard.get("/card/getallpag", checkJwt, cardCtrl.listCardsPagCtrl);

// CASE 6: updateCard(uuid: string, data: CardEntity): Promise<CardEntity | null>;
routeCard.put("/card/update/:uuid", checkJwt, cardCtrl.updateCardCtrl);

// CASE 7: deleteCard(uuid: string): Promise<CardEntity | null>;
routeCard.delete("/card/delete/:uuid", checkJwt, cardCtrl.deleteCardCtrl);

// CASE 8: getNumCards(): Promise<string | null>;
routeCard.get("/user/all/count/docs", checkJwt, cardCtrl.getNumCardsCtrl);

export default routeCard;
