import { ServiceRepository } from "../domain/service/service.repository";
import { ServiceValue } from "../domain/service/service.value";
import { NotFoundError } from "./notFoundError";

export class ServiceUseCase {
    constructor(private readonly serviceRepository: ServiceRepository) {}

    // CASE 1: createService(data: ServiceEntity): Promise<ServiceEntity | null | string>;
    public createService = async ({
        uuid,
        nameService,
        idLocationService,
        descriptionService,
        typeService,
        scheduleService,
        deletedService
    }: {
        uuid: string;
        nameService: string;
        idLocationService: string;
        descriptionService: string;
        typeService: string;
        scheduleService: string;
        deletedService: boolean;
    }) => {
        const serviceValue = new ServiceValue({
            uuid,
            nameService,
            idLocationService,
            descriptionService,
            typeService,
            scheduleService,
            deletedService
        });
        const newService = await this.serviceRepository.createService(serviceValue);
        if (!newService) {
            throw new NotFoundError("CANNOT_REGISTER_SERVICE");
        }
        return newService;
    };

    // CASE 2: getServiceById(uuid: string): Promise<ServiceEntity | null>;
    public getServiceById = async (uuid: string) => {
        const service = await this.serviceRepository.getServiceById(uuid);
        if (!service) {
            throw new NotFoundError("CANNOT_GET_SERVICE_BY_ID");
        }
        return service;
    };

    // CASE 3: getServiceByLocation(location: string): Promise<ServiceEntity | null>;
    public getServiceByLocation = async (location: string) => {
        const service = await this.serviceRepository.getServiceByLocation(location);
        if (!service) {
            throw new NotFoundError("CANNOT_GET_SERVICE_BY_LOCATION");
        }
        return service;
    };

    // CASE 4: listServices(): Promise<ServiceEntity[] | null>;
    public listServices = async () => {
        const listServices = await this.serviceRepository.listServices();
        if (!listServices) {
            throw new NotFoundError("CANNOT_LIST_SERVICES");
        }
        return listServices;
    };

    // CASE 5: listServicesByType(type: string): Promise<ServiceEntity[] | null>;
    public listServicesByType = async (type: string) => {
        const servicesType = await this.serviceRepository.listServicesByType(type);
        if (!servicesType) {
            throw new NotFoundError("CANNOT_LIST_SERVICES_BY_TYPE");
        }
        return servicesType;
    };

    // CASE 6: listOpenedServices(time: Date): Promise<ServiceEntity[] | null>;
    public listOpenedServices = async (time: Date) => {
        const listOpenedServices = await this.serviceRepository.listOpenedServices(time);
        if (!listOpenedServices) {
        throw new NotFoundError("CANNOT_LIST_OPENED_SERVICES");
        }
        return listOpenedServices;
    };

    // CASE 7: updateService(uuid: string, data: ServiceEntity): Promise<ServiceEntity | null>;
    public updateService = async (
        uuid: string,
        {
            nameService,
            idLocationService,
            descriptionService,
            typeService,
            scheduleService,
            deletedService
        }: {
            nameService: string;
            idLocationService: string;
            descriptionService: string;
            typeService: string;
            scheduleService: string;
            deletedService: boolean;
        }
    ) => {
        const serviceValue: ServiceValue = new ServiceValue({
            uuid,
            nameService,
            idLocationService,
            descriptionService,
            typeService,
            scheduleService,
            deletedService
        });
        const updatedService = await this.serviceRepository.updateService(uuid, serviceValue);
        if (!updatedService) {
            throw new NotFoundError("SERVICE_TO_UPDATE_NOT_FOUND");
        }
        return updatedService;
    };

    // CASE 8: deleteService(uuid: string): Promise<ServiceEntity | null>;
    public deleteService = async (uuid: string) => {
        const service = await this.serviceRepository.deleteService(uuid);
        return service;
    };

}
