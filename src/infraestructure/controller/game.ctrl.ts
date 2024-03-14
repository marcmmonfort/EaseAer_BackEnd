import { uploadUser } from "./multer/userMulter.ctrl";
import { GameUseCase } from "../../application/gameUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { GameEntity } from "../../domain/game/game.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { isImageFile } from "../utils/isImage.handle";
import { GameValue } from "../../domain/game/game.value";

export class GameController {
    emailService: EmailService;
    constructor(private gameUseCase: GameUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createGameCtrl = this.createGameCtrl.bind(this);
        this.getGameByIdCtrl = this.getGameByIdCtrl.bind(this);
        this.getGamesByUserCtrl = this.getGamesByUserCtrl.bind(this);
        this.getGamesByDestinationCtrl = this.getGamesByDestinationCtrl.bind(this);
        this.getIdQuestionsOfGameCtrl = this.getIdQuestionsOfGameCtrl.bind(this);
        this.getNumGamesCtrl = this.getNumGamesCtrl.bind(this);
        this.updateGameCtrl = this.updateGameCtrl.bind(this);
        this.deleteGameCtrl = this.deleteGameCtrl.bind(this);
    }

    // CASE 1: createGame(data: GameEntity): Promise<GameEntity | null | string>;
    public async createGameCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserGame,
            destinationGame,
            questionsGame,
            pointsGame,
            deletedGame
        } = req.body;
        try {
            const game = new GameValue({
                uuid: uuid,
                idUserGame: idUserGame,
                destinationGame: destinationGame,
                questionsGame: questionsGame,
                pointsGame: pointsGame,
                deletedGame: deletedGame,
            });
            const response = await this.gameUseCase.createGame(game);
             res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_GAME");
        }
    }

    // CASE 2: getGameById(uuid: string): Promise<GameEntity | null>;
    public async getGameByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.gameUseCase.getGameById(`${uuid}`);
        res.send(response);
    }

    // CASE 3: getGamesByUser(user: string): Promise<GameEntity[] | null>;
    public async getGamesByUserCtrl({ params }: Request, res: Response) {
        const { user = "" } = params;
        const response = await this.gameUseCase.getGamesByUser(`${user}`);
        res.send(response);
    }

    // CASE 4: getGamesByDestination(destination: string): Promise<GameEntity[] | null>;
    public async getGamesByDestinationCtrl({ params }: Request, res: Response) {
        const { destination = "" } = params;
        const response = await this.gameUseCase.getGamesByDestination(`${destination}`);
        res.send(response);
    }

    // CASE 5: getIdQuestionsOfGame(uuid: string): Promise<String[] | null>;
    public async getIdQuestionsOfGameCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.gameUseCase.getIdQuestionsOfGame(`${uuid}`);
        res.send(response);
    }

    // CASE 6: getNumGames(): Promise<string | null>;
    public async getNumGamesCtrl(req: Request, res: Response) {
        const response = await this.gameUseCase.getNumGames();
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }

    // CASE 7: updateGame(uuid: string, data: GameEntity): Promise<GameEntity | null>;
    public async updateGameCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserGame,
            destinationGame,
            questionsGame,
            pointsGame,
            deletedGame
        } = req.body;
        try {
            const game = new GameValue({
                uuid: uuid,
                idUserGame: idUserGame,
                destinationGame: destinationGame,
                questionsGame: questionsGame,
                pointsGame: pointsGame,
                deletedGame: deletedGame,
            });
            const response = await this.gameUseCase.updateGame(uuid, game);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_UPDATE_USER");
        }
    }

    // CASE 8: deleteGame(uuid: string): Promise<GameEntity | null>;
    public async deleteGameCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.gameUseCase.deleteGame(`${uuid}`);
        res.send(response);
    }
}
