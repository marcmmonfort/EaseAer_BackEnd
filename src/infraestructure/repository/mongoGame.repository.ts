import { Types } from "mongoose";
import { GameEntity } from "../../domain/game/game.entity";
import { GameRepository } from "../../domain/game/game.repository";
import GameModel from "../model/game.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoGameRepository implements GameRepository {

    // CASE 1: createGame(data: GameEntity): Promise<GameEntity | null | string>;
    async createGame(data: GameEntity): Promise<any> {
        const {
            uuid,
            idUserGame,
            destinationGame,
            questionsGame,
            pointsGame,
            deletedGame
        } = data;
        const checkIs = await GameModel.findOne({ uuid });
        if (checkIs) return "ALREADY_GAME";
        const game = await GameModel.create(data);
        const updatedGame = {
            uuid: game._id,
            idUserGame,
            destinationGame,
            questionsGame,
            pointsGame,
            deletedGame
        };
        const response = await GameModel.findOneAndUpdate(
            { _id: updatedGame.uuid },
            updatedGame,
            { new: true }
        );
        return response;
    }

    // CASE 2: getGameById(uuid: string): Promise<GameEntity | null>;
    async getGameById(uuid: string): Promise<any> {
        const response = await GameModel.findOne({ _id: uuid });
        return response;
    }

    // CASE 3: getGamesByUser(user: string): Promise<GameEntity[] | null>;
    async getGamesByUser(user: string): Promise<any> {
        const response = await GameModel.find({ idUserGame: user });
        if (!response) {
            return "NOT_FOUND_GAMES";
        }
        return response;
    }

    // CASE 4: getGamesByDestination(destination: string): Promise<GameEntity[] | null>;
    async getGamesByDestination(destination: string): Promise<any> {
        const response = await GameModel.find({ destinationGame: destination });
        if (!response) {
            return "NOT_FOUND_GAMES";
        }
        return response;
    }

    // CASE 5: getIdQuestionsOfGame(uuid: string): Promise<String[] | null>;
    async getIdQuestionsOfGame(uuid: string): Promise<any> {
        const response = await GameModel.findOne({ uuid: uuid });
        if (!response) {
            return "NOT_FOUND_GAMES";
        }
        return response.questionsGame;
    }

    // CASE 6: getNumGames(): Promise<string | null>;
    async getNumGames(): Promise<any> {
        const response = (await GameModel.countDocuments({})).toString();
        return response;
    }

    // CASE 7: updateGame(uuid: string, data: GameEntity): Promise<GameEntity | null>;
    async updateGame(uuid: string, data: GameEntity): Promise<any> {
        const response = await GameModel.findOneAndUpdate({ _id: uuid }, data, { new: true });
        return response;
    }

    // CASE 8: deleteGame(uuid: string): Promise<GameEntity | null>;
    async deleteGame(uuid: string): Promise<any> {
        const response = await GameModel.findOneAndRemove({ _id: uuid });
        return response;
    }

}
