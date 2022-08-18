"use strict";
exports.__esModule = true;
exports.tourmodel = void 0;
var mongoose_1 = require("mongoose");
//tour schema
var TourSchema = new mongoose_1["default"].Schema({
    _id: { type: Number, required: true, unique: true },
    tour_name: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true }
});
var tourmodel = mongoose_1["default"].model('tours', TourSchema);
exports.tourmodel = tourmodel;
