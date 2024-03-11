import { MatchRepository } from "../domain/match/match.repository";
import { MatchValue } from "../domain/match/match.value";
import { NotFoundError } from "./notFoundError";

export class MatchUseCase {
    constructor(private readonly matchRepository: MatchRepository) {}

    // CASE 1: createMatch(data: MatchEntity): Promise<MatchEntity | null | string>;
    public createMatch = async ({
        uuid,
        idUserAMatch,
        idUserBMatch,
        dateMatch,
        showMatch,
        deletedMatch
    }: {
        uuid: string;
        idUserAMatch: string;
        idUserBMatch?: string;
        dateMatch?: Date;
        showMatch: boolean;
        deletedMatch: boolean;
    }) => {
        const matchValue = new MatchValue({
            uuid,
            idUserAMatch,
            idUserBMatch,
            dateMatch,
            showMatch,
            deletedMatch
        });
        const match = await this.matchRepository.createMatch(matchValue);
        if (!match) {
            throw new NotFoundError("CANNOT_CREATE_MATCH");
        }
        return match;
    };

    // CASE 2: getMatchById(uuid: string): Promise<MatchEntity | null>;
    public getMatchById = async (uuid: string) => {
        const match = await this.matchRepository.getMatchById(uuid);
        if (!match) {
            throw new NotFoundError("CANNOT_GET_MATCH_BY_ID");
        }
        return match;
    };


    // CASE 3: getMyMatches(idUser: string): Promise<MatchEntity[] | null>;
    public getMyMatches = async (idUser: string) => {
        const matches = await this.matchRepository.getMyMatches(idUser);
        if (!matches) {
            throw new NotFoundError("CANNOT_GET_MY_MATCHES");
        }
        return matches;
    };

    // CASE 4: getTotalNumMatches(): Promise<string | null>;
    public getTotalNumMatches = async () => {
        const totalNumMatches = await this.matchRepository.getTotalNumMatches();
        return totalNumMatches;
    };

    // CASE 5: updateMatch(uuid: string, data: MatchEntity): Promise<MatchEntity | null>;
    public updateMatch = async (
        uuid: string,
        {
            idUserAMatch,
            idUserBMatch,
            dateMatch,
            showMatch,
            deletedMatch
        }: {
            idUserAMatch: string;
            idUserBMatch?: string;
            dateMatch?: Date;
            showMatch: boolean;
            deletedMatch: boolean;
        }
    ) => {
        const matchValue: MatchValue = new MatchValue({
            uuid,
            idUserAMatch,
            idUserBMatch,
            dateMatch,
            showMatch,
            deletedMatch
        });
        const match = await this.matchRepository.updateMatch(uuid, matchValue);
        if (!match) {
            throw new NotFoundError("MATCH_TO_UPDATE_NOT_FOUND");
        }
        return match;
    };

    // CASE 6: deleteMatch(uuid: string): Promise<MatchEntity | null>;
    public deleteMatch = async (uuid: string) => {
        const match = await this.matchRepository.deleteMatch(uuid);
        return match;
    };
    
}