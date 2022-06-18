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
exports.WareHouseController = void 0;
const Warehouse_1 = require("../model/Warehouse");
class WareHouseController {
    getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongo Id").isMongoId();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let warehouse = new Warehouse_1.WareHouse(req.params.id);
                let data = yield warehouse.getInfo();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error" });
            }
        });
    }
    updateInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongo Id").isMongoId();
            req.checkBody("name", "name should not be empty").notEmpty();
            req.checkBody("location", "location should not be empty").notEmpty();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let warehouse = new Warehouse_1.WareHouse(req.params.id);
                yield warehouse.updateInfo(req.body);
                res.status(200).json({ msg: " Warehouse Updated!" });
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongoId").isMongoId();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let warehouse = new Warehouse_1.WareHouse(req.params.id);
                yield warehouse.delete();
                res.status(200).json({ msg: " Warehouse Deleted!" });
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error!" });
            }
        });
    }
    getStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id should must be mongoId").isMongoId();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let warehouse = new Warehouse_1.WareHouse(req.params.id);
                let data = yield warehouse.getStocks();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ msg: "Sever Error" });
            }
        });
    }
    createNewStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongo Id").isMongoId();
            req.checkBody("name", "name should not be empty").notEmpty();
            req.checkBody("totalInstock", "totalInstock must be number").isInt();
            req.checkBody("unit", "unit should not be empty").notEmpty();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            req.body.from = req.params.id;
            req.body.createdAt = new Date();
            try {
                let wareHouse = new Warehouse_1.WareHouse(req.params.id);
                yield wareHouse.createNewStock(req.body);
                res.status(200).json({ msg: "stock created" });
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error" });
            }
        });
    }
    stockIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("warehouseId", "warehouseId must be mongoId").isMongoId();
            req.checkParams("stockId", "stockId must be mongoId ").isMongoId();
            req.checkBody("amount", "amount should not be empty").notEmpty();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let warehouse = new Warehouse_1.WareHouse(req.params.warehouseId);
                yield warehouse.stockIn(req.params.stockId, req.body.amount);
                res.status(200).json({ msg: "Stock Increased" });
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error" });
            }
        });
    }
    stockOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("warehouseId", "warehousId must be mongoId").isMongoId();
            req.checkParams("stockId", "stockId must be mongoId").isMongoId();
            req.checkBody("amount", "amount should not be empty").notEmpty();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let warehouse = new Warehouse_1.WareHouse(req.params.id);
                yield warehouse.stockOut(req.params.stockId, req.body.amount);
                res.status(200).json({ msg: "Stock Decreased" });
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error" });
            }
        });
    }
}
exports.WareHouseController = WareHouseController;
