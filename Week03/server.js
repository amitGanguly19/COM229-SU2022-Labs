"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const mime_types_1 = __importDefault(require("mime-types"));
let lookup = mime_types_1.default.lookup;
const port = 3000;
const server = http_1.default.createServer(function (req, res) {
    let path = req.url;
    if (path == "/" || path == "/home") {
        path = "/index.html";
    }
    let mine_type = lookup(path.substring(1));
    console.log(`MIME TYPE: ${mine_type}`);
    fs_1.default.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(404);
            return res.end("ERROE: 404 - File Not Found");
        }
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.writeHead(200, { 'Content-Type': mine_type });
        return res.end(data);
    });
});
server.listen(port, function () {
    console.log(`server running at port: ${port}`);
});
//# sourceMappingURL=server.js.map