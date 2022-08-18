"use strict";
exports.__esModule = true;
exports.Usermodel = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1["default"].Schema({
    _id: { type: String, required: true, unique: true },
    user_name: { type: String, required: true, minlength: 1, maxlength: 30 },
    user_email: { type: String, required: true, unique: true },
    user_phone_number: { type: String, minlength: 10, maxlength: 14 },
    user_image: { type: String }
});
var Usermodel = mongoose_1["default"].model('users', UserSchema);
exports.Usermodel = Usermodel;
