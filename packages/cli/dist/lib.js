"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
let id = 0;
const rpc = (url, method, ...params) => axios_1.default.post(url, { jsonrpc: "2.0", id: id++, method, params }).then(response => response.data.result);
exports.testRPC = (url) => () => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield rpc(url, 'eth_blockNumber');
        return !!response;
    }
    catch (e) {
        return false;
    }
});
