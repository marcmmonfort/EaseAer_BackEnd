import { OfferRepository } from "../domain/offer/offer.repository";
import { OfferValue } from "../domain/offer/offer.value";
import { NotFoundError } from "./notFoundError";

export class OfferUseCase {
    constructor(private readonly offerRepository: OfferRepository) {}

    // CREATE 1: createOffer(data: OfferEntity): Promise<OfferEntity | null | string>;
    public createOffer = async ({
        uuid,
        idShopOffer,
        priceOffer,
        idProductOffer,
        dateEndOffer,
    }: {
        uuid: string;
        idShopOffer: string;
        priceOffer: Number;
        idProductOffer: string;
        dateEndOffer: Date;
    }) => {
        const offerValue = new OfferValue({
            uuid,
            idShopOffer,
            priceOffer,
            idProductOffer,
            dateEndOffer,
        });
        const user = await this.offerRepository.createOffer(offerValue);
        if (!user) {
            throw new NotFoundError("CANNOT_CREATE_OFFER");
        }
        return user;
    };

    // CREATE 2: getOfferById(uuid: string): Promise<OfferEntity | null>;
    public getOfferById = async (uuid: string) => {
        const offer = await this.offerRepository.getOfferById(uuid);
        if (!offer) {
            throw new NotFoundError("CANNOT_GET_OFFER_BY_ID");
        }
        return offer;
    };

    // CREATE 3: getOffersByProduct(product: string): Promise<OfferEntity[] | null>;
    public getOffersByProduct = async (product: string) => {
        const offers = await this.offerRepository.getOffersByProduct(product);
        if (!offers) {
            throw new NotFoundError("CANNOT_GET_OFFERS_BY_PRODUCT");
        }
        return offers;
    };

    // CREATE 4: getOffersByShop(shop: string): Promise<OfferEntity[] | null>;
    public getOffersByShop = async (shop: string) => {
        const offers = await this.offerRepository.getOffersByShop(shop);
        if (!offers) {
            throw new NotFoundError("CANNOT_GET_OFFERS_BY_SHOP");
        }
        return offers;
    };

    // CREATE 5: listOffer(): Promise<OfferEntity[] | null>;
    public listOffer = async () => {
        const listOffers = await this.offerRepository.listOffer();
        if (!listOffers) {
            throw new NotFoundError("CANNOT_LIST_OFFERS");
        }
        return listOffers;
    };

    // CREATE 6: updateOffer(uuid: string, data: OfferEntity): Promise<OfferEntity | null>;
    public updateOffer = async (
        uuid: string,
        {
            idShopOffer,
            priceOffer,
            idProductOffer,
            dateEndOffer,
        }: {
            uuid: string;
            idShopOffer: string;
            priceOffer: Number;
            idProductOffer: string;
            dateEndOffer: Date;
        }
    ) => {
        const offerValue: OfferValue = new OfferValue({
            uuid,
            idShopOffer,
            priceOffer,
            idProductOffer,
            dateEndOffer,
        });
        const offer = await this.offerRepository.updateOffer(uuid, offerValue);
        if (!offer) {
            throw new NotFoundError("OFFER_TO_UPDATE_NOT_FOUND");
        }
        return offer;
    };

    // CREATE 7: deleteOffer(uuid: string): Promise<OfferEntity | null>;
    public deleteOffer = async (uuid: string) => {
        const offer = await this.offerRepository.deleteOffer(uuid);
        return offer;
    };
  
}
