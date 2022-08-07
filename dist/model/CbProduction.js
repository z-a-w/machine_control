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
        this.stockRecordCollection = "stockRecords";
        this.usedStockCollection = "used_stocks";
        this.cbProductionId = cbProductionId;
        this.db = new db_1.DB();
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(this.cbProductionId) };
            try {
                let data = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.cbProductionCollection, field);
                let rawIdArr = [];
                // Get raw
                data.raws.map((raw) => {
                    rawIdArr.push(raw.rawId);
                });
                console.log(rawIdArr);
                let rawData = yield this.db.GET_DATA_WITH_ARRAY_OF_ID(this.stockCollection, rawIdArr);
                console.log(rawData);
                data.raws = rawData;
                return data;
            }
            catch (error) {
                console.log(error);
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
            let updateField = { $push: { raws: { rawId, input: 0, lastOutput: 0 } } };
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
    changeRaw(rawId, rawCount, outCount, damagedCount) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check the old raw from model
            let cpField = { _id: mongojs_1.default.ObjectId(this.cbProductionId), "raws.rawId": rawId };
            let oldRawCount;
            let totalOutputCount;
            let lastOutput = 0;
            try {
                let data = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.cbProductionCollection, cpField, { raws: 1, totalOutputCount: 1 });
                totalOutputCount = data.totalOutputCount;
                data.raws.map((raw) => {
                    if (raw.rawId === rawId) {
                        oldRawCount = raw.input;
                        lastOutput = raw.lastOutput;
                    }
                });
            }
            catch (error) {
                console.log(error);
                throw 500;
            }
            // Insert data to the used collection
            let netCount = outCount - (totalOutputCount + lastOutput);
            let usedData = {
                rawCount: oldRawCount,
                fineOut: netCount - damagedCount,
                damagedOut: damagedCount,
                totalOut: outCount,
                rawId: rawId,
                cbproductionId: this.cbProductionId,
                createdAt: new Date(),
            };
            try {
                yield this.db.CREATE_DOCUMENT(this.usedStockCollection, usedData);
            }
            catch (error) {
                throw 500;
            }
            // Remove from the stock collection
            let stockField = { _id: mongojs_1.default.ObjectId(rawId) };
            let stockUpdateField = { $inc: { totalInstock: -rawCount } };
            try {
                yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.stockCollection, stockField, stockUpdateField);
            }
            catch (error) {
                throw 500;
            }
            // Insert into the stock record
            try {
                let stockData = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.stockCollection, stockField);
                let recordData = {
                    from: stockData.from,
                    item: rawId,
                    type: "get",
                    count: rawCount,
                    unit: stockData.unit,
                    createdAt: new Date()
                };
                yield this.db.CREATE_DOCUMENT(this.stockRecordCollection, recordData);
            }
            catch (error) {
                throw 500;
            }
            // Update in the model
            let newLastOutput = netCount + lastOutput;
            let cpUpdateField = { $set: { "raws.$.input": rawCount, "raws.$.lastOutput": newLastOutput } };
            try {
                yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.cbProductionCollection, cpField, cpUpdateField);
                this.db.db.close();
                return;
            }
            catch (error) {
                throw 500;
            }
        });
    }
}
exports.CbProduction = CbProduction;
