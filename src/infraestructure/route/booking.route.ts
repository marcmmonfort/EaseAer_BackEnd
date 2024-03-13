import { Router } from "express";
import { BookingUseCase } from "../../application/bookingUseCase";
import { BookingController } from "../controller/booking.ctrl";
import { MongoBookingRepository } from "../repository/mongoBooking.repository";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeBooking = Router();

const bookingRepo = new MongoBookingRepository();
const bookingUseCase = new BookingUseCase(bookingRepo);
const bookingCtrl = new BookingController(bookingUseCase);

// CASE 1: createBooking(data: BookingEntity): Promise<BookingEntity | null | string>;
routeBooking.post("/booking/create", bookingCtrl.createBookingCtrl);

// CASE 2: getBookingById(uuid: string): Promise<BookingEntity | null>;
routeBooking.get("/booking/getbyid/:uuid", checkJwt, bookingCtrl.getBookingByIdCtrl);

// CASE 3: getBookingsByUser(user: string): Promise<BookingEntity[] | null>;
routeBooking.get("/booking/getbyuser/:uuid", checkJwt, bookingCtrl.getBookingsByUserCtrl);

// CASE 4: getBookingsByCompany(company: string): Promise<BookingEntity[] | null>;
routeBooking.get("/booking/getbycompany/:uuid", checkJwt, bookingCtrl.getBookingsByCompanyCtrl);

// CASE 5: getBookingsByService(service: string): Promise<BookingEntity[] | null>;
routeBooking.get("/booking/getbyservice/:uuid", checkJwt, bookingCtrl.getBookingsByServiceCtrl);

// CASE 6: getNumBookings(): Promise<string | null>;
routeBooking.get("/booking/all/count/docs", checkJwt, bookingCtrl.getNumBookingsCtrl);

// CASE 7: updateBooking(uuid: string, data: BookingEntity): Promise<BookingEntity | null>;
routeBooking.put("/booking/update/:uuid", checkJwt, bookingCtrl.updateBookingCtrl);

// CASE 8: deleteBooking(uuid: string): Promise<BookingEntity | null>;
routeBooking.delete("/booking/delete/:uuid", checkJwt, bookingCtrl.deleteBookingCtrl);

export default routeBooking;
