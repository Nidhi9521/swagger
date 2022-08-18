"use strict";
exports.__esModule = true;
exports.checkRequest = exports.verifyToken = void 0;
var admin = require("firebase-admin");
var statuscode_1 = require("../statuscode");
//verifyToken method
function verifyToken(req, res, next) {
    try {
        var resData_1;
        var token = req.headers['token'];
        //verify token
        admin.auth().verifyIdToken(token).then(function (decodedToken) {
            resData_1 = {
                "uid": decodedToken.user_id,
                "email": decodedToken.email,
                "provider": decodedToken.firebase.sign_in_provider
            };
            //header store for further post useage
            req.headers["data"] = resData_1;
            next();
        })["catch"](function (error) {
            return res.status(statuscode_1.StatusCode.Unauthorized).json({
                errorMessage: error.message,
                expired: error.expired,
                message: 'Unauthorized Access'
            });
        });
    }
    catch (error) {
        return res.status(statuscode_1.StatusCode.Unauthorized).json({
            errorMessage: error.message,
            message: 'Unauthorized Access'
        });
    }
}
exports.verifyToken = verifyToken;
//check request method
function checkRequest(req, res, next) {
    var headerData = JSON.parse(JSON.stringify(req.headers["data"]));
    var method = req.method;
    //authorization logic
    switch (method) {
        case "GET": {
            next();
            break;
        }
        case "POST": {
            if (headerData.email == null || headerData.provider == "anonymous") {
                return res.status(statuscode_1.StatusCode.Unauthorized).json({
                    message: 'Anonymous User Try to access POST request.. Unauthorized Access'
                });
            }
            else {
                next();
            }
            break;
        }
        case "DELETE": {
            if (headerData.email == null || headerData.provider == "anonymous") {
                return res.status(statuscode_1.StatusCode.Unauthorized).json({
                    message: 'Anonymous User Try to access DELETE request.. Unauthorized Access'
                });
            }
            else {
                next();
            }
            break;
        }
        case "PUT": {
            if (headerData.email == null || headerData.provider == "anonymous") {
                return res.status(statuscode_1.StatusCode.Unauthorized).json({
                    message: 'Anonymous User Try to access PUT request.. Unauthorized Access'
                });
            }
            else {
                next();
            }
            break;
        }
        default: {
            return res.status(statuscode_1.StatusCode.Unauthorized).json({
                message: 'Unauthorized Access'
            });
        }
    }
}
exports.checkRequest = checkRequest;
