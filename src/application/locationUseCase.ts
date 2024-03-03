import { LocationValue } from "./../domain/location/location.value";
import { LocationRepository } from "../domain/location/location.repository";
import { NotFoundError } from "./notFoundError";

export class LocationUseCase {
  constructor(private readonly locationRepository: LocationRepository) {}

  // CASE 1: insertLocation(data: LocationEntity): Promise<LocationEntity | null>;
  public insertLocation = async ({
    uuid,
    nameLocation,
    latLocation,
    lonLocation,
    typeLocation,
    deletedLocation
  }: {
    uuid: string;
    nameLocation: string;
    latLocation: string;
    lonLocation: string;
    typeLocation: "shop" | "service";
    deletedLocation: boolean;
  }) => {
    const locationValue = new LocationValue({
      uuid,
      nameLocation,
      latLocation,
      lonLocation,
      typeLocation,
      deletedLocation
    });
    const location = await this.locationRepository.insertLocation(
      locationValue
    );
    if (!location) {
      throw new NotFoundError("Location Not Found");
    }
    return location;
  };

  // CASE 2: listLocation(): Promise<LocationEntity[] | null>;
  public listLocation = async () => {
    const listLocation = await this.locationRepository.listLocation();
    if (!listLocation) {
      throw new NotFoundError("List Not Found");
    }
    return listLocation;
  };

  // CASE 3: listLocationPag(numPage: string): Promise<LocationEntity[] | null>;
  public listLocationPag = async (numPage: string) => {
    const listLocation = await this.locationRepository.listLocationPag(numPage);
    return listLocation;
  };

  // CASE 4: getLocationById(uuid: string): Promise<LocationEntity | null>;
  public getLocationById = async (uuid: string) => {
    const location = await this.locationRepository.getLocationById(uuid);
    if (!location) {
      throw new NotFoundError("Location Not Found");
    }
    return location;
  };

  // CASE 5: updateLocation(uuid: string, data: LocationEntity): Promise<LocationEntity | null>;
  public updateLocation = async (
    uuid: string,
    {
      nameLocation,
      latLocation,
      lonLocation,
      typeLocation,
      deletedLocation,
    }: {
      nameLocation: string;
      latLocation: string;
      lonLocation: string;
      typeLocation: "shop" | "service";
      deletedLocation: boolean;
    }
  ) => {
    const locationValue = new LocationValue({
      uuid,
      nameLocation,
      latLocation,
      lonLocation,
      typeLocation,
      deletedLocation,
    });
    const location = await this.locationRepository.updateLocation(
      uuid,
      locationValue
    );
    if (!location) {
      throw new NotFoundError("Location Not Found");
    }
    return location;
  };

  // CASE 6: deleteLocation(uuid: string): Promise<LocationEntity | null>;
  public deleteLocation = async (uuid: string) => {
    const location = await this.locationRepository.deleteLocation(uuid);
    return location;
  };
  
  // CASE 7: getNumLocations(): Promise<string | null>;
  public getNumLocations = async () => {
    const getNumLocations = await this.locationRepository.getNumLocations();
    return getNumLocations;
  };
  

  

  
}
