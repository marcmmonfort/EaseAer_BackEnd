import { Router } from "express";
import { PreferencesUseCase } from "../../application/preferencesUseCase";
import { PreferencesController } from "../controller/preferences.ctrl";
import { MongoPreferencesRepository } from "../repository/mongoPreferences.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routePreferences = Router();

const preferencesRepo = new MongoPreferencesRepository();
const preferencesUseCase = new PreferencesUseCase(preferencesRepo);
const preferencesCtrl = new PreferencesController(preferencesUseCase);

// CASE 1: createPreferences(data: PreferencesEntity): Promise<PreferencesEntity | null | string>;
routePreferences.post("/preferences/create", preferencesCtrl.createPreferencesCtrl);

// CASE 2: getPreferencesById(uuid: string): Promise<PreferencesEntity | null>;
routePreferences.get("/preferences/getbyid/:uuid", checkJwt, preferencesCtrl.getPreferencesByIdCtrl);

// CASE 3: getDeltaOfPreferences(uuid: string): Promise<Number | null>;
routePreferences.get("/preferences/getdelta/:uuid", checkJwt, preferencesCtrl.getDeltaOfPreferencesCtrl);

// CASE 4: getNumPreferences(): Promise<String | null>;
routePreferences.get("/preferences/all/count/docs", checkJwt, preferencesCtrl.getNumPreferencesCtrl);

// CASE 5: updatePreferencesById(uuid: string, data: PreferencesEntity): Promise<PreferencesEntity | null>;
routePreferences.put("/preferences/update/:uuid", checkJwt, preferencesCtrl.updatePreferencesByIdCtrl);

// CASE 6: deletePreferences(uuid: string): Promise<PreferencesEntity | null>;
routePreferences.delete("/preferences/delete/:uuid", checkJwt, preferencesCtrl.deletePreferencesCtrl);

export default routePreferences;
