import { Router } from "express";
import { FlightUseCase } from "../../application/flightUseCase";
import { FlightController } from "../controller/flight.ctrl";
import { MongoFlightRepository } from "../repository/mongoFlight.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeFlight = Router();

const flightRepo = new MongoFlightRepository();
const flightUseCase = new FlightUseCase(flightRepo);
const flightCtrl = new FlightController(flightUseCase);

routeFlight.get("/flight/getbyid/:uuid", checkJwt, flightCtrl.getFlightByIdCtrl);
routeFlight.get("/flight/flightsby/:airport/:startDate/:endDate", flightCtrl.getFlightsByAirportAndIntervalCtrl);
routeFlight.get("/flight/departuresby/:originFlight/:startDate/:endDate", flightCtrl.getDeparturesByAirportAndIntervalCtrl);
routeFlight.get("/flight/arrivalsby/:destinationFlight/:startDate/:endDate", flightCtrl.getArrivalsByAirportAndIntervalCtrl);
routeFlight.get("/flight/all/count/docs", checkJwt, flightCtrl.getNumFlightsCtrl);
routeFlight.get("/flight/bycompany/:companyName/:startDate/:endDate", flightCtrl.getFlightsByCompanyCtrl);
routeFlight.post("/flight/createflight", flightCtrl.createFlightCtrl);
routeFlight.put("/flight/update/:uuid", checkJwt, flightCtrl.updateFlightByIdCtrl);
routeFlight.delete("/flight/delete/:uuid", checkJwt, flightCtrl.deleteFlightCtrl);

export default routeFlight;
