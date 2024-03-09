import { PrizeRepository } from "../domain/prize/prize.repository";
import { PrizeValue } from "../domain/prize/prize.value";
import { NotFoundError } from "./notFoundError";

export class PrizeUseCase {
    constructor(private readonly prizeRepository: PrizeRepository) {}

    // CREATE 1: createPrize(data: PrizeEntity): Promise<PrizeEntity | null | string>;
    public createPrize = async ({
        uuid,
        pointsPrize,
        namePrize,
        descriptionPrize,
        idShopPrize,
        dateEndPrize,
        codePrize,
        deletedPrize
    }: {
        uuid: string;
        pointsPrize: Number;
        namePrize: string;
        descriptionPrize: string;
        idShopPrize: string;
        dateEndPrize: Date;
        codePrize: string;
        deletedPrize: boolean;
    }) => {
        const prizeValue = new PrizeValue({
            uuid,
            pointsPrize,
            namePrize,
            descriptionPrize,
            idShopPrize,
            dateEndPrize,
            codePrize,
            deletedPrize
        });
        const prize = await this.prizeRepository.createPrize(prizeValue);
        if (!prize) {
            throw new NotFoundError("CANNOT_CREATE_PRIZE");
        }
        return prize;
    };

    // CREATE 2: getPrizeById(uuid: string): Promise<PrizeEntity | null>;
    public getPrizeById = async (uuid: string) => {
        const prize = await this.prizeRepository.getPrizeById(uuid);
        if (!prize) {
            new NotFoundError("CANNOT_GET_PRIZE_BY_ID");
        }
        return prize;
    };

    // CREATE 3: getPrizesAvailable(points: Number): Promise<PrizeEntity[] | null>;
    public getPrizesAvailable = async (points: Number) => {
        const prizes = await this.prizeRepository.getPrizesAvailable(points);
        if (!prizes) {
            new NotFoundError("CANNOT_GET_PRIZES_AVAILABLE");
        }
        return prizes;
    };

    // CREATE 4: getPrizesByShop(shop: string): Promise<PrizeEntity[] | null>;
    public getPrizesByShop = async (shop: string) => {
        const prizes = await this.prizeRepository.getPrizesByShop(shop);
        if (!prizes) {
            throw new NotFoundError("CANNOT_GET_PRIZES_BY_SHOP");
        }
        return prizes;
    };

    // CREATE 5: listPrizes(): Promise<PrizeEntity[] | null>;
    public listPrizes = async () => {
        const listPrizes = await this.prizeRepository.listPrizes();
        if (!listPrizes) {
            throw new NotFoundError("CANNOT_LIST_PRIZES");
        }
        return listPrizes;
    };

    // CREATE 6: getNumPrizes(): Promise<string | null>;
    public getNumPrizes = async () => {
        const numPrizes = await this.prizeRepository.getNumPrizes();
        return numPrizes;
    };

    // CREATE 7: updatePrize(uuid: string, data: PrizeEntity): Promise<PrizeEntity | null>;
    public updatePrize = async (
        uuid: string,
        {
            pointsPrize,
            namePrize,
            descriptionPrize,
            idShopPrize,
            dateEndPrize,
            codePrize,
            deletedPrize
        }: {
            pointsPrize: Number;
            namePrize: string;
            descriptionPrize: string;
            idShopPrize: string; // idShop
            dateEndPrize: Date;
            codePrize: string;
            deletedPrize: boolean;
        }) => {
        const prizeValue: PrizeValue = new PrizeValue({
            uuid,
            pointsPrize,
            namePrize,
            descriptionPrize,
            idShopPrize,
            dateEndPrize,
            codePrize,
            deletedPrize
        });
        const prize = await this.prizeRepository.updatePrize(uuid, prizeValue);
        if (!prize) {
            throw new NotFoundError("PRIZE_TO_UPDATE_NOT_FOUND");
        }
        return prize;
    };

    // CREATE 8: deletePrize(uuid: string): Promise<PrizeEntity | null>;
    public deletePrize = async (uuid: string) => {
        const user = await this.prizeRepository.deletePrize(uuid);
        return user;
    };
  
}