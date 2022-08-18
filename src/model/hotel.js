"use strict";
exports.__esModule = true;
exports.hotelmodel = void 0;
var mongoose_1 = require("mongoose");
var HotelSchema = new mongoose_1["default"].Schema({
    _id: { type: Number, required: true, unique: true },
    hotel_name: { type: String, required: true },
    address: {
        address_line: { type: String, required: true },
        pincode: { type: Number },
        city_id: { type: Number, ref: 'cities' },
        location: {
            longitude: { type: String, required: true },
            latitude: { type: String, required: true }
        }
    },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    phone_number: { type: Number, required: true },
    no_of_room: { type: Number, required: true },
    description: { type: String, required: true },
    features: {
        type: Array, required: true
    },
    room: [{
            room_id: { type: Number, required: true },
            room_type: { type: String },
            room_size: { type: String, required: true },
            bed_size: { type: String, required: true },
            max_capacity: { type: Number, required: true },
            price: { type: Number, required: true },
            features: {
                type: Array, required: true
            },
            description: { type: String, required: true }
        }]
});
var hotelmodel = mongoose_1["default"].model('hotels', HotelSchema);
exports.hotelmodel = hotelmodel;
