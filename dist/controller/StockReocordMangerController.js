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
exports.StockRecordManagerController = void 0;
const StockRecordManager_1 = require("../model/StockRecordManager");
class StockRecordManagerController {
    getRecordWithDateAndRange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("warehouseId", "warehouseId must be mongoId").isMongoId();
            req.checkParams("itemId", "itemId must be mongoId").isMongoId();
            req.checkBody("startDate", "startDate should not be empty").notEmpty();
            req.checkBody("endDate", "endDate should not be empty").notEmpty();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let stockRecordManager = new StockRecordManager_1.StockRcordManager();
                console.log(req.params.warehouseId);
                console.log(req.params.itemId);
                console.log(req.body);
                let data = yield stockRecordManager.getRecordWithDateAndRange(req.params.warehouseId, req.params.itemId, req.body.startDate, req.body.endDate);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error!" });
            }
        });
    }
}
exports.StockRecordManagerController = StockRecordManagerController;
