import { Types } from "mongoose";
import { ShopEntity } from "../../domain/shop/shop.entity";
import { ShopRepository } from "../../domain/shop/shop.repository";
import ShopModel from "../model/shop.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoShopRepository implements ShopRepository {

    // CASE 1: createShop(data: ShopEntity): Promise<ShopEntity | null | string>;
    async createShop(data: ShopEntity): Promise<any> {
        const {
            uuid,
            idCompanyShop,
            idLocationShop,
            descriptionShop,
            webShop,
            scheduleShop,
            deletedShop
        } = data;
        const checkIs = await ShopModel.findOne({ idLocationShop });
        if (checkIs) return "ALREADY_SHOP_IN_LOCATION";
        const newData = {
            uuid,
            idCompanyShop,
            idLocationShop,
            descriptionShop,
            webShop,
            scheduleShop,
            deletedShop
        };
        const newShop = await ShopModel.create(newData);
        const updatedShop = {
            uuid: newShop._id,
            idCompanyShop,
            idLocationShop,
            descriptionShop,
            webShop,
            scheduleShop,
            deletedShop
        };
        const response = await ShopModel.findOneAndUpdate(
            { _id: updatedShop.uuid },
            updatedShop,
            { new: true }
        );
        return response;
    }


    // CASE 2: getShopById(uuid: string): Promise<ShopEntity | null>;
    async getShopById(uuid: string): Promise<any> {
        const response = await ShopModel.findOne({ _id: uuid });
        return response;
    }

    // CASE 3: getShopByLocation(location: string): Promise<ShopEntity | null>;
    async getShopByLocation(location: string): Promise<any> {
        const response = await ShopModel.findOne({ idLocationShop: location });
        if (!response) {
            return "NOT_FOUND_SHOP_IN_LOCATION";
        }
        return response;
    }

    // CASE 4: listShop(): Promise<ShopEntity[] | null>;
    async listShop(): Promise<any> {
        const response = await ShopModel.find();
        return response;
    }

    // CASE 5: listOpenedShops(time: Date): Promise<ShopEntity[] | null>;
    async listOpenedShops(time: Date): Promise<any> {
        const dayOfWeek = time.getDay(); // 0 Domingo, 1 Lunes, 2 Martes, 3 Miércoles, 4 Jueves, 5 Viernes, 6 Sábado
        const searchedHour = time.getHours();
        const searchedMinutes = time.getMinutes();

        // Obtenemos todas las tiendas.
        const listAllShops = await ShopModel.find();

        if (!listAllShops) {
            return "NOT_FOUND_OPENED_SHOPS";
        } else {
            const openedShops: ShopEntity[] = [];
            
            for (const shop of listAllShops) {
                const shopObject = shop.toObject();

                const scheduleArray = shop.scheduleShop.split('|');
                const currentSchedule = scheduleArray[dayOfWeek];
                
                const openingHours = currentSchedule.split('_')[0];
                const closingHours = currentSchedule.split('_')[1];

                const [openHour, openMinute] = openingHours.split(':').map(Number);
                const [closeHour, closeMinute] = closingHours.split(':').map(Number);

                const openingTime = openHour * 60 + openMinute;
                const closingTime = closeHour * 60 + closeMinute;

                const currentTime = searchedHour * 60 + searchedMinutes;

                if (currentTime >= openingTime && currentTime <= closingTime) {
                    openedShops.push(shopObject as unknown as ShopEntity); // Revisar el UNKNOWN.
                }
            }

            return openedShops;
        }
    }

    // CASE 6: updateShop(uuid: string, data: ShopEntity): Promise<ShopEntity | null>;
    async updateShop(uuid: string, data: ShopEntity): Promise<any> {
        const response = await ShopModel.findOneAndUpdate({ _id: uuid }, data, {new: true});
        return response;
    }

    // CASE 7: deleteShop(uuid: string): Promise<ShopEntity | null>;
    async deleteShop(uuid: string): Promise<any> {
        const response = await ShopModel.findOneAndRemove({ _id: uuid });
        return response;
    }

}
