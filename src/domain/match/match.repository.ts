import { MatchEntity } from "./match.entity";

export interface MatchRepository {

    createMatch(data: MatchEntity): Promise<MatchEntity | null | string>;

    getMatchById(uuid: string): Promise<MatchEntity | null>;

    getMyMatches(idUser: string): Promise<MatchEntity[] | null>;

    getTotalNumMatches(): Promise<string | null>;

    updateMatch(uuid: string, data: MatchEntity): Promise<MatchEntity | null>;

    deleteMatch(uuid: string): Promise<MatchEntity | null>;

    // CASE 1: createMatch(data: MatchEntity): Promise<MatchEntity | null | string>;

    // CASE 2: getMatchById(uuid: string): Promise<MatchEntity | null>;

    // CASE 3: getMyMatches(idUser: string): Promise<MatchEntity[] | null>;

    // CASE 4: getTotalNumMatches(): Promise<string | null>;

    // CASE 5: updateMatch(uuid: string, data: MatchEntity): Promise<MatchEntity | null>;

    // CASE 6: deleteMatch(uuid: string): Promise<MatchEntity | null>;

}
