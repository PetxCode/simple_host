"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP = exports.ROLE = void 0;
var ROLE;
(function (ROLE) {
    ROLE["ADMIN"] = "admin";
    ROLE["CLIENT"] = "client";
    ROLE["AGENT"] = "agent";
    ROLE["DELIEVRY"] = "delivery";
})(ROLE || (exports.ROLE = ROLE = {}));
var HTTP;
(function (HTTP) {
    HTTP[HTTP["OK"] = 200] = "OK";
    HTTP[HTTP["CREATE"] = 201] = "CREATE";
    HTTP[HTTP["BAD_RESPONSE"] = 404] = "BAD_RESPONSE";
})(HTTP || (exports.HTTP = HTTP = {}));
