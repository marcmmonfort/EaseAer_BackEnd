import { Types } from "mongoose";
import { ServiceEntity } from "../../domain/service/service.entity";
import { ServiceRepository } from "../../domain/service/service.repository";
import ServiceModel from "../model/service.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoServiceRepository implements ServiceRepository {

    // CASE 1: createService(data: ServiceEntity): Promise<ServiceEntity | null | string>;
    async createService(data: ServiceEntity): Promise<any> {
        const {
            uuid,
            nameService,
            idLocationService,
            descriptionService,
            typeService,
            scheduleService,
            deletedService
        } = data;
        const checkIs = await ServiceModel.findOne({ idLocationService });
        if (checkIs) return "ALREADY_SERVICE_IN_LOCATION";
        const newData = {
            uuid,
            nameService,
            idLocationService,
            descriptionService,
            typeService,
            scheduleService,
            deletedService
        };
        const newService = await ServiceModel.create(newData);
        const updatedService = {
            uuid: newService._id,
            nameService,
            idLocationService,
            descriptionService,
            typeService,
            scheduleService,
            deletedService
        };
        const response = await ServiceModel.findOneAndUpdate(
            { _id: updatedService.uuid },
            updatedService,
            { new: true }
        );
        return response;
    }

    // CASE 2: getServiceById(uuid: string): Promise<ServiceEntity | null>;
    async getServiceById(uuid: string): Promise<any> {
        const response = await ServiceModel.findOne({ _id: uuid });
        return response;
    }

    // CASE 3: getServiceByLocation(location: string): Promise<ServiceEntity | null>;
    async getServiceByLocation(location: string): Promise<any> {
        const response = await ServiceModel.findOne({ idLocationSidLocationServicehop: location });
        if (!response) {
            return "NOT_FOUND_SERVICE_IN_LOCATION";
        }
        return response;
    }

    // CASE 4: listServices(): Promise<ServiceEntity[] | null>;
    async listServices(): Promise<any> {
        const response = await ServiceModel.find();
        return response;
    }

    // CASE 5: listServicesByType(type: string): Promise<ServiceEntity[] | null>;
    async listServicesByType(type: string): Promise<any> {
        const response = await ServiceModel.find({ typeService: type });
        return response;
    }

    // CASE 6: listOpenedServices(time: Date): Promise<ServiceEntity[] | null>;
    async listOpenedServices(time: Date): Promise<any> {
        const dayOfWeek = time.getDay(); // 0 Domingo, 1 Lunes, 2 Martes, 3 Miércoles, 4 Jueves, 5 Viernes, 6 Sábado
        const searchedHour = time.getHours();
        const searchedMinutes = time.getMinutes();

        // Obtenemos todos los servicios.
        const listAllServices = await ServiceModel.find();

        if (!listAllServices) {
            return "NOT_FOUND_OPENED_SERVICES";
        } else {
            const openedServices: ServiceEntity[] = [];
            
            for (const service of listAllServices) {
                const serviceObject = service.toObject();

                const scheduleArray = service.scheduleService.split('|');
                const currentSchedule = scheduleArray[dayOfWeek];
                
                const openingHours = currentSchedule.split('_')[0];
                const closingHours = currentSchedule.split('_')[1];

                const [openHour, openMinute] = openingHours.split(':').map(Number);
                const [closeHour, closeMinute] = closingHours.split(':').map(Number);

                const openingTime = openHour * 60 + openMinute;
                const closingTime = closeHour * 60 + closeMinute;

                const currentTime = searchedHour * 60 + searchedMinutes;

                if (currentTime >= openingTime && currentTime <= closingTime) {
                    openedServices.push(serviceObject as unknown as ServiceEntity); // Revisar el UNKNOWN.
                }
            }

            return openedServices;
        }
    }

    // CASE 7: updateService(uuid: string, data: ServiceEntity): Promise<ServiceEntity | null>;
    async updateService(uuid: string, data: ServiceEntity): Promise<any> {
        const response = await ServiceModel.findOneAndUpdate({ _id: uuid }, data, {new: true});
        return response;
    }

    // CASE 8: deleteService(uuid: string): Promise<ServiceEntity | null>;
    async deleteService(uuid: string): Promise<any> {
        const response = await ServiceModel.findOneAndRemove({ _id: uuid });
        return response;
    }

}
