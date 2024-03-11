import { uploadUser } from "./multer/userMulter.ctrl";
import { MatchUseCase } from "../../application/matchUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { MatchEntity } from "../../domain/match/match.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { MatchValue } from "../../domain/match/match.value";
import { isImageFile } from "../utils/isImage.handle";

export class MatchController {
    emailService: EmailService;
    constructor(private matchUseCase: MatchUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createMatchCtrl = this.createMatchCtrl.bind(this);
        this.getMatchByIdCtrl = this.getMatchByIdCtrl.bind(this);
        this.getMyMatchesCtrl = this.getMyMatchesCtrl.bind(this);
        this.getTotalNumMatchesCtrl = this.getTotalNumMatchesCtrl.bind(this);
        this.updateMatchCtrl = this.updateMatchCtrl.bind(this);
        this.deleteMatchCtrl = this.deleteMatchCtrl.bind(this);
    }

    // CASE 1: createMatch(data: MatchEntity): Promise<MatchEntity | null | string>;
    public async createMatchCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserAMatch,
            idUserBMatch,
            dateMatch,
            showMatch,
            deletedMatch
        } = req.body;
        try {
            const user = new MatchValue({
                uuid: uuid,
                idUserAMatch: idUserAMatch,
                idUserBMatch: idUserBMatch,
                dateMatch: dateMatch,
                showMatch: showMatch,
                deletedMatch: deletedMatch,
            });
            const response = await this.matchUseCase.createMatch(user);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_MATCH");
        }
    }

    // CASE 2: getMatchById(uuid: string): Promise<MatchEntity | null>;
    public async getMatchByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.matchUseCase.getMatchById(`${uuid}`);
        res.send(response);
    }

    // CASE 3: getMyMatches(idUser: string): Promise<MatchEntity[] | null>;
    public async getMyMatchesCtrl({ params }: Request, res: Response) {
        const { idUser = "" } = params;
        const response = await this.matchUseCase.getMyMatches(`${idUser}`);
        res.send(response);
    }

    // CASE 4: getTotalNumMatches(): Promise<string | null>;
    public async getTotalNumMatchesCtrl(req: Request, res: Response) {
        const response = await this.matchUseCase.getTotalNumMatches();
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }

    // CASE 5: updateMatch(uuid: string, data: MatchEntity): Promise<MatchEntity | null>;
    public async updateMatchCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserAMatch,
            idUserBMatch,
            dateMatch,
            showMatch,
            deletedMatch
        } = req.body;
        try {
            const match = new MatchValue({
                uuid: uuid,
                idUserAMatch: idUserAMatch,
                idUserBMatch: idUserBMatch,
                dateMatch: dateMatch,
                showMatch: showMatch,
                deletedMatch: deletedMatch
            });
            const response = await this.matchUseCase.updateMatch(uuid, match);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_UPDATE_MATCH");
        }
    }

    // CASE 6: deleteMatch(uuid: string): Promise<MatchEntity | null>;
    public async deleteMatchCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.matchUseCase.deleteMatch(`${uuid}`);
        res.send(response);
    }

}
