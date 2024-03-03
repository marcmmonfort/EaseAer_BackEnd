import { Router } from "express";
import { UserUseCase } from "../../application/userUseCase";
import { UserController } from "../controller/user.ctrl";
import { MongoUserRepository } from "../repository/mongoUser.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeUser = Router();

const userRepo = new MongoUserRepository();
const userUseCase = new UserUseCase(userRepo);
const userCtrl = new UserController(userUseCase);

routeUser.post("/user/register", userCtrl.registerUserCtrl);
routeUser.get("/user/:uuid", checkJwt, userCtrl.getUserByIdCtrl);
routeUser.get("/user/google/check/:mailUser", userCtrl.getUserByEmailCtrl),
routeUser.get("/user/search/:search", checkJwt, userCtrl.getSearchUsersCtrl);
routeUser.get("/user/all/count/docs", checkJwt, userCtrl.getNumUsersCtrl);
routeUser.get("/users/all", checkJwt, userCtrl.listUserCtrl);
routeUser.get("/user/all/:numPage", checkJwt, userCtrl.listUserPagCtrl);
routeUser.post("/user/login", userCtrl.loginUserCtrl);
routeUser.post("/user/loginfrontend", userCtrl.loginFrontEndUserCtrl);
routeUser.put("/user/:uuid", checkJwt, userCtrl.updateUserCtrl);
routeUser.delete("/user/:uuid", checkJwt, userCtrl.deleteUserCtrl);

export default routeUser;
