import { PrizeEntity } from "./prize.entity";

export interface PrizeRepository {

    createPrize(data: PrizeEntity): Promise<PrizeEntity | null | string>;

    getPrizeById(uuid: string): Promise<PrizeEntity | null>;

    getPrizesAvailable(points: Number): Promise<PrizeEntity[] | null>;

    getPrizesByShop(shop: string): Promise<PrizeEntity[] | null>;

    listPrizes(): Promise<PrizeEntity[] | null>;

    getNumPrizes(): Promise<string | null>;

    updatePrize(uuid: string, data: PrizeEntity): Promise<PrizeEntity | null>;

    deletePrize(uuid: string): Promise<PrizeEntity | null>;

    // CREATE 1: createPrize(data: PrizeEntity): Promise<PrizeEntity | null | string>;

    // CREATE 2: getPrizeById(uuid: string): Promise<PrizeEntity | null>;

    // CREATE 3: getPrizesAvailable(points: Number): Promise<PrizeEntity[] | null>;

    // CREATE 4: getPrizesByShop(shop: string): Promise<PrizeEntity[] | null>;

    // CREATE 5: listPrizes(): Promise<PrizeEntity[] | null>;

    // CREATE 6: getNumPrizes(): Promise<string | null>;

    // CREATE 7: updatePrize(uuid: string, data: PrizeEntity): Promise<PrizeEntity | null>;

    // CREATE 8: deletePrize(uuid: string): Promise<PrizeEntity | null>;

}
