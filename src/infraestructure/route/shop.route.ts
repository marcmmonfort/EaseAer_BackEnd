import { Router } from "express";
import { ShopUseCase } from "../../application/shopUseCase";
import { ShopController } from "../controller/shop.ctrl";
import { MongoShopRepository } from "../repository/mongoShop.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeShop = Router();

const shopRepo = new MongoShopRepository();
const shopUseCase = new ShopUseCase(shopRepo);
const shopCtrl = new ShopController(shopUseCase);

// CASE 1: createShop(data: ShopEntity): Promise<ShopEntity | null | string>;
routeShop.post("/shop/create", shopCtrl.createShopCtrl);

// CASE 2: getShopById(uuid: string): Promise<ShopEntity | null>;
routeShop.get("/shop/getbyid/:uuid", checkJwt, shopCtrl.getShopByIdCtrl);

// CASE 3: getShopByLocation(location: string): Promise<ShopEntity | null>;
routeShop.get("/shop/getbylocation/:location", checkJwt, shopCtrl.getShopByLocationCtrl);

// CASE 4: listShop(): Promise<ShopEntity[] | null>;
routeShop.get("/shop/all", checkJwt, shopCtrl.listShopCtrl);

// CASE 5: listOpenedShops(time: Date): Promise<ShopEntity[] | null>;
routeShop.get("/shop/opened/:time", checkJwt, shopCtrl.listOpenedShopsCtrl);

// CASE 6: updateShop(uuid: string, data: ShopEntity): Promise<ShopEntity | null>;
routeShop.put("/shop/update/:uuid", checkJwt, shopCtrl.updateShopCtrl);

// CASE 7: deleteShop(uuid: string): Promise<ShopEntity | null>;
routeShop.delete("/shop/delete/:uuid", checkJwt, shopCtrl.deleteShopCtrl);

export default routeShop;
