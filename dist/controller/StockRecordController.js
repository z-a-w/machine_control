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
exports.StockRecordController = void 0;
const StockRecord_1 = require("../model/StockRecord");
class StockRecordController {
    getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongoId").isMongoId();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            let stockRecord = new StockRecord_1.StockRecords(req.params.id);
            try {
                let data = yield stockRecord.getInfo();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    updateInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongoId").isMongoId();
            req.checkBody("from", "from should not be empty").notEmpty();
            req.checkBody("name", "name should not be empty").notEmpty();
            req.checkBody("totalInstock", "totalInstock must be number").isInt();
            req.checkBody("unit", "unit should not be empty").notEmpty();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            try {
                let stockRecord = new StockRecord_1.StockRecords(req.params.id);
                let data = yield stockRecord.updateInfo(req.body);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    deleteInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongoId").isMongoId();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            try {
                let stockRecord = new StockRecord_1.StockRecords(req.params.id);
                let data = yield stockRecord.deleteInfo();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.StockRecordController = StockRecordController;
