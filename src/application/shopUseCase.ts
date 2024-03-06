import { ShopRepository } from "../domain/shop/shop.repository";
import { ShopValue } from "../domain/shop/shop.value";
import { NotFoundError } from "./notFoundError";

export class ShopUseCase {
    constructor(private readonly shopRepository: ShopRepository) {}

    // CASE 1: createShop(data: ShopEntity): Promise<ShopEntity | null | string>;
    public createShop = async ({
        uuid,
        idCompanyShop,
        idLocationShop,
        descriptionShop,
        webShop,
        scheduleShop,
        deletedShop
    }: {
        uuid: string;
        idCompanyShop: string;
        idLocationShop: string;
        descriptionShop: string;
        webShop: string;
        scheduleShop: string;
        deletedShop: boolean;
    }) => {
        const shopValue = new ShopValue({
            uuid,
            idCompanyShop,
            idLocationShop,
            descriptionShop,
            webShop,
            scheduleShop,
            deletedShop
        });
        const newShop = await this.shopRepository.createShop(shopValue);
        if (!newShop) {
            throw new NotFoundError("CANNOT_REGISTER_SHOP");
        }
        return newShop;
    };

    // CASE 2: getShopById(uuid: string): Promise<ShopEntity | null>;
    public getShopById = async (uuid: string) => {
        const shop = await this.shopRepository.getShopById(uuid);
        if (!shop) {
        throw new NotFoundError("CANNOT_GET_SHOP_BY_ID");
        }
        return shop;
    };

    // CASE 3: getShopByLocation(location: string): Promise<ShopEntity | null>;
    public getShopByLocation = async (location: string) => {
        const shop = await this.shopRepository.getShopByLocation(location);
        if (!shop) {
        throw new NotFoundError("CANNOT_GET_SHOP_BY_LOCATION");
        }
        return shop;
    };

    // CASE 4: listShop(): Promise<ShopEntity[] | null>;
    public listShop = async () => {
        const listShops = await this.shopRepository.listShop();
        if (!listShops) {
        throw new NotFoundError("CANNOT_LIST_SHOPS");
        }
        return listShops;
    };

    // CASE 5: listOpenedShops(time: Date): Promise<ShopEntity[] | null>;
    public listOpenedShops = async (time: Date) => {
        const listOpenedShops = await this.shopRepository.listOpenedShops(time);
        if (!listOpenedShops) {
        throw new NotFoundError("CANNOT_LIST_OPENED_SHOPS");
        }
        return listOpenedShops;
    };

    // CASE 6: updateShop(uuid: string, data: ShopEntity): Promise<ShopEntity | null>;
    public updateShop = async (
        uuid: string,
        {
            idCompanyShop,
            idLocationShop,
            descriptionShop,
            webShop,
            scheduleShop,
            deletedShop
        }: {
            idCompanyShop: string;
            idLocationShop: string;
            descriptionShop: string;
            webShop: string;
            scheduleShop: string;
            deletedShop: boolean;
        }
    ) => {
        const shopValue: ShopValue = new ShopValue({
            uuid,
            idCompanyShop,
            idLocationShop,
            descriptionShop,
            webShop,
            scheduleShop,
            deletedShop
        });
        const updatedShop = await this.shopRepository.updateShop(uuid, shopValue);
        if (!updatedShop) {
            throw new NotFoundError("SHOP_TO_UPDATE_NOT_FOUND");
        }
        return updatedShop;
    };

    // CASE 7: deleteShop(uuid: string): Promise<ShopEntity | null>;
    public deleteShop = async (uuid: string) => {
        const shop = await this.shopRepository.deleteShop(uuid);
        return shop;
    };
  
}
