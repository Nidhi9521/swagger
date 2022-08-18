"use strict";
exports.__esModule = true;
exports.LoggerMiddleware = void 0;
var LoggerMiddleware = function (req, res, next) {
    console.log("Url ".concat(req.url, " ").concat(req.method, " -- ").concat(new Date()));
    next();
};
exports.LoggerMiddleware = LoggerMiddleware;
