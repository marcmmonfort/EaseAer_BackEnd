import { ShopEntity } from "./shop.entity";

export interface ShopRepository {

    createShop(data: ShopEntity): Promise<ShopEntity | null | string>;

    getShopById(uuid: string): Promise<ShopEntity | null>;

    getShopByLocation(location: string): Promise<ShopEntity | null>;

    listShop(): Promise<ShopEntity[] | null>;

    listOpenedShops(time: Date): Promise<ShopEntity[] | null>;

    updateShop(uuid: string, data: ShopEntity): Promise<ShopEntity | null>;

    deleteShop(uuid: string): Promise<ShopEntity | null>;

    // CASE 1: createShop(data: ShopEntity): Promise<ShopEntity | null | string>;

    // CASE 2: getShopById(uuid: string): Promise<ShopEntity | null>;

    // CASE 3: getShopByLocation(location: string): Promise<ShopEntity | null>;

    // CASE 4: listShop(): Promise<ShopEntity[] | null>;

    // CASE 5: listOpenedShops(time: Date): Promise<ShopEntity[] | null>;

    // CASE 6: updateShop(uuid: string, data: ShopEntity): Promise<ShopEntity | null>;

    // CASE 7: deleteShop(uuid: string): Promise<ShopEntity | null>;

}
