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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const config_json_1 = __importDefault(require("./../config.json"));
const bakadb_1 = __importDefault(require("./bakadb"));
const log = console.log;
const server = net_1.default.createServer();
server.listen(config_json_1.default.port, () => {
    log(`Listening on: ${config_json_1.default.port}`);
});
server.on('connection', socket => {
    let data = '';
    const timeout = setTimeout(() => {
        socket.destroy();
    }, config_json_1.default.connectionTimeout * 1e3);
    socket.on('data', chunk => data += chunk);
    socket.on('end', () => {
        log(`[SERVER] socket sent: ${data}`);
        clearTimeout(timeout);
    });
});
const bakadb = new bakadb_1.default();
bakadb.set('a/b/c', 123);
const socket = net_1.default.connect(config_json_1.default.port, 'localhost');
socket.on('connect', () => __awaiter(void 0, void 0, void 0, function* () {
    log(`[CLIENT] connection established`);
    socket.write('HELLO SERVER');
    socket.end();
}));
socket.on('close', () => {
    log(`[CLIENT] the connection closed`);
});
//# sourceMappingURL=index.js.map