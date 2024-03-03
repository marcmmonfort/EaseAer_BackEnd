import { LocationEntity } from "./../../domain/location/location.entity";
import { Types } from "mongoose";
import { LocationRepository } from "../../domain/location/location.repository";
import LocationModel from "../model/location.schema";

export class MongoLocationRepository implements LocationRepository {

  // CASE 1: insertLocation(data: LocationEntity): Promise<LocationEntity | null>;
  async insertLocation(data: LocationEntity): Promise<any> {
    const item = await LocationModel.create(data);
    const updatedData = {
      ...data,
      uuid: item._id,
    };
    const location = await LocationModel.updateOne(
      { _id: item._id },
      updatedData
    );
    return location;
  }

  // CASE 2: listLocation(): Promise<LocationEntity[] | null>;
  async listLocation(): Promise<any> {
    const response = await LocationModel.find();
    return response;
  }

  // CASE 3: listLocationPag(numPage: string): Promise<LocationEntity[] | null>;
  async listLocationPag(numPage: string): Promise<any> {
    const items = 2;
    const hop = (parseInt(numPage, 10) - 1) * items;
    const response = await LocationModel.find({}).skip(hop).limit(items).exec();
    return response;
  }

  // CASE 4: getLocationById(uuid: string): Promise<LocationEntity | null>;
  async getLocationById(uuid: string): Promise<any> {
    const response = await LocationModel.findOne({ _id: uuid });
    return response;
  }

  // CASE 5: updateLocation(uuid: string, data: LocationEntity): Promise<LocationEntity | null>;
  async updateLocation(uuid: string, data: LocationEntity): Promise<any> {
    const response = await LocationModel.findOneAndUpdate({ _id: uuid }, data, {
      new: true,
    });
    return response;
  }

  // CASE 6: deleteLocation(uuid: string): Promise<LocationEntity | null>;
  async deleteLocation(uuid: string): Promise<any> {
    const response = await LocationModel.findOneAndRemove({ _id: uuid });
    return response;
  }

  // CASE 7: getNumLocations(): Promise<string | null>;
  async getNumLocations(): Promise<any> {
    const response = (await LocationModel.countDocuments({})).toString();
    return response;
  }
    
}
