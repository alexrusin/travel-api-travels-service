"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var port = process.env.PORT || 3001;
var server = (0, server_1.createServer)();
server.listen(port, function () {
    console.log("api running on ".concat(port));
});
