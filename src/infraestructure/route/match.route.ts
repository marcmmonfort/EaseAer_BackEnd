import { Router } from "express";
import { MatchUseCase } from "../../application/matchUseCase";
import { MatchController } from "../controller/match.ctrl";
import { MongoMatchRepository } from "../repository/mongoMatch.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeMatch = Router();

const matchRepo = new MongoMatchRepository();
const matchUseCase = new MatchUseCase(matchRepo);
const matchCtrl = new MatchController(matchUseCase);

// CASE 1: createMatch(data: MatchEntity): Promise<MatchEntity | null | string>;
routeMatch.post("/match/create", matchCtrl.createMatchCtrl);

// CASE 2: getMatchById(uuid: string): Promise<MatchEntity | null>;
routeMatch.get("/match/getbyid/:uuid", checkJwt, matchCtrl.getMatchByIdCtrl);

// CASE 3: getMyMatches(idUser: string): Promise<MatchEntity[] | null>;
routeMatch.get("/match/getmymatches/:idUser", matchCtrl.getMyMatchesCtrl),

// CASE 4: getTotalNumMatches(): Promise<string | null>;
routeMatch.get("/match/getallnum", checkJwt, matchCtrl.getTotalNumMatchesCtrl);

// CASE 5: updateMatch(uuid: string, data: MatchEntity): Promise<MatchEntity | null>;
routeMatch.put("/match/update/:uuid", checkJwt, matchCtrl.updateMatchCtrl);

// CASE 6: deleteMatch(uuid: string): Promise<MatchEntity | null>;
routeMatch.delete("/match/delete/:uuid", checkJwt, matchCtrl.deleteMatchCtrl);

export default routeMatch;
