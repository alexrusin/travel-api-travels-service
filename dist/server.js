"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var createServer = function () {
    var app = (0, express_1.default)();
    app
        .disable("x-powered-by")
        .use((0, morgan_1.default)("dev"))
        .use(express_1.default.urlencoded({ extended: true }))
        .use(express_1.default.json())
        .use((0, cors_1.default)());
    app.get("/healthz", function (req, res) {
        return res.json({ ok: true, environment: process.env.NODE_ENV });
    });
    app.get("/message/:name", function (req, res) {
        return res.json({ message: "hello ".concat(req.params.name) });
    });
    return app;
};
exports.createServer = createServer;
