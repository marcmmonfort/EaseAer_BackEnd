import { ServiceEntity } from "./service.entity";

export interface ServiceRepository {

    createService(data: ServiceEntity): Promise<ServiceEntity | null | string>;

    getServiceById(uuid: string): Promise<ServiceEntity | null>;

    getServiceByLocation(location: string): Promise<ServiceEntity | null>;

    listServices(): Promise<ServiceEntity[] | null>;

    listServicesByType(type: string): Promise<ServiceEntity[] | null>;

    listOpenedServices(time: Date): Promise<ServiceEntity[] | null>;

    updateService(uuid: string, data: ServiceEntity): Promise<ServiceEntity | null>;

    deleteService(uuid: string): Promise<ServiceEntity | null>;

    // CASE 1: createService(data: ServiceEntity): Promise<ServiceEntity | null | string>;

    // CASE 2: getServiceById(uuid: string): Promise<ServiceEntity | null>;

    // CASE 3: getServiceByLocation(location: string): Promise<ServiceEntity | null>;

    // CASE 4: listServices(): Promise<ServiceEntity[] | null>;

    // CASE 5: listServicesByType(type: string): Promise<ServiceEntity[] | null>;

    // CASE 6: listOpenedServices(time: Date): Promise<ServiceEntity[] | null>;

    // CASE 7: updateService(uuid: string, data: ServiceEntity): Promise<ServiceEntity | null>;

    // CASE 8: deleteService(uuid: string): Promise<ServiceEntity | null>;
    
}
