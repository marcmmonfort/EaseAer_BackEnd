import { LocationUseCase } from "./../../application/locationUseCase";
import { Router } from "express";
import { LocationController } from "../controller/location.ctrl";
import { MongoLocationRepository } from "../repository/mongoLocation.repository";
import { checkAdmin } from "../controller/session.ctrl";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const locationRoute = Router();

const locationRepo = new MongoLocationRepository();
const locationUseCase = new LocationUseCase(locationRepo);
const locationCtrl = new LocationController(locationUseCase);

locationRoute.post("/location/add", checkJwt, locationCtrl.insertLocationCtrl);
locationRoute.get("/locations/all", logMiddleware, locationCtrl.listLocationCtrl);
locationRoute.get("/location/all/:numPage", checkJwt, locationCtrl.listLocationPagCtrl);
locationRoute.get("/location/:uuid", checkJwt, locationCtrl.getLocationByIdCtrl);
locationRoute.put("/location/:uuid", checkJwt, locationCtrl.updateLocationCtrl);
locationRoute.delete("/location/:uuid", checkAdmin, locationCtrl.deleteLocationCtrl);
locationRoute.get("/location/all/count/docs", checkJwt, locationCtrl.getNumLocationsCtrl);

export default locationRoute;
