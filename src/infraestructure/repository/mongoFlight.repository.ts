import { Types } from "mongoose";
import { FlightEntity } from "../../domain/flight/flight.entity";
import { FlightRepository } from "../../domain/flight/flight.repository";
import FlightModel from "../model/flight.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoFlightRepository implements FlightRepository {

    // CASE 1: getFlightById(uuid: string): Promise<FlightEntity | null>;
    async getFlightById(uuid: string): Promise<any> {
      const response = await FlightModel.findOne({ _id: uuid });
      return response;
    }

    // CASE 2: getFlightsByAirportAndInterval(airport: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;
    async getFlightsByAirportAndInterval(airport: string, startDate: Date, endDate: Date): Promise<any> {   
      try {
        const arrFlights = await FlightModel.find({
            $and: [
                { destinationFlight: airport },
                { etaFlight: { $gte: startDate } },
                { etaFlight: { $lte: endDate } }
            ]
        });
        const depFlights = await FlightModel.find({
          $and: [
              { originFlight: airport },
              { etdFlight: { $gte: startDate } },
              { etdFlight: { $lte: endDate } }
          ]
        });
        const flights = arrFlights.concat(depFlights);
        return flights;
      } catch (error) {
        return "ANY_FLIGHTS_FOUND";
      }
    }

    // CASE 3: getDeparturesByAirportAndInterval(originFlight: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;
    async getDeparturesByAirportAndInterval(originFlight: string, startDate: Date, endDate: Date): Promise<any> {   
      try {
        const depFlights = await FlightModel.find({
          $and: [
              { originFlight: originFlight },
              { etdFlight: { $gte: startDate } },
              { etdFlight: { $lte: endDate } }
          ]
        });
        return depFlights;
      } catch (error) {
        return "ANY_DEPARTURES_FOUND";
      }
    }

    // CASE 4: getArrivalsByAirportAndInterval(destinationFlight: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;
    async getArrivalsByAirportAndInterval(destinationFlight: string, startDate: Date, endDate: Date): Promise<any> {   
      try {
        const arrFlights = await FlightModel.find({
          $and: [
              { destinationFlight: destinationFlight },
              { etaFlight: { $gte: startDate } },
              { etaFlight: { $lte: endDate } }
          ]
        });
        return arrFlights;
      } catch (error) {
        return "ANY_ARRIVALS_FOUND";
      }
    }

    // CASE 5: getNumFlights(): Promise<String | null>;
    async getNumFlights(): Promise<any> {
      const response = (await FlightModel.countDocuments({})).toString();
      return response;
    }

    // CASE 6: getFlightsByCompany(companyName: string, startDate: Date, endDate: Date): Promise<FlightEntity[] | null>;
    async getFlightsByCompany(companyName: string, startDate: Date, endDate: Date): Promise<any> {   
      try {
        const arrFlights = await FlightModel.find({
            $and: [
                { companyFlight: companyName },
                { etaFlight: { $gte: startDate } },
                { etaFlight: { $lte: endDate } }
            ]
        });
        const depFlights = await FlightModel.find({
          $and: [
              { companyFlight: companyName },
              { etdFlight: { $gte: startDate } },
              { etdFlight: { $lte: endDate } }
          ]
        });
        const flights = arrFlights.concat(depFlights);
        return flights;
      } catch (error) {
        return "ANY_FLIGHTS_FOUND";
      }
    }

    // CASE 7: createFlight(data: FlightEntity): Promise<FlightEntity | null | string>;
    async createFlight(data: FlightEntity): Promise<any> {
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
        statusFlight
      } = data;
      const flight = await FlightModel.create(data);
      const flightUpdate = {
        uuid: flight._id,
        numberFlight,
        companyFlight,
        originFlight,
        destinationFlight, 
        stdFlight,
        etdFlight,
        staFlight,
        etaFlight,
        depTerminalFlight,
        statusFlight
      };
      const response = await FlightModel.findOneAndUpdate(
        { _id: flightUpdate.uuid },
        flightUpdate,
        { new: true }
      );
      console.log("Update Flight: " + response);
      return response;
    }

    // CASE 8: updateFlightById(uuid: string, data: FlightEntity): Promise<FlightEntity | null>;
    async updateFlightById(uuid: string, data: FlightEntity): Promise<any> {
      const response = await FlightModel.findOneAndUpdate({ _id: uuid }, data, {
        new: true,
      });
      return response;
    }
    
    // CASE 9: deleteFlight(uuid: string): Promise<FlightEntity | null>;
    async deleteFlight(uuid: string): Promise<any> {
      const response = await FlightModel.findOneAndRemove({ _id: uuid });
      return response;
    }

}


