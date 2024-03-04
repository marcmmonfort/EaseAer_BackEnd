import { FlightRepository } from "../domain/flight/flight.repository";
import { FlightValue } from "../domain/flight/flight.value";
import { NotFoundError } from "./notFoundError";

export class UserUseCase {
    constructor(private readonly flightRepository: FlightRepository) {}

    // CASE 1: getFlightById(uuid: string): Promise<FlightEntity | null>;
    public getFlightById = async (uuid: string) => {
        const flight = await this.flightRepository.getFlightById(uuid);
        if (!flight) {
        throw new NotFoundError("CANNOT_GET_FLIGHT_BY_ID");
        }
        return flight;
    };

    // CASE 2: getFlightsByAirportAndInterval(airport: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;
    public getFlightsByAirportAndInterval = async (airport: string, startDate: Date, endDate: Date) => {
        const flights = await this.flightRepository.getFlightsByAirportAndInterval(airport, startDate, endDate);
        if (!flights) {
        throw new NotFoundError("CANNOT_GET_FLIGHTS");
        }
        return flights;
    };

    // CASE 3: getDeparturesByAirportAndInterval(originFlight: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;
    public getDeparturesByAirportAndInterval = async (originFlight: string, startDate: Date, endDate: Date) => {
        const departures = await this.flightRepository.getDeparturesByAirportAndInterval(originFlight, startDate, endDate);
        if (!departures) {
        throw new NotFoundError("CANNOT_GET_DEPARTURES");
        }
        return departures;
    };

    // CASE 4: getArrivalsByAirportAndInterval(destinationFlight: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;
    public getArrivalsByAirportAndInterval = async (destinationFlight: string, startDate: Date, endDate: Date) => {
        const arrivals = await this.flightRepository.getArrivalsByAirportAndInterval(destinationFlight, startDate, endDate);
        if (!arrivals) {
        throw new NotFoundError("CANNOT_GET_ARRIVALS");
        }
        return arrivals;
    };

    // CASE 5: getNumFlights(): Promise<Number | null>;
    public getNumFlights = async () => {
        const numberFlights = await this.flightRepository.getNumFlights();
        return numberFlights;
    };

    // CASE 6: getFlightsByCompany(companyName: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;
    public getFlightsByCompany = async (company: string, startDate: Date, endDate: Date) => {
        const flights = await this.flightRepository.getFlightsByCompany(company, startDate, endDate);
        if (!flights) {
        throw new NotFoundError("CANNOT_GET_FLIGHTS");
        }
        return flights;
    };

    // CASE 7: createFlight(data: FlightEntity): Promise<FlightEntity | null | string>;
    public createFlight = async ({ uuid, numberFlight, companyFlight, originFlight, destinationFlight, stdFlight, etdFlight, staFlight, etaFlight, depTerminalFlight, statusFlight }: 
        {
            uuid: string;
            numberFlight: string;
            companyFlight: string;
            originFlight: string;
            destinationFlight: string;    
            stdFlight: Date;
            etdFlight: Date;
            staFlight: Date;
            etaFlight: Date;
            depTerminalFlight?: string;
            statusFlight: "ontime" | "delayed" | "cancelled";
        }) => {
        const flightValue = new FlightValue({ uuid, numberFlight, companyFlight, originFlight, destinationFlight, stdFlight, etdFlight, staFlight, etaFlight, depTerminalFlight, statusFlight });
        const flight = await this.flightRepository.createFlight(flightValue);
        if (!flight) {
          throw new NotFoundError("CANNOT_REGISTER_FLIGHT");
        }
        return flight;
      };

    // CASE 8: updateFlightById(uuid: string, data: FlightEntity): Promise<FlightEntity | null>;
    public updateFlightById = async (
        uuid: string,
        {
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
        }: {
            uuid: string;
            numberFlight: string;
            companyFlight: string;
            originFlight: string;
            destinationFlight: string;    
            stdFlight: Date;
            etdFlight: Date;
            staFlight: Date;
            etaFlight: Date;
            depTerminalFlight?: string;
            statusFlight: "ontime" | "delayed" | "cancelled";
        }
      ) => {
        const flightValue: FlightValue = new FlightValue({
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
        });
        console.log(flightValue);
        const flight = await this.flightRepository.updateFlightById(uuid, flightValue);
        if (!flight) {
          throw new NotFoundError("FLIGHT_TO_UPDATE_NOT_FOUND");
        }
        return flight;
      };
    
    // CASE 9: deleteFlight(uuid: string): Promise<FlightEntity | null>;
    public deleteFlight = async (uuid: string) => {
        const flight = await this.flightRepository.deleteFlight(uuid);
        return flight;
    };
  
}
