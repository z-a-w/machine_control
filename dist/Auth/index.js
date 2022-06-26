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
exports.Auth = void 0;
const mongojs_1 = __importDefault(require("mongojs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
class Auth {
    constructor() {
        this.tokenKey = "bb2020$!@";
        this.operatorCollection = "operators";
        this.leaderCollection = "leaders";
        this.db = new db_1.DB();
    }
    registerOperator(operatorData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.db.CREATE_DOCUMENT(this.operatorCollection, operatorData);
                data.token = jsonwebtoken_1.default.sign({ _id: data._id }, this.tokenKey);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
    loginOperator(phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let fields = { phone, password };
            try {
                let data = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.operatorCollection, fields);
                this.db.db.close();
                if (!data)
                    throw 400;
                else {
                    data.token = jsonwebtoken_1.default.sign({ _id: data._id }, this.tokenKey);
                    return data;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    verifyOperator(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let decodedToken;
            try {
                decodedToken = jsonwebtoken_1.default.verify(token, this.tokenKey);
            }
            catch (error) {
                throw 400;
            }
            let fields = { _id: mongojs_1.default.ObjectId(decodedToken._id) };
            try {
                let user = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.operatorCollection, fields);
                this.db.db.close();
                if (!user)
                    throw 401;
                else
                    return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    registerLeader(leader) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.db.CREATE_DOCUMENT(this.leaderCollection, leader);
                data.token = jsonwebtoken_1.default.sign({ _id: data._id }, this.tokenKey);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    loginLeader(phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let fields = { phone, password };
            try {
                let data = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.leaderCollection, fields);
                this.db.db.close();
                if (!data)
                    throw 400;
                else {
                    data.token = jsonwebtoken_1.default.sign({ _id: data._id }, this.tokenKey);
                    return data;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    verifyLeader(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let decodedToken;
            try {
                decodedToken = jsonwebtoken_1.default.verify(token, this.tokenKey);
            }
            catch (error) {
                throw 400;
            }
            let fields = { _id: mongojs_1.default.ObjectId(decodedToken._id) };
            try {
                let user = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.leaderCollection, fields);
                this.db.db.close();
                if (!user)
                    throw 401;
                else
                    return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Auth = Auth;
