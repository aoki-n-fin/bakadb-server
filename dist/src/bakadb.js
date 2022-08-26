"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const print_maps_1 = __importDefault(require("@/print-maps"));
class BakaDB {
    constructor(path = './bdb') {
        this.db = {};
        console.log('bakadb construction');
        setInterval(() => {
            console.clear();
            console.log('db: ' + (0, print_maps_1.default)(this.db));
        }, 1337);
    }
    set(path, value) {
        (0, lodash_1.set)(this.db, path.replace(/\/+/g, '.'), value);
    }
    get(path, fallback) {
        return (0, lodash_1.get)(this.db, path.replace(/\/+/g, '.'), fallback);
    }
}
exports.default = BakaDB;
//# sourceMappingURL=bakadb.js.map