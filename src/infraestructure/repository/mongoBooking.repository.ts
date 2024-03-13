import { Types } from "mongoose";
import { BookingEntity } from "../../domain/booking/booking.entity";
import { BookingRepository } from "../../domain/booking/booking.repository";
import BookingModel from "../model/booking.schema";
import OfferModel from "../model/offer.schema";
import ServiceModel from "../model/service.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoBookingRepository implements BookingRepository {

    // CASE 1: createBooking(data: BookingEntity): Promise<BookingEntity | null | string>;
    async createBooking(data: BookingEntity): Promise<any> {
        const {
            uuid,
            idUserBooking,
            idOfferBooking,
            idServiceBooking,
            scheduleBooking,
            statusBooking,
            commentsBooking,
            deletedBooking
        } = data;
        const checkIs = await BookingModel.findOne({ uuid });
        if (checkIs) return "ALREADY_BOOKING";
        const booking = await BookingModel.create(data);
        const updatedBooking = {
            uuid: booking._id,
            idUserBooking,
            idOfferBooking,
            idServiceBooking,
            scheduleBooking,
            statusBooking,
            commentsBooking,
            deletedBooking
        };
        const response = await BookingModel.findOneAndUpdate(
            { _id: updatedBooking.uuid },
            updatedBooking,
            { new: true }
        );
        return response;
    }

    // CASE 2: getBookingById(uuid: string): Promise<BookingEntity | null>;
    async getBookingById(uuid: string): Promise<any> {
        const response = await BookingModel.findOne({ _id: uuid });
        return response;
    }

    // CASE 3: getBookingsByUser(user: string): Promise<BookingEntity[] | null>;
    async getBookingsByUser(user: string): Promise<any> {
        const response = await BookingModel.find({ idUserBooking: user });
        if (!response) {
            return "NOT_FOUND_BOOKINGS";
        }
        return response;
    }

    // CASE 4: getBookingsByCompany(company: string): Promise<BookingEntity[] | null>;
    async getBookingsByCompany(company: string): Promise<any> {
        const offersByCompany = await OfferModel.find({ idShopOffer: company });
        const allBookings = await BookingModel.find();

        const bookingsByCompany: BookingEntity[] = [];

        for (const offer of offersByCompany) {
            const bookingsForOffer = allBookings.filter(booking => {
                const offerIdAsString = offer.uuid.toString();
                const idOfferBookingAsString = booking.idOfferBooking ? booking.idOfferBooking.toString() : undefined;
                return ((idOfferBookingAsString && idOfferBookingAsString === offerIdAsString));
            });

            const bookingsForOfferFormatted: BookingEntity[] = bookingsForOffer.map(booking => ({
                uuid: booking.uuid,
                idUserBooking: booking.idUserBooking.toString(),
                idOfferBooking: booking.idOfferBooking ? booking.idOfferBooking.toString() : undefined,
                idServiceBooking: booking.idServiceBooking ? booking.idServiceBooking.toString() : undefined,
                scheduleBooking: booking.scheduleBooking,
                statusBooking: booking.statusBooking,
                commentsBooking: booking.commentsBooking,
                deletedBooking: booking.deletedBooking
            }));

            bookingsByCompany.push(...bookingsForOfferFormatted);
        }

        return bookingsByCompany;
    }

    // CASE 5: getBookingsByService(service: string): Promise<BookingEntity[] | null>;
    async getBookingsByService(service: string): Promise<any> {
        const offersByService = await BookingModel.find({ idServiceBooking: service });
        return offersByService;
    }

    // CASE 6: getNumBookings(): Promise<string | null>;
    async getNumBookings(): Promise<any> {
        const response = (await BookingModel.countDocuments({})).toString();
        return response;
    }

    // CASE 7: updateBooking(uuid: string, data: BookingEntity): Promise<BookingEntity | null>;
    async updateBooking(uuid: string, data: BookingEntity): Promise<any> {
        const response = await BookingModel.findOneAndUpdate({ _id: uuid }, data, { new: true });
        return response;
    }

    // CASE 8: deleteBooking(uuid: string): Promise<BookingEntity | null>;
    async deleteBooking(uuid: string): Promise<any> {
        const response = await BookingModel.findOneAndRemove({ _id: uuid });
        return response;
    }

}
