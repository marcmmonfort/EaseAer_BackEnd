import { Types } from "mongoose";
import { MatchEntity } from "../../domain/match/match.entity";
import { MatchRepository } from "../../domain/match/match.repository";
import MatchModel from "../model/match.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoMatchRepository implements MatchRepository {

    // CASE 1: createMatch(data: MatchEntity): Promise<MatchEntity | null | string>;
    async createMatch(data: MatchEntity): Promise<any> {
        const {
            uuid,
            idUserAMatch,
            idUserBMatch,
            dateMatch,
            showMatch,
            deletedMatch
        } = data;
        const checkIs = await MatchModel.findOne({ uuid });
        if (checkIs) return "ALREADY_MATCH";
        const user = await MatchModel.create(data);
        const encryptedUpdate = {
            uuid: user._id,
            idUserAMatch,
            idUserBMatch,
            dateMatch,
            showMatch,
            deletedMatch
        };
        const response = await MatchModel.findOneAndUpdate(
            { _id: encryptedUpdate.uuid },
            encryptedUpdate,
            { new: true }
        );
        return response;
    }

    // CASE 2: getMatchById(uuid: string): Promise<MatchEntity | null>;
    async getMatchById(uuid: string): Promise<any> {
        const response = await MatchModel.findOne({ _id: uuid });
        return response;
    }

    // CASE 3: getMyMatches(idUser: string): Promise<MatchEntity[] | null>;
    async getMyMatches(idUser: string): Promise<any> {
        const matchMeFirst = await MatchModel.findOne({ idUserAMatch: idUser, showMatch: true });
        const matchMeSecond = await MatchModel.findOne({ idUserBMatch: idUser, showMatch: true });
        if (!matchMeFirst && !matchMeSecond) {
            return "NOT_FOUND_MATCHES";
        }
        return { matchMeFirst, matchMeSecond };
    }

    // CASE 4: getTotalNumMatches(): Promise<string | null>;
    async getTotalNumMatches(): Promise<any> {
        const response = await MatchModel.countDocuments({ showMatch: true });
        return response;
    }

    // CASE 5: updateMatch(uuid: string, data: MatchEntity): Promise<MatchEntity | null>;
    async updateMatch(uuid: string, data: MatchEntity): Promise<any> {
        const response = await MatchModel.findOneAndUpdate({ _id: uuid }, data, { new: true });
        return response;
    }

    // CASE 6: deleteMatch(uuid: string): Promise<MatchEntity | null>;
    async deleteMatch(uuid: string): Promise<any> {
        const response = await MatchModel.findOneAndRemove({ _id: uuid });
        return response;
    }

}
