"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = __importDefault(require("../routes/auth"));
var persona_1 = __importDefault(require("../routes/persona"));
var users_1 = __importDefault(require("../routes/users"));
var Server = /** @class */ (function () {
    function Server() {
        this.apiPaths = {
            login: "/api/login",
            persons: "/api/personas",
            users: "/api/usuarios"
        };
        this.app = (0, express_1["default"])();
        this.port = process.env.PORT || '8000';
        this.middleware();
        this.routes();
    }
    Server.prototype.middleware = function () {
        this.app.use((0, cors_1["default"])());
        this.app.use(express_1["default"].json());
        this.app.use(express_1["default"].static("public"));
    };
    Server.prototype.routes = function () {
        this.app.use(this.apiPaths.login, auth_1["default"]);
        this.app.use(this.apiPaths.persons, persona_1["default"]);
        this.app.use(this.apiPaths.users, users_1["default"]);
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server runing in: " + _this.port);
        });
    };
    return Server;
}());
exports["default"] = Server;
//# sourceMappingURL=server.js.map