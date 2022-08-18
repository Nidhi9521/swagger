"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AvailabilityDomain = void 0;
var booking_1 = require("../model/booking");
var hotel_1 = require("../model/hotel");
var AvailabilityDomain = /** @class */ (function () {
    function AvailabilityDomain() {
    }
    AvailabilityDomain.prototype.checkAvailability = function (cIn, cOut, hotelId, noOfRoom) {
        return __awaiter(this, void 0, void 0, function () {
            var bookedId, unAvailableRoomDupId, unAvailableRoomId, roomDetailList, resData, unAvailableBooking, hRoom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookedId = [];
                        unAvailableRoomDupId = [];
                        unAvailableRoomId = [];
                        roomDetailList = [];
                        return [4 /*yield*/, booking_1.bookingmodel.find({
                                $and: [{ hotel_id: hotelId }, { status: "success" },
                                    {
                                        $or: [
                                            { $and: [{ "checkin_date": { $lte: cIn } }, { "checkout_date": { $lte: cIn } }] },
                                            { $and: [{ "checkin_date": { $gte: cOut } }, { "checkout_date": { $gte: cOut } }] }
                                        ]
                                    }
                                ]
                            }, {
                                "_id": 1,
                                "hotel_id": 1,
                                "checkin_date": 1,
                                "checkout_date": 1,
                                "room_id": 1
                            })];
                    case 1:
                        resData = _a.sent();
                        if (!(resData != null)) return [3 /*break*/, 4];
                        //booked ID from resData
                        resData.forEach(function (e) {
                            bookedId.push(e._id);
                        });
                        return [4 /*yield*/, booking_1.bookingmodel.find({ $and: [{ hotel_id: hotelId }, { _id: { $nin: bookedId } }] }, {
                                "_id": 1,
                                "hotel_id": 1,
                                "room_id": 1
                            })];
                    case 2:
                        unAvailableBooking = _a.sent();
                        if (!(unAvailableBooking != null)) return [3 /*break*/, 4];
                        //Available roomId 
                        unAvailableBooking.forEach(function (e) {
                            e.room_id.forEach(function (d) {
                                if (!unAvailableRoomId.includes(d)) {
                                    unAvailableRoomId.push(d);
                                }
                            });
                        });
                        return [4 /*yield*/, hotel_1.hotelmodel.find({ _id: hotelId })];
                    case 3:
                        hRoom = _a.sent();
                        hRoom.forEach(function (e) {
                            e.room.forEach(function (c) {
                                if (!unAvailableRoomId.includes(c.room_id)) {
                                    roomDetailList.push(c);
                                }
                            });
                        });
                        if (roomDetailList.length >= noOfRoom) {
                            return [2 /*return*/, hotelId];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AvailabilityDomain;
}());
exports.AvailabilityDomain = AvailabilityDomain;
