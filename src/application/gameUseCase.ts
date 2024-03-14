import { GameRepository } from "../domain/game/game.repository";
import { GameValue } from "../domain/game/game.value";
import { NotFoundError } from "./notFoundError";

export class GameUseCase {
    constructor(private readonly gameRepository: GameRepository) {}

    // CASE 1: createGame(data: GameEntity): Promise<GameEntity | null | string>;
    public createGame = async ({
        uuid,
        idUserGame,
        destinationGame,
        questionsGame,
        pointsGame,
        deletedGame
    }: {
        uuid: string;
        idUserGame: string;
        destinationGame: string;
        questionsGame: [string];
        pointsGame: Number;
        deletedGame: boolean;
    }) => {
        const gameValue = new GameValue({
            uuid,
            idUserGame,
            destinationGame,
            questionsGame,
            pointsGame,
            deletedGame
        });
        const game = await this.gameRepository.createGame(gameValue);
        if (!game) {
            throw new NotFoundError("CANNOT_CREATE_GAME");
        }
        return game;
    };

    // CASE 2: getGameById(uuid: string): Promise<GameEntity | null>;
    public getGameById = async (uuid: string) => {
        const user = await this.gameRepository.getGameById(uuid);
        if (!user) {
            throw new NotFoundError("CANNOT_GET_GAME_BY_ID");
        }
        return user;
    };

    // CASE 3: getGamesByUser(user: string): Promise<GameEntity[] | null>;
    public getGamesByUser = async (user: string) => {
        const games = await this.gameRepository.getGamesByUser(user);
        if (!games) {
            throw new NotFoundError("CANNOT_GET_GAMES_BY_USER");
        }
        return games;
    };

    // CASE 4: getGamesByDestination(destination: string): Promise<GameEntity[] | null>;
    public getGamesByDestination = async (destination: string) => {
        const games = await this.gameRepository.getGamesByDestination(destination);
        if (!games) {
            throw new NotFoundError("CANNOT_GET_GAMES_BY_DESTINATION");
        }
        return games;
    };

    // CASE 5: getIdQuestionsOfGame(uuid: string): Promise<String[] | null>;
    public getIdQuestionsOfGame = async (uuid: string) => {
        const idsQuestions = await this.gameRepository.getIdQuestionsOfGame(uuid);
        if (!idsQuestions) {
            throw new NotFoundError("CANNOT_GET_QUESTION_IDS_BY_GAME");
        }
        return idsQuestions;
    };

    // CASE 6: getNumGames(): Promise<string | null>;
    public getNumGames = async () => {
        const numGames = await this.gameRepository.getNumGames();
        return numGames;
    };

    // CASE 7: updateGame(uuid: string, data: GameEntity): Promise<GameEntity | null>;
    public updateGame = async (
        uuid: string,
        {
            idUserGame,
            destinationGame,
            questionsGame,
            pointsGame,
            deletedGame
        }: {
            idUserGame: string;
            destinationGame: string;
            questionsGame: [string];
            pointsGame: Number;
            deletedGame: boolean;
        }
    ) => {
        const gameValue: GameValue = new GameValue({
            uuid,
            idUserGame,
            destinationGame,
            questionsGame,
            pointsGame,
            deletedGame
        });
        const game = await this.gameRepository.updateGame(uuid, gameValue);
        if (!game) {
            throw new NotFoundError("GAME_TO_UPDATE_NOT_FOUND");
        }
        return game;
    };

    // CASE 8: deleteGame(uuid: string): Promise<GameEntity | null>;
    public deleteGame = async (uuid: string) => {
        const game = await this.gameRepository.deleteGame(uuid);
        return game;
    };
  
}