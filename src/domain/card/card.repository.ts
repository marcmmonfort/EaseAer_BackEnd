import { CardEntity } from "./card.entity";

export interface CardRepository {

    createCard(data: CardEntity): Promise<CardEntity | null | string>;

    getCardById(uuid: string): Promise<CardEntity | null>;

    getCardByUser(user: string): Promise<CardEntity | null>;

    listCards(): Promise<CardEntity[] | null>;

    listCardsPag(numPage: string): Promise<CardEntity[] | null>;

    updateCard(uuid: string, data: CardEntity): Promise<CardEntity | null>;

    deleteCard(uuid: string): Promise<CardEntity | null>;

    getNumCards(): Promise<string | null>;

    // CASE 1: createCard(data: CardEntity): Promise<CardEntity | null | string>;
    
    // CASE 2: getCardById(uuid: string): Promise<CardEntity | null>;
    
    // CASE 3: getCardByUser(user: string): Promise<CardEntity | null>;
    
    // CASE 4: listCards(): Promise<CardEntity[] | null>;
    
    // CASE 5: listCardsPag(numPage: string): Promise<CardEntity[] | null>;
    
    // CASE 6: updateCard(uuid: string, data: CardEntity): Promise<CardEntity | null>;
    
    // CASE 7: deleteCard(uuid: string): Promise<CardEntity | null>;
    
    // CASE 8: getNumCards(): Promise<string | null>;

}
