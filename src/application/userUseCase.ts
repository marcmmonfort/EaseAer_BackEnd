import { UserRepository } from "../domain/user/user.repository";
import { UserValue, UserAuthValue, AuthValue } from "../domain/user/user.value";
import { NotFoundError } from "./notFoundError";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  // CASE 1: registerUser(data: UserAuthEntity) ---> UserAuthEntity
  public registerUser = async ({
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
    deletedUser,
  }: {
    uuid: string;
    appUser: string;
    nameUser: string;
    surnameUser: string;
    mailUser: string;
    passwordUser: string;
    photoUser: string;
    birthdateUser: Date;
    genderUser: "male" | "female" | "other";
    descriptionUser: string;
    roleUser: "pax" | "company" | "admin" | "tech";
    privacyUser: boolean;
    recordGameUser: number;
    flightsUser: [string];
    deletedUser: boolean;
  }) => {
    const userAuthValue = new UserAuthValue({
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
      deletedUser,
    });
    const user = await this.userRepository.registerUser(userAuthValue);
    if (!user) {
      throw new NotFoundError("CANNOT_REGISTER_USER");
    }
    return user;
  };

  // CASE 2: getUserById(uuid: string) ---> UserEntity
  public getUserById = async (uuid: string) => {
    const user = await this.userRepository.getUserById(uuid);
    if (!user) {
      throw new NotFoundError("CANNOT_GET_USER_BY_ID");
    }
    return user;
  };

  // CASE 3: getUserByEmail(email: string) ---> UserEntity
  public getUserByEmail = async (email: string) => {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new NotFoundError("CANNOT_GET_USER_BY_EMAIL");
    }
    console.log(user);
    return user;
  };

  // CASE 4: getSearchUsers(search: string) ---> UserEntity[]
  public getSearchUsers = async (search: string) => {
    const discovery = await this.userRepository.getSearchUsers(search);
    return discovery;
  };

  // CASE 5: getNumUsers() ---> string
  public getNumUsers = async () => {
    const numUsers = await this.userRepository.getNumUsers();
    return numUsers;
  };

  // CASE 6: listUser() ---> UserEntity[]
  public listUser = async () => {
    const listUser = await this.userRepository.listUser();
    if (!listUser) {
      throw new NotFoundError("CANNOT_LIST_USERS");
    }
    return listUser;
  };

  // CASE 7: listUserPag(numPage: string) ---> UserEntity[]
  public listUserPag = async (numPage: string) => {
    const listUser = await this.userRepository.listUserPag(numPage);
    return listUser;
  };

  // CASE 8: loginUser(data: AuthEntity) ---> string[2]
  public loginUser = async ({
    mailUser,
    passwordUser,
  }: {
    mailUser: string;
    passwordUser: string;
  }) => {
    const userAuthValue = new AuthValue({ mailUser, passwordUser });
    const loginUser = await this.userRepository.loginUser(userAuthValue);
    if (!loginUser) {
      throw new NotFoundError("USER_NOT_FOUND");
    }
    return loginUser;
  };

  // CASE 9: loginFrontEndUser(data: AuthEntity) ---> string[2]
  public loginFrontEndUser = async ({
    mailUser,
    passwordUser,
  }: {
    mailUser: string;
    passwordUser: string;
  }) => {
    const userAuthValue = new AuthValue({ mailUser, passwordUser });
    const loginUser = await this.userRepository.loginFrontEndUser(
      userAuthValue
    );
    if (!loginUser) {
      throw new NotFoundError("USER_NOT_FOUND");
    }
    return loginUser;
  };

  // CASE 10: updateUser(uuid: string, data: UserEntity) ---> UserEntity
  public updateUser = async (
    uuid: string,
    {
      appUser,
      nameUser,
      surnameUser,
      mailUser,
      photoUser,
      birthdateUser,
      genderUser,
      descriptionUser,
      roleUser,
      privacyUser,
      recordGameUser,
      flightsUser,
      deletedUser,
    }: {
      appUser: string;
      nameUser: string;
      surnameUser: string;
      mailUser: string;
      photoUser: string;
      birthdateUser: Date;
      genderUser: "male" | "female" | "other";
      descriptionUser: string;
      roleUser: "pax" | "company" | "admin" | "tech";
      privacyUser: boolean;
      recordGameUser: number;
      flightsUser: [string];
      deletedUser: boolean;
    }
  ) => {
    const userValue: UserValue = new UserValue({
      uuid,
      appUser,
      nameUser,
      surnameUser,
      mailUser,
      photoUser,
      birthdateUser,
      genderUser,
      descriptionUser,
      roleUser,
      privacyUser,
      recordGameUser,
      flightsUser,
      deletedUser,
    });
    console.log(userValue);
    const user = await this.userRepository.updateUser(uuid, userValue);
    console.log(user);
    if (!user) {
      throw new NotFoundError("USER_TO_UPDATE_NOT_FOUND");
    }
    return user;
  };

  // CASE 11: deleteUser(uuid: string) ---> UserEntity
  public deleteUser = async (uuid: string) => {
    const user = await this.userRepository.deleteUser(uuid);
    return user;
  };
  
}
