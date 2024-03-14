import { Types } from "mongoose";
import { AuthEntity, UserAuthEntity, UserEntity } from "../../domain/user/user.entity";
import { UserRepository } from "../../domain/user/user.repository";
import UserModel from "../model/user.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoUserRepository implements UserRepository {
  
  // CASE 1: registerUser(data: UserAuthEntity) ---> UserAuthEntity
  async registerUser(data: UserAuthEntity): Promise<any> {
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
    console.log("LLEGA AQUÍ B");
    const response = await UserModel.findOneAndUpdate(
      { _id: encryptedUpdate.uuid },
      encryptedUpdate,
      { new: true }
    );
    console.log("Update User: " + response);
    return response;
  }

  // CASE 2: getUserById(uuid: string) ---> UserEntity
  async getUserById(uuid: string): Promise<any> {
    console.log(uuid);
    const response = await UserModel.findOne({ _id: uuid });
    console.log(response);
    return response;
  }

  // CASE 3: getUserByEmail(email: string) ---> UserEntity
  async getUserByEmail(mailUser: string): Promise<any> {
    console.log(mailUser);
    const response = await UserModel.findOne({ mailUser: mailUser });
    if (!response) {
      return "NOT_FOUND_USER";
    }
    console.log(response);
    return response;
  }

  // CASE 4: getSearchUsers(search: string) ---> UserEntity[]
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

  // CASE 5: getNumUsers() ---> string
  async getNumUsers(): Promise<any> {
    const response = (await UserModel.countDocuments({})).toString();
    return response;
  }

  // CASE 6: listUser() ---> UserEntity[]
  async listUser(): Promise<any> {
    const response = await UserModel.find();
    console.log(response);
    return response;
  }

  // CASE 7: listUserPag(numPage: string) ---> UserEntity[]
  async listUserPag(numPage: string): Promise<any> {
    const items = 2;
    const hop = (parseInt(numPage, 10) - 1) * items;
    const response = await UserModel.find({}).skip(hop).limit(items).exec();
    return response;
  }

  // CASE 8: loginUser(data: AuthEntity) ---> string[2]
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

  // CASE 9: loginFrontEndUser(data: AuthEntity) ---> string[2]
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

  // CASE 10: updateUser(uuid: string, data: UserEntity) ---> UserEntity
  async updateUser(uuid: string, data: UserEntity): Promise<any> {
    const response = await UserModel.findOneAndUpdate({ _id: uuid }, data, {
      new: true,
    });
    console.log(response);
    return response;
  }

  // CASE 11: deleteUser(uuid: string) ---> UserEntity
  async deleteUser(uuid: string): Promise<any> {
    const response = await UserModel.findOneAndRemove({ _id: uuid });
    return response;
  }

}
