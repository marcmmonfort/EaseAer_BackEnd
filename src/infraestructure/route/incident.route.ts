import { Router } from "express";
import { IncidentUseCase } from "../../application/incidentUseCase";
import { IncidentController } from "../controller/incident.ctrl";
import { MongoIncidentRepository } from "../repository/mongoIncident.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeIncident = Router();

const incidentRepo = new MongoIncidentRepository();
const incidentUseCase = new IncidentUseCase(incidentRepo);
const incidentCtrl = new IncidentController(incidentUseCase);

// CASE 1: createIncident(data: IncidentEntity): Promise<IncidentEntity | null | string>;
routeIncident.post("/incident/create", incidentCtrl.createIncidentCtrl);

// CASE 2: getIncidentById(uuid: string): Promise<IncidentEntity | null>;
routeIncident.get("/incident/getbyid/:uuid", checkJwt, incidentCtrl.getIncidentByIdCtrl);

// CASE 3: listIncidents(): Promise<IncidentEntity[] | null>;
routeIncident.get("/incident/getall", checkJwt, incidentCtrl.listIncidentsCtrl);

// CASE 4: listIncidentsPag(numPage: string): Promise<IncidentEntity[] | null>;
routeIncident.get("/incident/getpaginated/:numPage", checkJwt, incidentCtrl.listIncidentsPagCtrl);

// CASE 5: getNumIncidents(): Promise<string | null>;
routeIncident.get("/incident/getnumincidents", checkJwt, incidentCtrl.getNumIncidentsCtrl);

// CASE 6: getNumIncidentsStatus(status: string): Promise<string | null>;
routeIncident.get("/incident/getnumbystatus/:status", checkJwt, incidentCtrl.getNumIncidentsCtrl);

// CASE 7: updateIncident(uuid: string, data: IncidentEntity): Promise<IncidentEntity | null>;
routeIncident.put("/incident/update/:uuid", checkJwt, incidentCtrl.updateIncidentCtrl);

// CASE 8: deleteIncident(uuid: string): Promise<IncidentEntity | null>;
routeIncident.delete("/incident/delete/:uuid", checkJwt, incidentCtrl.deleteIncidentCtrl);

export default routeIncident;
