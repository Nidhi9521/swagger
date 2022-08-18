"use strict";
exports.__esModule = true;
exports.reviewmodel = void 0;
var mongoose_1 = require("mongoose");
var ReviewSchema = new mongoose_1["default"].Schema({
    _id: { type: Number, required: true, unique: true },
    user_id: { type: String, required: true, ref: 'users' },
    hotel_id: { type: Number, required: true, ref: 'hotels' },
    date: { type: Date },
    comment: { type: String, maxlength: 200 },
    cleanliness: { type: Number, min: 0, max: 5 },
    comfort: { type: Number, min: 0, max: 5 },
    location: { type: Number, min: 0, max: 5 },
    facilities: { type: Number, min: 0, max: 5 },
    rating: { type: Number, min: 0, max: 5 }
});
var reviewmodel = mongoose_1["default"].model('reviews', ReviewSchema);
exports.reviewmodel = reviewmodel;
