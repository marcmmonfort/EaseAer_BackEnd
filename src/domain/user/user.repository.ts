import { AuthEntity, UserEntity, UserAuthEntity } from "./user.entity";

export interface UserRepository {
  registerUser(data: UserAuthEntity): Promise<UserAuthEntity | null | string>;

  getUserById(uuid: string): Promise<UserEntity | null>;

  getUserByEmail(email: string): Promise<UserEntity | null>;

  getSearchUsers(search: string): Promise<UserEntity[] | null>;

  getNumUsers(): Promise<string | null>;

  listUser(): Promise<UserEntity[] | null>;

  listUserPag(numPage: string): Promise<UserEntity[] | null>;

  loginUser(data: AuthEntity): Promise<string[2] | null>;

  loginFrontEndUser(data: AuthEntity): Promise<string[2] | null>;

  updateUser(uuid: string, data: UserEntity): Promise<UserEntity | null>;

  deleteUser(uuid: string): Promise<UserEntity | null>;
}
