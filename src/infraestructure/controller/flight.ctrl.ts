import { uploadUser } from "./multer/userMulter.ctrl";
import { FlightUseCase } from "../../application/flightUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { cloudinary } from "../utils/cloduinary.handle";
import { FlightValue } from "../../domain/flight/flight.value";
import { isImageFile } from "../utils/isImage.handle";

export class FlightController {
  emailService: EmailService;
  constructor(private flightUseCase: FlightUseCase) {
    this.emailService = new NodemailerEmailService();
    this.getFlightByIdCtrl = this.getFlightByIdCtrl.bind(this);
    this.getFlightsByAirportAndIntervalCtrl = this.getFlightsByAirportAndIntervalCtrl.bind(this);
    this.getDeparturesByAirportAndIntervalCtrl = this.getDeparturesByAirportAndIntervalCtrl.bind(this);
    this.getArrivalsByAirportAndIntervalCtrl = this.getArrivalsByAirportAndIntervalCtrl.bind(this);
    this.getNumFlightsCtrl = this.getNumFlightsCtrl.bind(this);
    this.getFlightsByCompanyCtrl = this.getFlightsByCompanyCtrl.bind(this);
    this.createFlightCtrl = this.createFlightCtrl.bind(this);
    this.updateFlightByIdCtrl = this.updateFlightByIdCtrl.bind(this);
    this.deleteFlightCtrl = this.deleteFlightCtrl.bind(this);
  }

    // CASE 1: getFlightById(uuid: string): Promise<FlightEntity | null>;
    public async getFlightByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.flightUseCase.getFlightById(`${uuid}`);
        res.send(response);
    }

    // CASE 2: getFlightsByAirportAndInterval(airport: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;
    public async getFlightsByAirportAndIntervalCtrl({ params }: Request, res: Response) {
        const { airport = "", startDate, endDate } = params;
        const response = await this.flightUseCase.getFlightsByAirportAndInterval(`${airport}`, new Date(startDate), new Date(endDate));
        res.send(response);
    }

    // CASE 3: getDeparturesByAirportAndInterval(originFlight: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;
    public async getDeparturesByAirportAndIntervalCtrl({ params }: Request, res: Response) {
        const { originFlight = "", startDate, endDate } = params;
        const response = await this.flightUseCase.getDeparturesByAirportAndInterval(`${originFlight}`, new Date(startDate), new Date(endDate));
        res.send(response);
    }

    // CASE 4: getArrivalsByAirportAndInterval(destinationFlight: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;
    public async getArrivalsByAirportAndIntervalCtrl({ params }: Request, res: Response) {
        const { destinationFlight = "", startDate, endDate } = params;
        const response = await this.flightUseCase.getArrivalsByAirportAndInterval(`${destinationFlight}`, new Date(startDate), new Date(endDate));
        res.send(response);
    }

    // CASE 5: getNumFlights(): Promise<String | null>;
    public async getNumFlightsCtrl(req: Request, res: Response) {
        const response = await this.flightUseCase.getNumFlights();
        const data = response ? response : "NOT_FOUND";
        res.send(data);
      }

    // CASE 6: getFlightsByCompany(companyName: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;
    public async getFlightsByCompanyCtrl({ params }: Request, res: Response) {
        const { companyName = "", startDate, endDate } = params;
        const response = await this.flightUseCase.getFlightsByCompany(`${companyName}`, new Date(startDate), new Date(endDate));
        res.send(response);
    }

    // CASE 7: createFlight(data: FlightEntity): Promise<FlightEntity | null | string>;
    public async createFlightCtrl(req: Request, res: Response) {
        const {
            uuid,
            numberFlight,
            companyFlight,
            originFlight,
            destinationFlight, 
            stdFlight,
            etdFlight,
            staFlight,
            etaFlight,
            depTerminalFlight,
            statusFlight,
        } = req.body;
    
        try {
            const newFlight = new FlightValue({
                uuid: uuid,
                numberFlight: numberFlight,
                companyFlight: companyFlight,
                originFlight: originFlight,
                destinationFlight: destinationFlight, 
                stdFlight: stdFlight,
                etdFlight: etdFlight,
                staFlight: staFlight,
                etaFlight: etaFlight,
                depTerminalFlight: depTerminalFlight,
                statusFlight: statusFlight,
            });
            const response = await this.flightUseCase.createFlight(newFlight);
            res.send(response);
        } catch (error) {
          console.log("FLIGHT_NOT_CREATED");
        }
    }

    // CASE 8: updateFlightById(uuid: string, data: FlightEntity): Promise<FlightEntity | null>;
    public async updateFlightByIdCtrl(req: Request, res: Response) {
        const {
            uuid,
            numberFlight,
            companyFlight,
            originFlight,
            destinationFlight, 
            stdFlight,
            etdFlight,
            staFlight,
            etaFlight,
            depTerminalFlight,
            statusFlight,
        } = req.body;
        try {
            const flightInfo = new FlightValue({
                uuid: uuid,
                numberFlight: numberFlight,
                companyFlight: companyFlight,
                originFlight: originFlight,
                destinationFlight: destinationFlight, 
                stdFlight: stdFlight,
                etdFlight: etdFlight,
                staFlight: staFlight,
                etaFlight: etaFlight,
                depTerminalFlight: depTerminalFlight,
                statusFlight: statusFlight,
                });
            const response = await this.flightUseCase.updateFlightById(uuid, flightInfo);
            res.send(response);
        } catch (error) {
          console.log("FLIGHT_NOT_UPDATED");
        }
    }  
    
    // CASE 9: deleteFlight(uuid: string): Promise<FlightEntity | null>;
    public async deleteFlightCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.flightUseCase.deleteFlight(`${uuid}`);
        res.send(response);
    }
  
}
