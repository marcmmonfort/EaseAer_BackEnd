import { GameEntity } from "./game.entity";

export interface GameRepository {
  
    createGame(data: GameEntity): Promise<GameEntity | null | string>;

    getGameById(uuid: string): Promise<GameEntity | null>;

    getGamesByUser(user: string): Promise<GameEntity[] | null>;

    getGamesByDestination(destination: string): Promise<GameEntity[] | null>;

    getIdQuestionsOfGame(uuid: string): Promise<String[] | null>;

    getNumGames(): Promise<string | null>;

    updateGame(uuid: string, data: GameEntity): Promise<GameEntity | null>;

    deleteGame(uuid: string): Promise<GameEntity | null>;

    // CASE 1: createGame(data: GameEntity): Promise<GameEntity | null | string>;

    // CASE 2: getGameById(uuid: string): Promise<GameEntity | null>;

    // CASE 3: getGamesByUser(user: string): Promise<GameEntity[] | null>;

    // CASE 4: getGamesByDestination(destination: string): Promise<GameEntity[] | null>;

    // CASE 5: getIdQuestionsOfGame(uuid: string): Promise<String[] | null>;

    // CASE 6: getNumGames(): Promise<string | null>;

    // CASE 7: updateGame(uuid: string, data: GameEntity): Promise<GameEntity | null>;

    // CASE 8: deleteGame(uuid: string): Promise<GameEntity | null>;

}
