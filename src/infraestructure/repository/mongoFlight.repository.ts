import { Types } from "mongoose";
import { FlightEntity } from "../../domain/flight/flight.entity";
import { FlightRepository } from "../../domain/flight/flight.repository";
import FlightModel from "../model/flight.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

// export class MongoFlightRepository implements FlightRepository {

    // CASE 1: getFlightById(uuid: string): Promise<FlightEntity | null>;

    // CASE 2: getFlightsByAirportAndInterval(airport: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;

    // CASE 3: getDeparturesByAirportAndInterval(originFlight: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;

    // CASE 4: getArrivalsByAirportAndInterval(destinationFlight: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;

    // CASE 5: getNumFlights(): Promise<Number | null>;

    // CASE 6: getFlightsByCompany(companyName: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;

    // CASE 7: createFlight(data: FlightEntity): Promise<FlightEntity | null | string>;

    // CASE 8: updateFlightById(uuid: string, data: FlightEntity): Promise<FlightEntity | null>;
    
    // CASE 9: deleteFlight(uuid: string): Promise<FlightEntity | null>;
  
  /*
  async registerUser(data: UserAuthEntity): Promise<any> {
    console.log("Estoy en mongo");
    const {
      uuid,
      appUser,
      nameUser,
      surnameUser,
      mailUser,
      passwordUser,
      photoUser,
      birthdateUser,
      genderUser,
      descriptionUser,
      roleUser,
      privacyUser,
      recordGameUser,
      flightsUser,
      deletedUser
    } = data;
    const checkIs = await UserModel.findOne({ mailUser });
    console.log("Mail de Registro: " + mailUser);
    if (checkIs) return "ALREADY_USER";
    const passHash = await encrypt(passwordUser);
    const encryptedData = {
      uuid,
      appUser,
      nameUser,
      surnameUser,
      mailUser,
      passwordUser: passHash,
      photoUser,
      birthdateUser,
      genderUser,
      descriptionUser,
      roleUser,
      privacyUser,
      recordGameUser,
      flightsUser,
      deletedUser
    };
    console.log(encryptedData);
    const user = await UserModel.create(encryptedData);
    const encryptedUpdate = {
      uuid: user._id,
      appUser,
      nameUser,
      surnameUser,
      mailUser,
      passwordUser: passHash,
      photoUser,
      birthdateUser,
      genderUser,
      descriptionUser,
      roleUser,
      privacyUser,
      recordGameUser,
      flightsUser,
      deletedUser
    };
    const response = await UserModel.findOneAndUpdate(
      { _id: encryptedUpdate.uuid },
      encryptedUpdate,
      { new: true }
    );
    console.log("Update User: " + response);
    return response;
  }

  async getUserById(uuid: string): Promise<any> {
    console.log(uuid);
    const response = await UserModel.findOne({ _id: uuid });
    console.log(response);
    return response;
  }

  async getUserByEmail(mailUser: string): Promise<any> {
    console.log(mailUser);
    const response = await UserModel.findOne({ mailUser: mailUser });
    if (!response) {
      return "NOT_FOUND_USER";
    }
    console.log(response);
    return response;
  }

  async getSearchUsers(search: string): Promise<any> {
    const responseUser = await UserModel.findOne({ appUser: search });

    const regex = new RegExp(`^${search}`, "i");
    const responseItem = await UserModel.find({ appUser: regex }).limit(10);

    if (responseUser) {
      return [responseUser, ...responseItem.slice(0, 9)];
    } else {
      return responseItem;
    }
  }

  async getNumUsers(): Promise<any> {
    const response = (await UserModel.countDocuments({})).toString();
    return response;
  }

  async listUser(): Promise<any> {
    const response = await UserModel.find();
    console.log(response);
    return response;
  }

  async listUserPag(numPage: string): Promise<any> {
    const items = 2;
    const hop = (parseInt(numPage, 10) - 1) * items;
    const response = await UserModel.find({}).skip(hop).limit(items).exec();
    return response;
  }

  async loginUser(data: AuthEntity): Promise<any> {
    const { mailUser, passwordUser } = data;
    const checkIs = await UserModel.findOne({ mailUser: mailUser });

    if (!checkIs) return "NOT_FOUND_USER";

    const passwordHash = checkIs.passwordUser;
    const isCorrect = await verified(passwordUser, passwordHash);
    if (!isCorrect) return "PASSWORD_INCORRECT";

    if (checkIs.roleUser !== "admin") return "USER_NOT_ADMIN";

    const token = generateToken(checkIs.mailUser, checkIs.roleUser);
    const item = { token, user: checkIs };
    return item;
  }

  async loginFrontEndUser(data: AuthEntity): Promise<any> {
    const { mailUser, passwordUser } = data;
    const checkIs = await UserModel.findOne({ mailUser: mailUser });

    if (!checkIs) return "NOT_FOUND_USER";

    const passwordHash = checkIs.passwordUser;
    const isCorrect = await verified(passwordUser, passwordHash);
    if (!isCorrect) return "PASSWORD_INCORRECT";

    const token = generateToken(checkIs.mailUser, checkIs.roleUser);
    const item = { token, user: checkIs };
    return item;
  }

  async updateUser(uuid: string, data: UserEntity): Promise<any> {
    const response = await UserModel.findOneAndUpdate({ _id: uuid }, data, {
      new: true,
    });
    console.log(response);
    return response;
  }

  async deleteUser(uuid: string): Promise<any> {
    const response = await UserModel.findOneAndRemove({ _id: uuid });
    return response;
  }

  */

// }


