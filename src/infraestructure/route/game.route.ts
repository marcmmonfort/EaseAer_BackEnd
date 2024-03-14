import { Router } from "express";
import { GameUseCase } from "../../application/gameUseCase";
import { GameController } from "../controller/game.ctrl";
import { MongoGameRepository } from "../repository/mongoGame.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeGame = Router();

const gameRepo = new MongoGameRepository();
const gameUseCase = new GameUseCase(gameRepo);
const gameCtrl = new GameController(gameUseCase);

// CASE 1: createGame(data: GameEntity): Promise<GameEntity | null | string>;
routeGame.post("/game/create", gameCtrl.createGameCtrl);

// CASE 2: getGameById(uuid: string): Promise<GameEntity | null>;
routeGame.get("/game/getbyid/:uuid", checkJwt, gameCtrl.getGameByIdCtrl);

// CASE 3: getGamesByUser(user: string): Promise<GameEntity[] | null>;
routeGame.get("/game/getgamesbyuser/:user", checkJwt, gameCtrl.getGamesByUserCtrl);

// CASE 4: getGamesByDestination(destination: string): Promise<GameEntity[] | null>;
routeGame.get("/game/getgamesbydestination/:destination", checkJwt, gameCtrl.getGamesByDestinationCtrl);

// CASE 5: getIdQuestionsOfGame(uuid: string): Promise<String[] | null>;
routeGame.get("/game/getquestionsofgame/:uuid", checkJwt, gameCtrl.getIdQuestionsOfGameCtrl);

// CASE 6: getNumGames(): Promise<string | null>;
routeGame.get("/game/all/count/docs", checkJwt, gameCtrl.getNumGamesCtrl);

// CASE 7: updateGame(uuid: string, data: GameEntity): Promise<GameEntity | null>;
routeGame.put("/game/update/:uuid", checkJwt, gameCtrl.updateGameCtrl);

// CASE 8: deleteGame(uuid: string): Promise<GameEntity | null>;
routeGame.delete("/game/delete/:uuid", checkJwt, gameCtrl.deleteGameCtrl);

export default routeGame;
