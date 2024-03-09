import { CardRepository } from "../domain/card/card.repository";
import { CardValue } from "../domain/card/card.value";
import { NotFoundError } from "./notFoundError";

export class CardUseCase {
    constructor(private readonly cardRepository: CardRepository) {}

    // CASE 1: createCard(data: CardEntity): Promise<CardEntity | null | string>;
    public createCard = async ({
        uuid,
        idUserCard,
        numberCard,
        pointsCard,
        levelCard,
        deletedCard
    }: {
        uuid: string;
        idUserCard: string;
        numberCard: Number;
        pointsCard: Number;
        levelCard: "rookie" | "explorer" | "captain" | "elite";
        deletedCard: boolean;
    }) => {
        const cardValue = new CardValue({
            uuid,
            idUserCard,
            numberCard,
            pointsCard,
            levelCard,
            deletedCard
        });
        const user = await this.cardRepository.createCard(cardValue);
        if (!user) {
            throw new NotFoundError("CANNOT_CREATE_CARD");
        }
        return user;
    };
    
    // CASE 2: getCardById(uuid: string): Promise<CardEntity | null>;
    public getCardById = async (uuid: string) => {
        const card = await this.cardRepository.getCardById(uuid);
        if (!card) {
            throw new NotFoundError("CANNOT_GET_CARD_BY_ID");
        }
        return card;
    };
    
    // CASE 3: getCardByUser(user: string): Promise<CardEntity | null>;
    public getCardByUser = async (user: string) => {
        const card = await this.cardRepository.getCardByUser(user);
        if (!card) {
            throw new NotFoundError("CANNOT_GET_CARD_BY_USER");
        }
        return user;
    };
    
    // CASE 4: listCards(): Promise<CardEntity[] | null>;
    public listCards = async () => {
        const listCards = await this.cardRepository.listCards();
        if (!listCards) {
            throw new NotFoundError("CANNOT_LIST_CARDS");
        }
        return listCards;
    };
    
    // CASE 5: listCardsPag(numPage: string): Promise<CardEntity[] | null>;
    public listCardsPag = async (numPage: string) => {
        const listCards = await this.cardRepository.listCardsPag(numPage);
        return listCards;
    };
    
    // CASE 6: updateCard(uuid: string, data: CardEntity): Promise<CardEntity | null>;
    public updateCard = async (
        uuid: string,
        {
            idUserCard,
            numberCard,
            pointsCard,
            levelCard,
            deletedCard
        }: {
            uuid: string;
            idUserCard: string;
            numberCard: Number;
            pointsCard: Number;
            levelCard: "rookie" | "explorer" | "captain" | "elite";
            deletedCard: boolean;
        }
    ) => {
        const cardValue: CardValue = new CardValue({
            uuid,
            idUserCard,
            numberCard,
            pointsCard,
            levelCard,
            deletedCard
        });
        const card = await this.cardRepository.updateCard(uuid, cardValue);
        if (!card) {
            throw new NotFoundError("CARD_TO_UPDATE_NOT_FOUND");
        }
        return card;
    };
    
    // CASE 7: deleteCard(uuid: string): Promise<CardEntity | null>;
    public deleteCard = async (uuid: string) => {
        const card = await this.cardRepository.deleteCard(uuid);
        return card;
    };

    // CASE 8: getNumCards(): Promise<string | null>;
    public getNumCards = async () => {
        const numCards = await this.cardRepository.getNumCards();
        return numCards;
    };
  
}