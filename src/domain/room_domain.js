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
exports.RoomDomain = void 0;
var hotel_1 = require("../model/hotel");
var image_1 = require("../model/image");
var statuscode_1 = require("../statuscode");
var RoomDomain = /** @class */ (function () {
    function RoomDomain() {
    }
    RoomDomain.prototype.getPerticularRoom = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var roomData, roomImageData, resData, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, hotel_1.hotelmodel.find({ _id: req.params.hotelid }).select({ room: { $elemMatch: { room_id: req.params.roomid } }, "hotel_name": 1 })];
                    case 1:
                        roomData = _a.sent();
                        return [4 /*yield*/, image_1.imagemodel.find({ $and: [{ room_id: req.params.roomid }, { hotel_id: req.params.hotelid }] })];
                    case 2:
                        roomImageData = _a.sent();
                        if (roomData != null) {
                            roomData.forEach(function (e) {
                                e.room.forEach(function (d) {
                                    resData = {
                                        hotel_id: e._id,
                                        hotel_name: e.hotel_name,
                                        room_id: d.room_id,
                                        room_type: d.room_type,
                                        room_size: d.room_size,
                                        bed_size: d.bed_size,
                                        max_capacity: d.max_capacity,
                                        price: d.price,
                                        features: d.features,
                                        description: d.description,
                                        images: roomImageData
                                    };
                                });
                            });
                            if (resData != null) {
                                res.status(statuscode_1.StatusCode.Sucess).send(resData);
                            }
                            else {
                                res.status(statuscode_1.StatusCode.Sucess).send('Data Not Found');
                                res.end();
                            }
                        }
                        else {
                            res.status(statuscode_1.StatusCode.Sucess).send('Data Not Found');
                            res.end();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(e_1.message);
                        res.end();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return RoomDomain;
}());
exports.RoomDomain = RoomDomain;
