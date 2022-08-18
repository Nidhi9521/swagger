"use strict";
exports.__esModule = true;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var admin = require("firebase-admin");
var travelproject22_6b9d4_firebase_adminsdk_2wiay_c9c1876710_json_1 = require("./travelproject22-6b9d4-firebase-adminsdk-2wiay-c9c1876710.json");
var logger_1 = require("./middlewear/logger");
var swagger_ui_express_1 = require("swagger-ui-express");
var swaggerDocument = require("../swagger-output.json");
const swaggerAutogen = require('swagger-autogen')();
const app = express_1.default();
var connection = mongoose_1["default"].connect('mongodb+srv://akash:akash@cluster0.4gzjhma.mongodb.net/mmt');
//const connection = mongoose.connect('mongodb://localhost:27017/mytsdata');
dotenv.config();
var port = process.env.PORT || 3000;
app.use(express_1["default"].json());
app.use(logger_1.LoggerMiddleware);
app.use("/swagger", swagger_ui_express_1.serve, swagger_ui_express_1.setup(swaggerDocument));
// ROUTER
var hotel_controller_1 = require("./controller/hotel_controller");
var tour_controller_1 = require("./controller/tour_controller");
var city_controller_1 = require("./controller/city_controller");
var room_controller_1 = require("./controller/room_controller");
var user_controller_1 = require("./controller/user_controller");
var review_controller_1 = require("./controller/review_controller");
var booking_controller_1 = require("./controller/booking_controller");
var bookmark_controller_1 = require("./controller/bookmark_controller");
// FIREBASE INTITIALIZE
admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": "travelproject22-6b9d4",

        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDb83BYyo7ZLCB9\nJ90YqXxA5jP3mCRvOCq6tx5lK6K1gGgs/DIKBtrkPX5moQmgNYcUudCd+3yN4aVv\nCfzPgEjbAWBUblGL9Q4Xrp3nhEwFZclfE744GF9nJrj5bPCmzD4KYKXNCA5q/Aop\nJ2QMSdyPFGWkvSHyxUNmNWjxJdS3w6IaQXuQ0bOeAuj8bvK5zBekGh0eIZabRCgP\nTVeki+MXcUu6pMizue50GnXvzqAFLeTZK17SBDHPRf5Atc6Z7R2JPm7QgH/V45jr\nvo1drKQrLM5FbORBbFEqowmdBA410kneqb+DHEbwmw5UvEKYcT6jepTTBrEnDwCV\niDOvVm8vAgMBAAECggEAFvhyiDix+HOc+lUlHa6S9Rgq3zW6wF7GSkpWLfdY/nQ9\nl6Jy+2HB5HTuSXuR93L/piYjEmIG8lkEH6I/DntK9eGhP3q8oM2Ok4yUncQkSFVc\nABueEa+smaeNSTHxDrUP2aJETohZMR/HU+BIQ5GcgNjUJgNBPgsPQeexYQCJbvNu\nxQfgiz15N6cTLZoSCdYSBZsScQgXQYNguKjT8OodbC/Bwg9CGFSjuDQkv+66kBw2\niT2ihWC6Csz+eJXaGEXsUBKxvNHOrM/ulvopivm783KQS6qhVU1P49+kGTFxQINi\n4YxibymbQzjA5jQgRHXBYWtxhv4AruDz8K+PPmPQ0QKBgQD9BS7lagNxxlE1Qk3v\nnKZWOgTutzz8PVsu7Oomnqh5EKn0U756qpZ7GvK3ZndM8+Chh4BQV27YEiobg19A\nO9hJXojeKIhsJRIzpKgReVGpLNT99U7VyW4XyyRaIHeLkDS0ASGmownN2dImsH6V\nxeFdkEZuN5/wcqJ3traK2Me19wKBgQDeio6LUA+O/Pll2mxuM+Wjp07q5dHNqVQf\n5SZ9EscjH6hWEyQKDVM5nbU+Conv+uSo0HibyaT+itzTgd4OEeC92YgTz1jCF1R0\nMUdQJmlbxhTyR2e9p8heaGCAjTxDiXO3ayFWuD+qRKcpoogqJrS3AJiRY6z7sa6l\nNemQFD7iiQKBgQCKTX3/2r39P+j90rtlIVxuv5IYpkKIokUoVkn7SDhQzMIJkokI\n5hwROH65ryHBB4Ge6cFCqTgmlW880MeNBelI2Yq43LENZAoZ/oP74TO45I+cLa2l\nAFDUYq8BMMQHnpCgYAnz2yStx8WubkUTOzHgAc/tySv8s7yI8W/AX5RyqwKBgFqQ\nysf5Uguf+iMwS/ZhWnBKk3xXARYQdjLwv8Qg0zgBFzHIYl9Q4vDMtMjF4zLtyQbG\nqH7GBkas3oeZD3RsZCj/ETj2pil+8xjCQUJmD3SQ3U9oLdjqIkoBclx+neriUlxv\n1caD/yzc+aahBYcZ72uWa4CnrutTeT60/RNsmdb5AoGBAJF6lCWOj4QuWwJQNQ6U\nxo6uBjiChDJk5pw2psNjbw0sNZdDopwR+eBHEEFEifYoYswRR4mOcMM1GRCqnW++\nOiWSatWOWQ/B3nrW6ROFlv4obRabbWJV3dTxkAICZnUVFiwMx9I9TWqPzhX1b0TU\nvAR0Wxe2yZYUqPuYmsOZ6UHe\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-2wiay@travelproject22-6b9d4.iam.gserviceaccount.com",

    })
});
// TOKEN VERIFICATION CALL
// app.use(verifyToken, checkRequest);
// ROOT LEVEL
app.get('/', function (req, res) {
    res.send('MMT Backend development');
    res.end();
});
// USE
app.use('/hotel', hotel_controller_1.router);
app.use('/room', room_controller_1.router);
app.use('/tour', tour_controller_1.router);
app.use('/city', city_controller_1.router);
app.use('/user', user_controller_1.router);
app.use('/review', review_controller_1.router);
app.use('/booking', booking_controller_1.router);
app.use('/bookmark', bookmark_controller_1.router);

// LISTEN
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at ".concat(port));
});
