"use strict";
exports.__esModule = true;
exports.bookingmodel = void 0;
var mongoose_1 = require("mongoose");
var BookingSchema = new mongoose_1["default"].Schema({
    _id: { type: Number, required: true, unique: true },
    user_id: { type: String, ref: 'users', required: true },
    hotel_id: { type: Number, ref: 'hotels' },
    no_of_room: { type: Number },
    booked_date: { type: Date, "default": Date.now },
    room_id: { type: Array },
    checkin_date: { type: Date },
    checkout_date: { type: Date },
    status: { type: String },
    price: {
        number_of_nights: { type: Number },
        room_price: { type: Number },
        discount: { type: Number },
        gst: { type: Number },
        total_price: { type: Number }
    }
});
var bookingmodel = mongoose_1["default"].model('bookings', BookingSchema);
exports.bookingmodel = bookingmodel;
