"use strict";
exports.__esModule = true;
exports.citymodel = void 0;
var mongoose_1 = require("mongoose");
var CitySchema = new mongoose_1["default"].Schema({
    _id: { type: Number, required: true, unique: true },
    city_name: { type: String, required: true },
    state_id: { type: Number,
        ref: 'states'
    }
});
var citymodel = mongoose_1["default"].model('cities', CitySchema);
exports.citymodel = citymodel;
