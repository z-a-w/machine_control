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
exports.UsedStockManagerController = void 0;
const UsedStockManager_1 = require("../model/UsedStockManager");
class UsedStockManagerController {
    getDataWithRange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("rawId", "rawId should not be empty").notEmpty();
            req.checkParams("cbproductionId", "cbproductionId should not be empty").notEmpty();
            req.checkBody("startDate", "startDate should not be empty").notEmpty();
            req.checkBody("endDate", "endDate should not be empty").notEmpty();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            try {
                let usedStockManager = new UsedStockManager_1.UsedStockManager();
                let data = yield usedStockManager.getDataWithRange(req.params.rawId, req.params.cbproductionId, req.body.startDate, req.body.endDate);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(error).json({ msg: "Server error" });
            }
        });
    }
}
exports.UsedStockManagerController = UsedStockManagerController;
