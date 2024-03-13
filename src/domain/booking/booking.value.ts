import { BookingEntity } from "./booking.entity";

export class BookingValue implements BookingEntity {
    uuid: string;
    idUserBooking: string;
    idOfferBooking?: string;
    idServiceBooking?: string;
    scheduleBooking: string;
    statusBooking: "sent" | "accepted" | "rejected";
    commentsBooking: string;
    deletedBooking: boolean;
    constructor({
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
    }) {
        this.uuid = uuid,
        this.idUserBooking = idUserBooking,
        this.idOfferBooking = idOfferBooking,
        this.idServiceBooking = idServiceBooking,
        this.scheduleBooking = scheduleBooking,
        this.statusBooking = statusBooking,
        this.commentsBooking = commentsBooking,
        this.deletedBooking = deletedBooking
    }
}