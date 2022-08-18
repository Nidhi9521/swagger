"use strict";
exports.__esModule = true;
exports.bookmarkmodel = void 0;
var mongoose_1 = require("mongoose");
var BookmarkSchema = new mongoose_1["default"].Schema({
    _id: { type: Number, required: true, unique: true },
    hotel_id: { type: Number, required: true, ref: 'hotels' },
    user_id: { type: String, required: true, ref: 'users' }
});
var bookmarkmodel = mongoose_1["default"].model('bookmarks', BookmarkSchema);
exports.bookmarkmodel = bookmarkmodel;
