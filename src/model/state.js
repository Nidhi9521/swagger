"use strict";
exports.__esModule = true;
exports.statemodel = void 0;
var mongoose_1 = require("mongoose");
var StateSchema = new mongoose_1["default"].Schema({
    _id: { type: Number, required: true, unique: true },
    state_name: { type: String, required: true }
});
var statemodel = mongoose_1["default"].model('states', StateSchema);
exports.statemodel = statemodel;
