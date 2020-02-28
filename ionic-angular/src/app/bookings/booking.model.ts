export class Booking {
    concat(newBooking: Booking): Booking {
        throw new Error("Method not implemented.");
    }
    constructor(public id: string,
                public placeId: string,
                public userId: string,
                public placeTitle: string,
                public placeImage: string,
                public firstName: string,
                public lastName: string,
                public guestNumber: number,
                public bookedFrom: Date,
                public bookedTo: Date
                ) {
    }
}