import { RatingsEntity } from "../../domain/ratings/ratings.entity";
import { RatingsRepository } from "../../domain/ratings/ratings.repository";
import { UserEntity } from "../../domain/user/user.entity";
import RatingsModel from "../model/ratings.schema";
import UserModel from "../model/user.schema";
import { ObjectId } from "mongodb";

export class MongoRatingsRepository implements RatingsRepository {

  // CASE 1: getAllRatings() ---> RatingsEntity
  async getAllRatings(): Promise<any> {
    const responseItems = await RatingsModel.find();
    return responseItems;
  }

  // CASE 2: getUsersWhoHaveRated(uuid: string) ---> UserEntity[]
  async getUsersWhoHaveRated(uuid: string): Promise<any> {
    const responseItem = await RatingsModel.findOne({ _id: uuid });
    if (responseItem) {
      const { idsUsersRating } = responseItem;
      return idsUsersRating;
    }
    return null;
  }

  // CASE 3: insertRating(data: RatingsEntity) ---> RatingsEntity
  async insertRating(data: RatingsEntity): Promise<any> {
    const item = await RatingsModel.create(data);
    const updatedData = {
      ...data,
      uuid: item._id,
    };
    const activity = await RatingsModel.updateOne(
      { _id: item._id },
      updatedData
    );
    return activity;
  }

  // CASE 4: updateRating(uuid: string, data: RatingsEntity) ---> RatingsEntity
  async updateRating(uuid: string, data: RatingsEntity): Promise<any> {
    const responseItem = await RatingsModel.updateOne({ _id: uuid }, data, {
      new: true,
    });
    return responseItem;
  }

  // CASE 5: getAverageValueRating(idRatedObject: string, ratingType: string) ---> number
  async getAverageValueRating(
    idRatedObject: string,
    ratingType: string
  ): Promise<any> {
    const result = await RatingsModel.findOne({ idRatedObject, ratingType });
    console.log("RESULTADO: " + result);
    if (result) {
      return result.averageRating;
    }
    return null;
  }

  // CASE 6: getRating(idRatedObject: string, ratingType: string) ---> RatingsEntity
  async getRating(idObjectRating: string, typeRating: string): Promise<any> {
    const result = await RatingsModel.findOne({ idObjectRating, typeRating });
    if (result) {
      return result;
    }
    return null;
  } 
}
