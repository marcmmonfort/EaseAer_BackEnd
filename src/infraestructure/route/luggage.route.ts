import { Router } from "express";
import { LuggageUseCase } from "../../application/luggageUseCase";
import { LuggageController } from "../controller/luggage.ctrl";
import { MongoLuggageRepository } from "../repository/mongoLuggage.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeLuggage = Router();

const luggageRepo = new MongoLuggageRepository();
const luggageUseCase = new LuggageUseCase(luggageRepo);
const luggageCtrl = new LuggageController(luggageUseCase);

// CASE 1: createLuggage(data: LuggageEntity): Promise<LuggageEntity | null | string>;
routeLuggage.post("/luggage/create", luggageCtrl.createLuggageCtrl);

// CASE 2: getLuggageById(uuid: string): Promise<LuggageEntity | null>;
routeLuggage.get("/luggage/getbyid/:uuid", checkJwt, luggageCtrl.getLuggageByIdCtrl);

// CASE 3: getLuggageByFlight(flight: string): Promise<LuggageEntity[] | null>;
routeLuggage.get("/luggage/getbyflight/:flight", luggageCtrl.getLuggageByFlightCtrl);

// CASE 4: getLuggageByUser(user: string): Promise<LuggageEntity[] | null>;
routeLuggage.get("/luggage/getbyuser/:flight", luggageCtrl.getLuggageByUserCtrl);

// CASE 5: getNumLuggage(): Promise<String | null>;
routeLuggage.get("/luggage/all/count/docs", checkJwt, luggageCtrl.getNumLuggageCtrl);

// CASE 6: updateLuggageById(uuid: string, data: LuggageEntity): Promise<LuggageEntity | null>;
routeLuggage.put("/luggage/update/:uuid", checkJwt, luggageCtrl.updateLuggageByIdCtrl);

// CASE 7: deleteLuggage(uuid: string): Promise<LuggageEntity | null>;
routeLuggage.delete("/luggage/delete/:uuid", checkJwt, luggageCtrl.deleteLuggageCtrl);

export default routeLuggage;
