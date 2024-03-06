import { Router } from "express";
import { OfferUseCase } from "../../application/offerUseCase";
import { OfferController } from "../controller/offer.ctrl";
import { MongoOfferRepository } from "../repository/mongoOffer.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeOffer = Router();

const offerRepo = new MongoOfferRepository();
const offerUseCase = new OfferUseCase(offerRepo);
const offerCtrl = new OfferController(offerUseCase);

routeOffer.post("/offer/create", offerCtrl.createOfferCtrl);
routeOffer.get("/offer/getbyid/:uuid", checkJwt, offerCtrl.getOfferByIdCtrl);
routeOffer.get("/offer/getbyproduct/:product", checkJwt, offerCtrl.getOffersByProductCtrl);
routeOffer.get("/offer/getbyshop/:shop", checkJwt, offerCtrl.getOffersByShopCtrl);
routeOffer.get("/offer/listall", checkJwt, offerCtrl.listOfferCtrl);
routeOffer.put("/offer/update/:uuid", checkJwt, offerCtrl.updateOfferCtrl);
routeOffer.delete("/offer/delete/:uuid", checkJwt, offerCtrl.deleteOfferCtrl);

export default routeOffer;
