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
exports.ReviewDomain = void 0;
var review_1 = require("../model/review");
var users_1 = require("../model/users");
var statuscode_1 = require("../statuscode");
var hotel_1 = require("../model/hotel");
var ReviewDomain = /** @class */ (function () {
    function ReviewDomain() {
    }
    //POST Review
    ReviewDomain.prototype.postReview = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var nextID, uid, rating, hotelId, postData, data, cleanliness, comfort, location, facilities, hotelReview, avgCleanliness, avgComfort, avgLocation, avgFacilities, avgRating, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('post');
                        return [4 /*yield*/, review_1.reviewmodel.findOne({}, { _id: 1 }).sort({ _id: -1 })];
                    case 1:
                        nextID = _a.sent();
                        uid = "1urPpRj8JIgqCWzKWCGHHZ8PnhD2";
                        rating = (Number(req.body.cleanliness) + Number(req.body.comfort) + Number(req.body.location) + Number(req.body.facilities)) / 4;
                        hotelId = parseInt(req.params.id);
                        postData = {
                            _id: (nextID === null || nextID === void 0 ? void 0 : nextID._id) == undefined ? 1 : Number(nextID === null || nextID === void 0 ? void 0 : nextID.id) + 1,
                            user_id: uid,
                            hotel_id: hotelId,
                            date: Date.now(),
                            comment: req.body.comment,
                            cleanliness: req.body.cleanliness.toFixed(1),
                            comfort: req.body.comfort.toFixed(1),
                            location: req.body.location.toFixed(1),
                            facilities: req.body.facilities.toFixed(1),
                            rating: rating
                        };
                        console.log(postData);
                        data = new review_1.reviewmodel(postData);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 9]);
                        cleanliness = 0;
                        comfort = 0;
                        location = 0;
                        facilities = 0;
                        return [4 /*yield*/, data.save()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, review_1.reviewmodel.find({ hotel_id: req.params.id }).populate({ path: 'user_id', model: users_1.Usermodel, select: { 'user_name': 1, 'user_image': 1, '_id': 0 } })];
                    case 4:
                        hotelReview = _a.sent();
                        if (!(hotelReview.length == 0)) return [3 /*break*/, 5];
                        res.status(statuscode_1.StatusCode.Not_Found).send([]);
                        return [3 /*break*/, 7];
                    case 5:
                        console.log(hotelReview);
                        hotelReview.forEach(function (e) {
                            cleanliness = cleanliness + e.cleanliness;
                            comfort = comfort + e.comfort;
                            location = location + e.location;
                            facilities = facilities + e.facilities;
                        });
                        avgCleanliness = cleanliness / hotelReview.length;
                        avgComfort = comfort / hotelReview.length;
                        avgLocation = location / hotelReview.length;
                        avgFacilities = facilities / hotelReview.length;
                        avgRating = ((avgCleanliness + avgComfort + avgLocation + avgFacilities) / 4).toExponential(1);
                        return [4 /*yield*/, hotel_1.hotelmodel.updateOne({ _id: hotelId }, { $set: { rating: avgRating } })];
                    case 6:
                        _a.sent();
                        console.log("updated");
                        res.status(statuscode_1.StatusCode.Sucess).send(hotelReview);
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_1 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_1.message);
                        return [3 /*break*/, 9];
                    case 9:
                        res.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    // GET Hotel Review
    ReviewDomain.prototype.getHotelReview = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var hotelReview, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, review_1.reviewmodel.find({ hotel_id: req.params.id }).populate({ path: 'user_id', model: users_1.Usermodel, select: { 'user_name': 1, 'user_image': 1, '_id': 0 } })];
                    case 1:
                        hotelReview = _a.sent();
                        if (hotelReview.length == 0) {
                            res.status(statuscode_1.StatusCode.Sucess).send([]);
                        }
                        else {
                            res.status(statuscode_1.StatusCode.Sucess).send(hotelReview);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_2.message);
                        return [3 /*break*/, 3];
                    case 3:
                        res.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ReviewDomain;
}());
exports.ReviewDomain = ReviewDomain;
