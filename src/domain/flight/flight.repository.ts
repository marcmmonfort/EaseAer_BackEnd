import { FlightEntity } from "./flight.entity";

export interface FlightRepository {

    getFlightById(uuid: string): Promise<FlightEntity | null>;

    getFlightsByAirportAndInterval(airport: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;

    getDeparturesByAirportAndInterval(originFlight: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;

    getArrivalsByAirportAndInterval(destinationFlight: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;

    getNumFlights(): Promise<String | null>;

    getFlightsByCompany(companyName: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;

    createFlight(data: FlightEntity): Promise<FlightEntity | null | string>;

    updateFlightById(uuid: string, data: FlightEntity): Promise<FlightEntity | null>;
    
    deleteFlight(uuid: string): Promise<FlightEntity | null>;

    // CASE 1: getFlightById(uuid: string): Promise<FlightEntity | null>;

    // CASE 2: getFlightsByAirportAndInterval(airport: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;

    // CASE 3: getDeparturesByAirportAndInterval(originFlight: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;

    // CASE 4: getArrivalsByAirportAndInterval(destinationFlight: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;

    // CASE 5: getNumFlights(): Promise<String | null>;

    // CASE 6: getFlightsByCompany(companyName: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;

    // CASE 7: createFlight(data: FlightEntity): Promise<FlightEntity | null | string>;

    // CASE 8: updateFlightById(uuid: string, data: FlightEntity): Promise<FlightEntity | null>;
    
    // CASE 9: deleteFlight(uuid: string): Promise<FlightEntity | null>;
}
