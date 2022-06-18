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
exports.WareHouse = void 0;
const mongojs_1 = __importDefault(require("mongojs"));
const db_1 = require("../db");
class WareHouse {
    constructor(warehouseId) {
        this.warehouseCollection = "warehouses";
        this.stockCollection = "stocks";
        this.stockRecordCollection = "stockRecords";
        this.warehouseId = warehouseId;
        this.db = new db_1.DB();
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(this.warehouseId) };
            try {
                let data = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.warehouseCollection, field);
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
            let field = { _id: mongojs_1.default.ObjectId(this.warehouseId) };
            try {
                let data = yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.warehouseCollection, field, { $set: updateData });
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
            let field = { _id: mongojs_1.default.ObjectId(this.warehouseId) };
            try {
                let data = yield this.db.DELETE_DOCUMENT_WITH_FIELDS(this.warehouseCollection, field);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
    getStocks() {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { from: this.warehouseId };
            try {
                let data = yield this.db.GET_ALL_DOCUMENTS_WITH_FIELDS(this.stockCollection, field);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
    createNewStock(stock) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.db.CREATE_DOCUMENT(this.stockCollection, stock);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
    stockIn(stockId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(stockId) };
            try {
                let stockData = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.stockCollection, field);
                let recordData = {
                    from: this.warehouseId,
                    item: stockData._id,
                    type: "in",
                    count: amount,
                    unit: stockData.unit,
                    createdAt: new Date()
                };
                yield this.db.CREATE_DOCUMENT(this.stockRecordCollection, recordData);
                let updateInstock = stockData.totalInstock + amount;
                let updateData = { totalInstock: updateInstock, lastUpdatedAt: new Date() };
                yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.stockCollection, field, { $set: updateData });
                this.db.db.close();
            }
            catch (error) {
                throw 500;
            }
        });
    }
    stockOut(stockId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(stockId) };
            try {
                let stockData = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.stockCollection, field);
                let recordData = {
                    from: this.warehouseId,
                    item: stockData._id,
                    type: "out",
                    count: amount,
                    unit: stockData.unit,
                    createdAt: new Date()
                };
                yield this.db.CREATE_DOCUMENT(this.stockRecordCollection, recordData);
                let updateInstock = stockData.totalInstock - amount;
                let updateData = { totalInstock: updateInstock, lastUpdatedAt: new Date() };
                yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.stockCollection, field, { $set: updateData });
                this.db.db.close();
            }
            catch (error) {
                throw 500;
            }
        });
    }
}
exports.WareHouse = WareHouse;
