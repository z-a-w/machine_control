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
const mongojs_1 = __importDefault(require("mongojs"));
const db_1 = require("../db");
class Stock {
    constructor(operatorId = "not_supported") {
        this.operatorCollection = "operators";
        this.finalFineOutputCollection = "final_fine_outputs";
        this.finalDamageOutPutCollection = "final_damage_outputs";
        this.operatorId = operatorId;
        this.db = new db_1.DB();
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(this.operatorId) };
            try {
                let data = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.operatorCollection, field);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
    updateInfo(updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(this.operatorId) };
            try {
                let data = yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.operatorCollection, field, { $set: updateData });
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(this.operatorId) };
            try {
                let data = yield this.db.DELETE_DOCUMENT_WITH_FIELDS(this.operatorCollection, field);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
    finalFineOutput(count) {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { operatorId: this.operatorId };
            try {
                let updateData = { count: count };
                let data = yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.finalFineOutput, field, { $inc: { updateData } });
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
    fianlDamageOutput(count) {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { opertorId: this.operatorId };
            try {
                let updateData = { count: -count };
                let data = yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.finalDamageOutPutCollection, field, { $set: updateData });
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
}
