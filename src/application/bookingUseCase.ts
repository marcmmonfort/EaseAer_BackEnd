import { BookingRepository } from "../domain/booking/booking.repository";
import { BookingValue } from "../domain/booking/booking.value";
import { NotFoundError } from "./notFoundError";

export class BookingUseCase {
    constructor(private readonly bookingRepository: BookingRepository) {}

    // CASE 1: createBooking(data: BookingEntity): Promise<BookingEntity | null | string>;
    public createBooking = async ({
        uuid,
        idUserBooking,
        idOfferBooking,
        idServiceBooking,
        scheduleBooking,
        statusBooking,
        commentsBooking,
        deletedBooking
    }: {
        uuid: string;
        idUserBooking: string;
        idOfferBooking?: string;
        idServiceBooking?: string;
        scheduleBooking: string;
        statusBooking: "sent" | "accepted" | "rejected";
        commentsBooking: string;
        deletedBooking: boolean;
    }) => {
        const bookingValue = new BookingValue({
            uuid,
            idUserBooking,
            idOfferBooking,
            idServiceBooking,
            scheduleBooking,
            statusBooking,
            commentsBooking,
            deletedBooking
        });
        const booking = await this.bookingRepository.createBooking(bookingValue);
        if (!booking) {
            throw new NotFoundError("CANNOT_CREATE_BOOKING");
        }
        return booking;
    };

    // CASE 2: getBookingById(uuid: string): Promise<BookingEntity | null>;
    public getBookingById = async (uuid: string) => {
        const booking = await this.bookingRepository.getBookingById(uuid);
        if (!booking) {
            throw new NotFoundError("CANNOT_GET_BOOKING_BY_ID");
        }
        return booking;
    };

    // CASE 3: getBookingsByUser(user: string): Promise<BookingEntity[] | null>;
    public getBookingsByUser = async (user: string) => {
        const bookings = await this.bookingRepository.getBookingsByUser(user);
        if (!bookings) {
            throw new NotFoundError("CANNOT_GET_BOOKINGS_BY_USER");
        }
        return bookings;
    };

    // CASE 4: getBookingsByCompany(company: string): Promise<BookingEntity[] | null>;
    public getBookingsByCompany = async (company: string) => {
        const bookings = await this.bookingRepository.getBookingsByUser(company);
        if (!bookings) {
            throw new NotFoundError("CANNOT_GET_BOOKINGS_BY_COMPANY");
        }
        return bookings;
    };

    // CASE 5: getBookingsByService(service: string): Promise<BookingEntity[] | null>;
    public getBookingsByService = async (service: string) => {
        const bookings = await this.bookingRepository.getBookingsByUser(service);
        if (!bookings) {
            throw new NotFoundError("CANNOT_GET_BOOKINGS_BY_SERVICE");
        }
        return bookings;
    };

    // CASE 6: getNumBookings(): Promise<string | null>;
    public getNumBookings = async () => {
        const numBookings = await this.bookingRepository.getNumBookings();
        return numBookings;
    };

    // CASE 7: updateBooking(uuid: string, data: BookingEntity): Promise<BookingEntity | null>;
    public updateBooking = async (
        uuid: string,
        {
            idUserBooking,
            idOfferBooking,
            idServiceBooking,
            scheduleBooking,
            statusBooking,
            commentsBooking,
            deletedBooking
        }: {
            uuid: string;
            idUserBooking: string;
            idOfferBooking?: string;
            idServiceBooking?: string;
            scheduleBooking: string;
            statusBooking: "sent" | "accepted" | "rejected";
            commentsBooking: string;
            deletedBooking: boolean;
        }
    ) => {
        const bookingValue: BookingValue = new BookingValue({
            uuid,
            idUserBooking,
            idOfferBooking,
            idServiceBooking,
            scheduleBooking,
            statusBooking,
            commentsBooking,
            deletedBooking
        });
        const booking = await this.bookingRepository.updateBooking(uuid, bookingValue);
        if (!booking) {
            throw new NotFoundError("BOOKING_TO_UPDATE_NOT_FOUND");
        }
        return booking;
    };

    // CASE 8: deleteBooking(uuid: string): Promise<BookingEntity | null>;
    public deleteBooking = async (uuid: string) => {
        const booking = await this.bookingRepository.deleteBooking(uuid);
        return booking;
    };
  
}