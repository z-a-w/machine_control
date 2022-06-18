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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockRcordManager = void 0;
const db_1 = require("../db");
class StockRcordManager {
    constructor() {
        this.stockRecordCollection = "stockRecords";
        this.db = new db_1.DB();
    }
    getRecordWithDateAndRange(warehouseId, itemId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            let field = {
                from: warehouseId,
                item: itemId,
                createdAt: {
                    $gte: new Date(startDate),
                    $lt: new Date(endDate),
                }
            };
            console.log(field);
            try {
                let data = yield this.db.GET_ALL_DOCUMENTS_WITH_FIELDS(this.stockRecordCollection, field);
                console.log(data);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
}
exports.StockRcordManager = StockRcordManager;
