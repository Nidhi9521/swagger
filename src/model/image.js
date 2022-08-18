"use strict";
exports.__esModule = true;
exports.imagemodel = void 0;
var mongoose_1 = require("mongoose");
var ImageSchema = new mongoose_1["default"].Schema({
    _id: { type: Number, required: true, unique: true },
    image_url: { type: String, required: true },
    hotel_id: { type: Number,
        ref: 'hotels'
    },
    room_id: { type: Number
    }, tour_id: {
        type: Number
    }, user_id: {
        type: Number,
        ref: 'users'
    }
});
var imagemodel = mongoose_1["default"].model('images', ImageSchema);
exports.imagemodel = imagemodel;
