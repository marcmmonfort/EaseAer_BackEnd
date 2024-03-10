import { Router } from "express";
import { PrizeUseCase } from "../../application/prizeUseCase";
import { PrizeController } from "../controller/prize.ctrl";
import { MongoPrizeRepository } from "../repository/mongoPrize.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routePrize = Router();

const prizeRepo = new MongoPrizeRepository();
const prizeUseCase = new PrizeUseCase(prizeRepo);
const prizeCtrl = new PrizeController(prizeUseCase);

// CREATE 1: createPrize(data: PrizeEntity): Promise<PrizeEntity | null | string>;
routePrize.post("/prize/create", prizeCtrl.createPrizeCtrl);

// CREATE 2: getPrizeById(uuid: string): Promise<PrizeEntity | null>;
routePrize.get("/prize/getbyid/:uuid", checkJwt, prizeCtrl.getPrizeByIdCtrl);

// CREATE 3: getPrizesAvailable(points: Number): Promise<PrizeEntity[] | null>;
routePrize.get("/prize/getavailable/:points", checkJwt, prizeCtrl.getPrizesAvailableCtrl);

// CREATE 4: getPrizesByShop(shop: string): Promise<PrizeEntity[] | null>;
routePrize.get("/prize/getbyshop/:shop", checkJwt, prizeCtrl.getPrizesByShopCtrl);

// CREATE 5: listPrizes(): Promise<PrizeEntity[] | null>;
routePrize.get("/prize/listall", checkJwt, prizeCtrl.listPrizesCtrl);

// CREATE 6: getNumPrizes(): Promise<string | null>;
routePrize.get("/prize/all/count/docs", checkJwt, prizeCtrl.getNumPrizesCtrl);

// CREATE 7: updatePrize(uuid: string, data: PrizeEntity): Promise<PrizeEntity | null>;
routePrize.put("/prize/update/:uuid", checkJwt, prizeCtrl.updatePrizeCtrl);

// CREATE 8: deletePrize(uuid: string): Promise<PrizeEntity | null>;
routePrize.delete("/prize/delete/:uuid", checkJwt, prizeCtrl.deletePrizeCtrl);

export default routePrize;
