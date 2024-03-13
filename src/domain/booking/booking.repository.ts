import { BookingEntity } from "./booking.entity";

export interface BookingRepository {

    createBooking(data: BookingEntity): Promise<BookingEntity | null | string>;

    getBookingById(uuid: string): Promise<BookingEntity | null>;

    getBookingsByUser(user: string): Promise<BookingEntity[] | null>;

    getBookingsByCompany(company: string): Promise<BookingEntity[] | null>;

    getBookingsByService(service: string): Promise<BookingEntity[] | null>;

    getNumBookings(): Promise<string | null>;

    updateBooking(uuid: string, data: BookingEntity): Promise<BookingEntity | null>;

    deleteBooking(uuid: string): Promise<BookingEntity | null>;

    // CASE 1: createBooking(data: BookingEntity): Promise<BookingEntity | null | string>;

    // CASE 2: getBookingById(uuid: string): Promise<BookingEntity | null>;

    // CASE 3: getBookingsByUser(user: string): Promise<BookingEntity[] | null>;

    // CASE 4: getBookingsByCompany(company: string): Promise<BookingEntity[] | null>;

    // CASE 5: getBookingsByService(service: string): Promise<BookingEntity[] | null>;

    // CASE 6: getNumBookings(): Promise<string | null>;

    // CASE 7: updateBooking(uuid: string, data: BookingEntity): Promise<BookingEntity | null>;

    // CASE 8: deleteBooking(uuid: string): Promise<BookingEntity | null>;

}
