export interface BookingEntity {
    uuid: string;
    idUserBooking: string;
    idOfferBooking?: string; // O esto ...
    idServiceBooking?: string; // ... o esto.
    scheduleBooking: string; // Ex: "Tuesday|09:00_10:00"
    statusBooking: "sent" | "accepted" | "rejected";
    commentsBooking: string;
    deletedBooking: boolean;
}