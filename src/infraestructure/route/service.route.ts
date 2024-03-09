import { Router } from "express";
import { ServiceUseCase } from "../../application/serviceUseCase";
import { ServiceController } from "../controller/service.ctrl";
import { MongoServiceRepository } from "../repository/mongoService.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeService = Router();

const serviceRepo = new MongoServiceRepository();
const serviceUseCase = new ServiceUseCase(serviceRepo);
const serviceCtrl = new ServiceController(serviceUseCase);

// CASE 1: createService(data: ServiceEntity): Promise<ServiceEntity | null | string>;
routeService.post("/service/create", serviceCtrl.createServiceCtrl);

// CASE 2: getServiceById(uuid: string): Promise<ServiceEntity | null>;
routeService.get("/service/getbyid/:uuid", checkJwt, serviceCtrl.getServiceByIdCtrl);

// CASE 3: getServiceByLocation(location: string): Promise<ServiceEntity | null>;
routeService.get("/service/getbylocation/:location", checkJwt, serviceCtrl.getServiceByLocationCtrl);

// CASE 4: listServices(): Promise<ServiceEntity[] | null>;
routeService.get("/service/all", checkJwt, serviceCtrl.listServicesCtrl);

// CASE 5: listServicesByType(type: string): Promise<ServiceEntity[] | null>;
routeService.get("/service/getbytype/:type", checkJwt, serviceCtrl.listServicesByTypeCtrl);

// CASE 6: listOpenedServices(time: Date): Promise<ServiceEntity[] | null>;
routeService.get("/service/opened/:time", checkJwt, serviceCtrl.listOpenedServicesCtrl);

// CASE 7: updateService(uuid: string, data: ServiceEntity): Promise<ServiceEntity | null>;
routeService.put("/service/update/:uuid", checkJwt, serviceCtrl.updateServiceCtrl);

// CASE 8: deleteService(uuid: string): Promise<ServiceEntity | null>;
routeService.delete("/service/delete/:uuid", checkJwt, serviceCtrl.deleteServiceCtrl);

export default routeService;
