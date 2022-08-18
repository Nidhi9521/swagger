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
exports.BookingDomain = void 0;
var booking_1 = require("../model/booking");
var statuscode_1 = require("../statuscode");
var hotel_1 = require("../model/hotel");
var image_1 = require("../model/image");
var BookingDomain = /** @class */ (function () {
    function BookingDomain() {
    }
    BookingDomain.prototype.addBooking = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reqData, nextID, noOfRoom, bookIngData, sum, rommIdFromReq, getHotelRoom, roomPrice, getHotelRoomPrice, totalPrize, noOfNight, roomGstPrice, roomDiscountPrice, roomTotalPrize, bookedData, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqData = JSON.parse(JSON.stringify(req.headers['data']));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, booking_1.bookingmodel.findOne({}, { _id: 1 }).sort({ _id: -1 })];
                    case 2:
                        nextID = _a.sent();
                        noOfRoom = req.body.room_id.length;
                        bookIngData = {
                            _id: (nextID === null || nextID === void 0 ? void 0 : nextID._id) == undefined ? 1 : Number(nextID === null || nextID === void 0 ? void 0 : nextID.id) + 1,
                            user_id: reqData.uid,
                            hotel_id: req.body.hotel_id,
                            no_of_room: noOfRoom,
                            room_id: req.body.room_id,
                            checkin_date: new Date(req.body.checkin_date),
                            checkout_date: new Date(req.body.checkout_date),
                            status: "success",
                            price: {
                                number_of_nights: req.body.price.number_of_nights,
                                room_price: req.body.price.room_price,
                                gst: req.body.price.gst,
                                discount: req.body.price.discount,
                                total_price: req.body.price.total_price
                            }
                        };
                        sum = 0;
                        rommIdFromReq = (req.body.room_id);
                        console.log(rommIdFromReq);
                        return [4 /*yield*/, hotel_1.hotelmodel.find({ _id: req.body.hotel_id })];
                    case 3:
                        getHotelRoom = _a.sent();
                        roomPrice = [];
                        getHotelRoom.forEach(function (e) {
                            e.room.forEach(function (d) {
                                if (rommIdFromReq.includes(d.room_id)) {
                                    roomPrice.push(d.price);
                                    sum = sum + d.price;
                                }
                            });
                        });
                        getHotelRoomPrice = sum;
                        console.log(getHotelRoom);
                        console.log('price ' + getHotelRoomPrice);
                        totalPrize = (req.body.price.total_price);
                        noOfNight = (req.body.price.number_of_nights);
                        roomGstPrice = ((18 / 100) * (getHotelRoomPrice * noOfNight));
                        roomDiscountPrice = ((getHotelRoomPrice * noOfNight) + roomGstPrice) * 0.05;
                        console.log("gst ".concat(roomGstPrice));
                        console.log("discount ".concat(roomDiscountPrice));
                        roomTotalPrize = ((getHotelRoomPrice * noOfNight) - roomDiscountPrice + roomGstPrice);
                        console.log('price ' + roomTotalPrize);
                        console.log('total ' + totalPrize);
                        if (!(roomTotalPrize == totalPrize)) return [3 /*break*/, 5];
                        bookedData = new booking_1.bookingmodel(bookIngData);
                        console.log(bookedData);
                        return [4 /*yield*/, bookedData.save()];
                    case 4:
                        _a.sent();
                        res.status(statuscode_1.StatusCode.Sucess).send("Booking Success");
                        res.end();
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(statuscode_1.StatusCode.Not_Acceptable).send("Error in calculation");
                        _a.label = 6;
                    case 6:
                        res.end();
                        return [3 /*break*/, 8];
                    case 7:
                        err_1 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_1.message);
                        res.end();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    BookingDomain.prototype.bookingCancel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var q, bookingId, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        q = req.query;
                        if (!(q.bookingId.length != 0)) return [3 /*break*/, 2];
                        bookingId = q.bookingId;
                        return [4 /*yield*/, booking_1.bookingmodel.updateOne({ "_id": bookingId }, { $set: { "status": "cancel" } })];
                    case 1:
                        _a.sent();
                        res.status(statuscode_1.StatusCode.Sucess).send("Booking cancel Success");
                        res.end();
                        return [3 /*break*/, 3];
                    case 2:
                        res.status(statuscode_1.StatusCode.Sucess).send("bookingId is wrong");
                        res.end();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_2.message);
                        res.end();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BookingDomain.prototype.roomBookAvailableCheck = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var q, hotelId_1, cIn, cOut, noofroom, bookedId_1, unAvailableRoomDupId_1, unAvailableRoomId_1, roomDetailList_1, hotelName, resData, unAvailableBooking, hRoom, roomImageData_1, deluxeList_1, semiDeluxeList_1, superDeluxeList_1, resultData, resError, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        q = req.query;
                        hotelId_1 = q.hotel_id;
                        cIn = new Date(q.cin);
                        cOut = new Date(q.cout);
                        noofroom = q.no_of_room;
                        bookedId_1 = [];
                        unAvailableRoomDupId_1 = [];
                        unAvailableRoomId_1 = [];
                        roomDetailList_1 = [];
                        return [4 /*yield*/, booking_1.bookingmodel.find({
                                $and: [{ hotel_id: hotelId_1 },
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
                        if (!(resData != null)) return [3 /*break*/, 9];
                        //booked ID from resData
                        resData.forEach(function (e) {
                            bookedId_1.push(e._id);
                        });
                        return [4 /*yield*/, booking_1.bookingmodel.find({ $and: [{ hotel_id: hotelId_1 }, { _id: { $nin: bookedId_1 } }] }, {
                                "_id": 1,
                                "hotel_id": 1,
                                "room_id": 1
                            })];
                    case 2:
                        unAvailableBooking = _a.sent();
                        console.log(unAvailableBooking);
                        if (!(unAvailableBooking != null)) return [3 /*break*/, 7];
                        //Available roomId 
                        unAvailableBooking.forEach(function (e) {
                            e.room_id.forEach(function (d) {
                                unAvailableRoomDupId_1.push(d);
                            });
                        });
                        //Duplication Remove in roomId
                        unAvailableRoomDupId_1.forEach(function (item) {
                            if (!unAvailableRoomId_1.includes(item)) {
                                unAvailableRoomId_1.push(item);
                            }
                        });
                        console.log(unAvailableRoomId_1);
                        return [4 /*yield*/, hotel_1.hotelmodel.find({ _id: hotelId_1 })];
                    case 3:
                        hRoom = _a.sent();
                        hRoom.forEach(function (e) {
                            hotelName = e.hotel_name;
                            e.room.forEach(function (c) {
                                if (unAvailableRoomId_1.includes(c.room_id)) {
                                }
                                else {
                                    roomDetailList_1.push(c);
                                }
                            });
                        });
                        console.log(roomDetailList_1.length);
                        if (!(roomDetailList_1.length != 0)) return [3 /*break*/, 5];
                        roomImageData_1 = [];
                        return [4 /*yield*/, Promise.all(roomDetailList_1.map(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                var image;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, image_1.imagemodel.find({ $and: [{ room_id: e.room_id }, { hotel_id: hotelId_1 }] })];
                                        case 1:
                                            image = _a.sent();
                                            roomImageData_1.push({
                                                "room_id": e.room_id,
                                                "room_type": e.room_type,
                                                "room_size": e.room_size,
                                                "bed_size": e.bed_size,
                                                "max_capacity": e.max_capacity,
                                                "price": e.price,
                                                "features": e.features,
                                                "description": e.description,
                                                "image": image
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 4:
                        _a.sent();
                        deluxeList_1 = [];
                        semiDeluxeList_1 = [];
                        superDeluxeList_1 = [];
                        roomImageData_1.forEach(function (e) {
                            if (e.room_type == "Deluxe") {
                                deluxeList_1.push(e);
                            }
                            else if (e.room_type == "Semi-Deluxe") {
                                semiDeluxeList_1.push(e);
                            }
                            else if (e.room_type == "Super-Deluxe") {
                                superDeluxeList_1.push(e);
                            }
                        });
                        resultData = {
                            "hotel_id": hotelId_1,
                            "hotel_name": hotelName,
                            "deluxe": deluxeList_1,
                            "semi-deluxe": semiDeluxeList_1,
                            "super-deluxe": superDeluxeList_1
                        };
                        res.status(statuscode_1.StatusCode.Sucess).send(resultData);
                        return [3 /*break*/, 6];
                    case 5:
                        resError = {
                            "hotel_id": hotelId_1,
                            "hotel_name": hotelName,
                            "deluxe": [],
                            "semi-deluxe": [],
                            "super-deluxe": []
                        };
                        res.status(statuscode_1.StatusCode.Sucess).send(resError);
                        res.end();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        res.status(statuscode_1.StatusCode.Sucess).send({});
                        res.end();
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        res.status(statuscode_1.StatusCode.Sucess).send({});
                        res.end();
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_1 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(error_1.message);
                        res.end();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    BookingDomain.prototype.userBookingHistory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reqData, uid, bookingData, hotelIdList, bookingHistoryData, hotelData, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        reqData = JSON.parse(JSON.stringify(req.headers['data']));
                        uid = reqData.uid;
                        return [4 /*yield*/, booking_1.bookingmodel.find({ $match: [{ "user_id": uid }, { "status": "sucess" }] })];
                    case 1:
                        bookingData = _a.sent();
                        hotelIdList = [];
                        bookingHistoryData = [];
                        if (!(bookingData != null)) return [3 /*break*/, 3];
                        bookingData.forEach(function (e) {
                            hotelIdList.push(e.hotel_id);
                        });
                        return [4 /*yield*/, hotel_1.hotelmodel.aggregate([
                                {
                                    $match: {
                                        _id: { $in: hotelIdList }
                                    }
                                },
                                {
                                    $lookup: {
                                        from: "images",
                                        localField: "_id",
                                        foreignField: "hotel_id",
                                        pipeline: [
                                            { $match: { room_id: null } }
                                        ],
                                        as: "images"
                                    }
                                },
                                {
                                    "$project": {
                                        "hotel_id": "$_id",
                                        "hotel_name": "$hotel_name",
                                        "address": "$address",
                                        'images': "$images"
                                    }
                                },
                            ])];
                    case 2:
                        hotelData = _a.sent();
                        bookingData.forEach(function (e) {
                            hotelData.forEach(function (d) {
                                var _a;
                                if (e.hotel_id == d._id) {
                                    bookingHistoryData.push({
                                        "hotel_id": d._id,
                                        "hotel_name": d.hotel_name,
                                        "address": d.address,
                                        'images': d.images,
                                        "price": (_a = e.price) === null || _a === void 0 ? void 0 : _a.total_price,
                                        "checking_date": e.checkin_date,
                                        "checkout_date": e.checkout_date
                                    });
                                }
                            });
                        });
                        res.status(statuscode_1.StatusCode.Sucess).send(bookingHistoryData);
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(statuscode_1.StatusCode.Sucess).send([]);
                        res.end();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(e_1.message);
                        res.end();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return BookingDomain;
}());
exports.BookingDomain = BookingDomain;
