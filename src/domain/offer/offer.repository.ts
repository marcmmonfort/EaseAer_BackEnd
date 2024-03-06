import { OfferEntity } from "./offer.entity";

export interface OfferRepository {

    createOffer(data: OfferEntity): Promise<OfferEntity | null | string>;

    getOfferById(uuid: string): Promise<OfferEntity | null>;

    getOffersByProduct(product: string): Promise<OfferEntity[] | null>;

    getOffersByShop(shop: string): Promise<OfferEntity[] | null>;

    listOffer(): Promise<OfferEntity[] | null>;

    updateOffer(uuid: string, data: OfferEntity): Promise<OfferEntity | null>;

    deleteOffer(uuid: string): Promise<OfferEntity | null>;

    // CASE 1: createOffer(data: OfferEntity): Promise<OfferEntity | null | string>;

    // CASE 2: getOfferById(uuid: string): Promise<OfferEntity | null>;

    // CASE 3: getOffersByProduct(product: string): Promise<OfferEntity[] | null>;

    // CASE 4: getOffersByShop(shop: string): Promise<OfferEntity[] | null>;

    // CASE 5: listOffer(): Promise<OfferEntity[] | null>;

    // CASE 6: updateOffer(uuid: string, data: OfferEntity): Promise<OfferEntity | null>;

    // CASE 7: deleteOffer(uuid: string): Promise<OfferEntity | null>;

}
