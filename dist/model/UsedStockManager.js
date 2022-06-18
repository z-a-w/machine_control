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
exports.UsedStockManager = void 0;
const db_1 = require("../db");
class UsedStockManager {
    constructor() {
        this.usedStockCollection = "used_stocks";
        this.db = new db_1.DB();
    }
    getDataWithRange(rawId, cbproductionId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            let field = {
                rawId,
                cbproductionId,
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            };
            try {
                let data = yield this.db.GET_ALL_DOCUMENTS_WITH_FIELDS(this.usedStockCollection, field);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw 500;
            }
        });
    }
}
exports.UsedStockManager = UsedStockManager;
