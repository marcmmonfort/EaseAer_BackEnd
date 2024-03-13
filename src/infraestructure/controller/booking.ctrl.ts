import { uploadUser } from "./multer/userMulter.ctrl";
import { BookingUseCase } from "../../application/bookingUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { BookingEntity } from "../../domain/booking/booking.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { BookingValue } from "../../domain/booking/booking.value";
import { isImageFile } from "../utils/isImage.handle";

export class BookingController {
    emailService: EmailService;
    constructor(private bookingUseCase: BookingUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createBookingCtrl = this.createBookingCtrl.bind(this);
        this.getBookingByIdCtrl = this.getBookingByIdCtrl.bind(this);
        this.getBookingsByUserCtrl = this.getBookingsByUserCtrl.bind(this);
        this.getBookingsByCompanyCtrl = this.getBookingsByCompanyCtrl.bind(this);
        this.getBookingsByServiceCtrl = this.getBookingsByServiceCtrl.bind(this);
        this.getNumBookingsCtrl = this.getNumBookingsCtrl.bind(this);
        this.updateBookingCtrl = this.updateBookingCtrl.bind(this);
        this.deleteBookingCtrl = this.deleteBookingCtrl.bind(this);
    }

    // CASE 1: createBooking(data: BookingEntity): Promise<BookingEntity | null | string>;
    public async createBookingCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserBooking,
            idOfferBooking,
            idServiceBooking,
            scheduleBooking,
            statusBooking,
            commentsBooking,
            deletedBooking
        } = req.body;
        try {
            const booking = new BookingValue({
                uuid: uuid,
                idUserBooking: idUserBooking,
                idOfferBooking: idOfferBooking,
                idServiceBooking: idServiceBooking,
                scheduleBooking: scheduleBooking,
                statusBooking: statusBooking,
                commentsBooking: commentsBooking,
                deletedBooking: deletedBooking
            });
            const response = await this.bookingUseCase.createBooking(booking);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_BOOKING");
        }
    }

    // CASE 2: getBookingById(uuid: string): Promise<BookingEntity | null>;
    public async getBookingByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.bookingUseCase.getBookingById(`${uuid}`);
        res.send(response);
    }

    // CASE 3: getBookingsByUser(user: string): Promise<BookingEntity[] | null>;
    public async getBookingsByUserCtrl({ params }: Request, res: Response) {
        const { user = "" } = params;
        const response = await this.bookingUseCase.getBookingsByUser(`${user}`);
        res.send(response);
    }

    // CASE 4: getBookingsByCompany(company: string): Promise<BookingEntity[] | null>;
    public async getBookingsByCompanyCtrl({ params }: Request, res: Response) {
        const { company = "" } = params;
        const response = await this.bookingUseCase.getBookingsByCompany(`${company}`);
        res.send(response);
    }

    // CASE 5: getBookingsByService(service: string): Promise<BookingEntity[] | null>;
    public async getBookingsByServiceCtrl({ params }: Request, res: Response) {
        const { service = "" } = params;
        const response = await this.bookingUseCase.getBookingsByService(`${service}`);
        res.send(response);
    }

    // CASE 6: getNumBookings(): Promise<string | null>;
    public async getNumBookingsCtrl(req: Request, res: Response) {
        const response = await this.bookingUseCase.getNumBookings();
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }

    // CASE 7: updateBooking(uuid: string, data: BookingEntity): Promise<BookingEntity | null>;
    public async updateBookingCtrl(req: Request, res: Response) {
        const {
            uuid,
            idUserBooking,
            idOfferBooking,
            idServiceBooking,
            scheduleBooking,
            statusBooking,
            commentsBooking,
            deletedBooking
        } = req.body;
        try {
            const booking = new BookingValue({
                uuid: uuid,
                idUserBooking: idUserBooking,
                idOfferBooking: idOfferBooking,
                idServiceBooking: idServiceBooking,
                scheduleBooking: scheduleBooking,
                statusBooking: statusBooking,
                commentsBooking: commentsBooking,
                deletedBooking: deletedBooking
            });
            const response = await this.bookingUseCase.updateBooking(uuid, booking);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_UPDATE_BOOKING");
        }
    }

    // CASE 8: deleteBooking(uuid: string): Promise<BookingEntity | null>;
    public async deleteBookingCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.bookingUseCase.deleteBooking(`${uuid}`);
        res.send(response);
    }
}
