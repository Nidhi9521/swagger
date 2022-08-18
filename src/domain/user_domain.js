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
exports.UserDomain = void 0;
var users_1 = require("../model/users");
var joi_1 = require("joi");
var statuscode_1 = require("../statuscode");
var admin = require("firebase-admin");
var UserDomain = /** @class */ (function () {
    function UserDomain() {
    }
    //POST User
    UserDomain.prototype.postUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, postData, decodedToken, data, error_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('data');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        console.log('post');
                        token = req.headers['token'];
                        return [4 /*yield*/, admin.auth().verifyIdToken(token)];
                    case 2:
                        decodedToken = _a.sent();
                        console.log(decodedToken);
                        postData = {
                            _id: decodedToken.uid,
                            user_name: decodedToken.name != null ? decodedToken.name : null,
                            user_email: decodedToken.email,
                            user_phone_number: decodedToken.phone_number != null ? decodedToken.phone_number : null,
                            user_image: decodedToken.picture != null ? decodedToken.picture : null
                        };
                        data = new users_1.Usermodel(postData);
                        console.log(data);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, data.save()];
                    case 4:
                        _a.sent();
                        console.log("data addedd");
                        res.status(statuscode_1.StatusCode.Sucess).send("data added");
                        res.end();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        if (error_1.code == 11000) {
                            console.log('errro google');
                            if (decodedToken.firebase.sign_in_provider == "google.com" || decodedToken.firebase.sign_in_provider == "facebook.com") {
                                res.status(statuscode_1.StatusCode.Sucess).send("data alerady but google user");
                                res.end();
                            }
                            else {
                                console.log('error duplication');
                                res.status(statuscode_1.StatusCode.DuplicationError).send("data is alredy  PRESENT");
                                res.end();
                            }
                        }
                        else {
                            console.log('error server');
                            res.status(statuscode_1.StatusCode.Server_Error).send(error_1.message);
                            res.end();
                        }
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        console.log('catch exception');
                        res.status(statuscode_1.StatusCode.Server_Error).send(e_1.message);
                        res.end();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    //Update User
    UserDomain.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reqData, uid, joiSchema, data, err, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqData = JSON.parse(JSON.stringify(req.headers['data']));
                        uid = reqData.uid;
                        joiSchema = joi_1["default"].object({
                            user_name: joi_1["default"].string().min(1).max(30),
                            user_phone_number: joi_1["default"].string().min(10).max(14),
                            user_image: joi_1["default"].string()
                        });
                        data = {
                            user_name: req.body.user_name,
                            user_phone_number: req.body.user_phone_number,
                            user_image: req.body.user_image
                        };
                        err = joiSchema.validate(data);
                        if (!err.error) return [3 /*break*/, 1];
                        res.status(statuscode_1.StatusCode.Server_Error).send(err.error.details[0].message);
                        return [3 /*break*/, 4];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, users_1.Usermodel.findByIdAndUpdate(uid, data)];
                    case 2:
                        _a.sent();
                        res.status(statuscode_1.StatusCode.Sucess).send("data updated");
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(err_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //get user 
    UserDomain.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reqData, uid, userData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        reqData = JSON.parse(JSON.stringify(req.headers['data']));
                        uid = reqData.uid;
                        console.log(uid);
                        return [4 /*yield*/, users_1.Usermodel.find({ _id: uid }).select("-__v")];
                    case 1:
                        userData = _a.sent();
                        res.status(statuscode_1.StatusCode.Sucess).send(userData);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(statuscode_1.StatusCode.Server_Error).send(error_2.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserDomain;
}());
exports.UserDomain = UserDomain;
