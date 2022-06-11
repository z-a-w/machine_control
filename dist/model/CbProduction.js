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
exports.CbProduction = void 0;
const mongojs_1 = __importDefault(require("mongojs"));
const db_1 = require("../db");
class CbProduction {
    constructor(cbProductionId) {
        this.cbProductionCollection = "cbproductions";
        this.stockCollection = "stocks";
        this.cbProductionId = cbProductionId;
        this.db = new db_1.DB();
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(this.cbProductionId) };
            try {
                let data = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.cbProductionCollection, field);
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
            let field = { _id: mongojs_1.default.ObjectId(this.cbProductionId) };
            try {
                let data = yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.cbProductionCollection, field, { $set: updateData });
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
            let field = { _id: mongojs_1.default.ObjectId(this.cbProductionId) };
            try {
                let data = yield this.db.DELETE_DOCUMENT_WITH_FIELDS(this.cbProductionCollection, field);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
    insertRaw(rawId) {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(this.cbProductionId) };
            let updateField = { $push: { raws: { rawId, input: 0 } } };
            try {
                let data = yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.cbProductionCollection, field, updateField);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
    removeRaw(rawId) {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(this.cbProductionId) };
            let updateField = { $pull: { raws: { rawId } } };
            try {
                let data = yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.cbProductionCollection, field, updateField);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
    getRaw(rawId, count) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check the old raw from model
            let cpField = { _id: mongojs_1.default.ObjectId(this.cbProductionId), "raws.rawId": rawId };
            try {
                let data = this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.cbProductionCollection, cpField);
                return data;
            }
            catch (error) {
                throw 500;
            }
            // // Check the old raw from model
            // let cpField = { _id: mongojs.ObjectId(this.cbProductionId), "raws.rawId": rawId }
            // // Remove from stock collection
            // let stockField = { _id: mongojs.ObjectId(rawId) }
            // let stockUpdateField = { $inc: { totalInstock: -count } }
            // try {
            //     await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.stockCollection, stockField, stockUpdateField)
            // } catch (error) {
            //     throw 500
            // }
            // // Insert to the model
            // let cpUpdateField = { $set: { "raws.$.input": count } }
            // try {
            //     await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.cbProductionCollection, cpField, cpUpdateField)
            // } catch (error) {
            //     throw 500
            // }
        });
    }
}
exports.CbProduction = CbProduction;
