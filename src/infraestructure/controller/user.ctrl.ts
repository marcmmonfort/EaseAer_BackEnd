import { uploadUser } from "./multer/userMulter.ctrl";
import { UserUseCase } from "../../application/userUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { UserAuthEntity, UserEntity } from "../../domain/user/user.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { UserAuthValue, UserValue } from "../../domain/user/user.value";
import { isImageFile } from "../utils/isImage.handle";

export class UserController {
  emailService: EmailService;
  constructor(private userUseCase: UserUseCase) {
    this.emailService = new NodemailerEmailService();
    this.registerUserCtrl = this.registerUserCtrl.bind(this);
    this.getUserByIdCtrl = this.getUserByIdCtrl.bind(this);
    this.getUserByEmailCtrl = this.getUserByEmailCtrl.bind(this);
    this.getSearchUsersCtrl = this.getSearchUsersCtrl.bind(this);
    this.getNumUsersCtrl = this.getNumUsersCtrl.bind(this);
    this.listUserCtrl = this.listUserCtrl.bind(this);
    this.listUserPagCtrl = this.listUserPagCtrl.bind(this);
    this.loginUserCtrl = this.loginUserCtrl.bind(this);
    this.loginFrontEndUserCtrl = this.loginFrontEndUserCtrl.bind(this);
    this.updateUserCtrl = this.updateUserCtrl.bind(this);
    this.deleteUserCtrl = this.deleteUserCtrl.bind(this);
  }

  // CASE 1: registerUser(data: UserAuthEntity) ---> UserAuthEntity
  public async registerUserCtrl(req: Request, res: Response) {
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
      deletedUser,
    } = req.body;

    try {
      if ("1"=="1") { // req.file
        console.log("Register, STEP A");
        if ("0"=="0") { // isImageFile(req.file)
          console.log("Register, STEP B");
          /* CLOUDINARY INSTRUCTIONS:
          const uploadRes = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: "photoUser",
          });
          */

          if ("2"=="2") { // uploadRes
            console.log("Register, STEP C");
            const user = new UserAuthValue({
              uuid: uuid,
              appUser: appUser,
              nameUser: nameUser,
              surnameUser: surnameUser,
              mailUser: mailUser,
              passwordUser: passwordUser,
              photoUser: "URL Here", // uploadRes.secure_url
              birthdateUser: birthdateUser,
              genderUser: genderUser,
              descriptionUser: descriptionUser,
              roleUser: roleUser,
              privacyUser: privacyUser,
              recordGameUser: recordGameUser,
              flightsUser: flightsUser,
              deletedUser: deletedUser
            });
            const response = await this.userUseCase.registerUser(user);
            res.send(response);
          }
        } else {
          res.send("NOT_SENDING_AN_IMAGE");
        }
      } else {
        const responseUser = await this.userUseCase.registerUser(req.body);
        if (responseUser === "ALREADY_USER") {
          res.status(403);
          res.send(responseUser);
          console.log(res.status);
        } else {
          res.send(responseUser);
        }
      }
    } catch (error) {
      console.log("RegisterUserCtrl Not Working");
    }
  }

  // CASE 2: getUserById(uuid: string) ---> UserEntity
  public async getUserByIdCtrl({ params }: Request, res: Response) {
    const { uuid = "" } = params;
    console.log(params);
    const response = await this.userUseCase.getUserById(`${uuid}`);
    res.send(response);
  }

  // CASE 3: getUserByEmail(email: string) ---> UserEntity
  public async getUserByEmailCtrl({ params }: Request, res: Response) {
    const { mailUser = "" } = params;
    console.log(params);
    const response = await this.userUseCase.getUserByEmail(`${mailUser}`);
    res.send(response);
  }

  // CASE 4: getSearchUsers(search: string) ---> UserEntity[]
  public async getSearchUsersCtrl({ params }: Request, res: Response) {
    const { search = "" } = params;
    const response = await this.userUseCase.getSearchUsers(search);
    const data = response ? response : "NOT_FOUND";
    res.send(data);
  }

  // CASE 5: getNumUsers() ---> string
  public async getNumUsersCtrl(req: Request, res: Response) {
    const response = await this.userUseCase.getNumUsers();
    const data = response ? response : "NOT_FOUND";
    res.send(data);
  }

  // CASE 6: listUser() ---> UserEntity[]
  public async listUserCtrl(req: Request, res: Response) {
    const response = await this.userUseCase.listUser();
    console.log(response);
    res.send(response);
  }

  // CASE 7: listUserPag(numPage: string) ---> UserEntity[]
  public async listUserPagCtrl({ params }: Request, res: Response) {
    const { numPage = "" } = params;
    const response = await this.userUseCase.listUserPag(`${numPage}`);
    res.send(response);
  }

  // CASE 8: loginUser(data: AuthEntity) ---> string[2]
  public async loginUserCtrl({ body }: Request, res: Response) {
    const responseUser = await this.userUseCase.loginUser(body);

    if (responseUser === "PASSWORD_INCORRECT") {
      res.status(403);
      res.send(responseUser);
      console.log(res.status);
    } else if (responseUser === "USER_NOT_ADMIN") {
      res.status(406);
      res.send(responseUser);
    } else if (responseUser === "NOT_FOUND_USER") {
      res.status(404);
      res.send(responseUser);
      console.log("not found user " + res.status);
    } else {
      res.send(responseUser);
    }
  }

  // CASE 9: loginFrontEndUser(data: AuthEntity) ---> string[2]
  public async loginFrontEndUserCtrl({ body }: Request, res: Response) {
    const responseUser = await this.userUseCase.loginFrontEndUser(body);

    if (responseUser === "PASSWORD_INCORRECT") {
      res.status(403);
      res.send(responseUser);
      console.log(res.status);
    } else if (responseUser === "NOT_FOUND_USER") {
      res.status(404);
      res.send(responseUser);
      console.log("not found user " + res.status);
    } else {
      res.send(responseUser);
    }
  }

  // CASE 10: updateUser(uuid: string, data: UserEntity) ---> UserEntity
  public async updateUserCtrl(req: Request, res: Response) {
    const {
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
    } = req.body;
    try {
      if ("1"=="1") { // req.file
        if ("0"=="0") { // isImageFile(req.file)
          // console.log("FILE_YES");
          const userA = await this.userUseCase.getUserById(uuid);
          /*
          const uploadResUp = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: "photoUser",
          });
          
          const delUp = await cloudinary.uploader.destroy(userA.photoUser);
          */
          if ("2"=="2") { // uploadResUp
            const user = new UserValue({
              uuid: uuid,
              appUser: appUser,
              nameUser: nameUser,
              surnameUser: surnameUser,
              mailUser: mailUser,
              photoUser: photoUser, // uploadResUp.secure_url,
              birthdateUser: birthdateUser,
              genderUser: genderUser,
              descriptionUser: descriptionUser,
              roleUser: roleUser,
              privacyUser: privacyUser,
              recordGameUser: recordGameUser,
              flightsUser: flightsUser,
              deletedUser: deletedUser,
            });
            const response = await this.userUseCase.updateUser(uuid, user);
            res.send(response);
          }
        } else {
          res.send("NOT_SENDING_IMAGE");
        }
      } else {
        console.log("How");
        const response = await this.userUseCase.updateUser(uuid, req.body);
        console.log(response);
        res.send(response);
      }
    } catch (error) {
      console.log("UpdateUserCtrl Not Working");
    }
  }

  // CASE 11: deleteUser(uuid: string) ---> UserEntity
  public async deleteUserCtrl({ params }: Request, res: Response) {
    const { uuid = "" } = params;
    const response = await this.userUseCase.deleteUser(`${uuid}`);
    res.send(response);
  }
}
