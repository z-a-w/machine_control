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
exports.StockController = void 0;
const Stock_1 = require("../model/Stock");
class StockController {
    getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongoId").isMongoId();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            let stock = new Stock_1.Stock(req.params.id);
            try {
                let data = yield stock.getInfo();
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
            req.checkBody("name", "name should not be empty").notEmpty();
            req.checkBody("photo", "photo should not be empty").notEmpty();
            req.checkBody("unit", "unit should not be empty").notEmpty();
            req.checkBody("note", "note should not be empty").notEmpty();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            // Modify
            req.body.totalInstock = parseInt(req.body.totalInstock);
            req.body.showAlertAt = parseInt(req.body.showAlertAt);
            try {
                let stock = new Stock_1.Stock(req.params.id);
                let data = yield stock.updateInfo(req.body);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongoId").isMongoId();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            try {
                let stock = new Stock_1.Stock(req.params.id);
                let data = yield stock.delete();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getDataWithMonth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id should not be empty").notEmpty();
            req.checkParams("month", "month should not be empty").notEmpty();
            req.checkParams("year", "year should not be empty").notEmpty();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            console.log(req.params);
            try {
                let stock = new Stock_1.Stock(req.params.id);
                let data = yield stock.getDataWithMonth(parseInt(req.params.month), parseInt(req.params.year));
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ msg: "Server error" });
            }
        });
    }
}
exports.StockController = StockController;
