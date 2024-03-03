import { RatingsValue } from "../domain/ratings/ratings.value";
import { RatingsRepository } from "./../domain/ratings/ratings.repository";
import { NotFoundError } from "./notFoundError";

export class RatingsUseCase {
  constructor(private readonly ratingsRepository: RatingsRepository) {}

  // CASE 1: getAllRatings() ---> RatingsEntity
  public getAllRatings = async () => {
    const ratings = await this.ratingsRepository.getAllRatings();
    if (!ratings) {
      throw new NotFoundError("There are no ratings!");
    }
    return ratings;
  };

  // CASE 2: getUsersWhoHaveRated(uuid: string) ---> UserEntity[]
  public getUsersWhoHaveRated = async (uuid: string) => {
    const usersWhoHaveRated = await this.ratingsRepository.getUsersWhoHaveRated(
      uuid
    );
    if (!usersWhoHaveRated) {
      throw new NotFoundError("Nobody has rated!");
    }
    return usersWhoHaveRated;
  };

  // CASE 3: insertRating(data: RatingsEntity) ---> RatingsEntity
  public insertRating = async ({
    uuid,
    typeRating,
    idObjectRating,
    averageRating,
    idsUsersRating,
    commentRating
  }: {
    uuid: string;
    typeRating: "news" | "service" | "shop" | "product";
    idObjectRating: string;
    averageRating: number;
    idsUsersRating?: [string];
    commentRating: string;
  }) => {
    const ratingValue = new RatingsValue({
      uuid,
      typeRating,
      idObjectRating,
      averageRating,
      idsUsersRating,
      commentRating
    });
    const rating = await this.ratingsRepository.insertRating(ratingValue);
    if (!rating) {
      throw new NotFoundError("The new rating can't be found!");
    }
    return rating;
  };

  // CASE 4: updateRating(uuid: string, data: RatingsEntity) ---> RatingsEntity
  public updateRating = async (
    uuid: string,
    {
      typeRating,
      idObjectRating,
      averageRating,
      idsUsersRating,
      commentRating
    }: {
      uuid: string;
      typeRating: "news" | "service" | "shop" | "product";
      idObjectRating: string;
      averageRating: number;
      idsUsersRating?: [string];
      commentRating: string;
    }
  ) => {
    const newRatingValue = new RatingsValue({
      uuid,
      typeRating,
      idObjectRating,
      averageRating,
      idsUsersRating,
      commentRating
    });
    const newRating = await this.ratingsRepository.updateRating(uuid, newRatingValue);
    if (!newRating) {
      throw new NotFoundError("The updated rating can't be found!");
    }
    return newRating;
  };

  // CASE 5: getAverageValueRating(idRatedObject: string, ratingType: string) ---> number
  public getAverageValueRating = async (idObjectRating: string, typeRating: string) => {
    const averageRating = await this.ratingsRepository.getAverageValueRating(idObjectRating, typeRating);
    if (!averageRating) {
      throw new NotFoundError("There's no average rate!");
    } else {
      return averageRating;
    }
  };
  
  // CASE 6: getRating(idRatedObject: string, ratingType: string) ---> RatingsEntity
  public getRating = async (idObjectRating: string, typeRating: string) => {
    const rate = await this.ratingsRepository.getRating(idObjectRating, typeRating);
    if (!rate) {
      throw new NotFoundError("This object doesn't have any rate!");
    } else {
      return rate;
    }
  };
}
