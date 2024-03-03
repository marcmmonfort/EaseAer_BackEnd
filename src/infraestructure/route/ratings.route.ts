import { Router } from "express";
import { MongoRatingsRepository } from "../repository/mongoRatings.repository";
import { RatingsUseCase } from "../../application/ratingsUseCase";
import { RatingsController } from "../controller/ratings.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeRatings = Router();

const ratingsRepo = new MongoRatingsRepository();
const ratingsUseCase = new RatingsUseCase(ratingsRepo);
const ratingsCtrl = new RatingsController(ratingsUseCase);

// CASE 1: getAllRatings(): Promise<RatingsEntity | null>;
routeRatings.get("/ratings/all", checkJwt, ratingsCtrl.getAllRatingsCtrl);

// CASE 2: getUsersWhoHaveRated(uuid: string): Promise<UserEntity[] | null>;
routeRatings.get("/rating/getraters/:uuid", checkJwt, ratingsCtrl.getUsersWhoHaveRatedCtrl);

// CASE 3: insertRating(data: RatingsEntity): Promise<RatingsEntity | null>;
routeRatings.post("/rating/add", checkJwt, ratingsCtrl.insertRatingCtrl);

// CASE 4: updateRating(uuid: string, data: RatingsEntity): Promise<RatingsEntity | null>;
routeRatings.put("/rating/update/:uuid", checkJwt, ratingsCtrl.updateRatingCtrl);

// CASE 5: getAverageValueRating(idRatedObject: string, ratingType: string): Promise<number | null>;
routeRatings.get("/rating/getaverage/:idRatedObject/:ratingType", checkJwt, ratingsCtrl.getAverageValueRatingCtrl); // No acaba de ir.
  
// CASE 6: getRating(idRatedObject: string, ratingType: string): Promise<RatingsEntity | null>;
routeRatings.get("/rating/get/:idRatedObject/:ratingType", checkJwt, ratingsCtrl.getRatingCtrl);

export default routeRatings;
