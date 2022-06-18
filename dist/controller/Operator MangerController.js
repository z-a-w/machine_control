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
exports.OperatorManagerController = void 0;
const OperatorManager_1 = require("../model/OperatorManager");
class OperatorManagerController {
    totalOperator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let operatorManager = new OperatorManager_1.OperatorManager();
                let data = yield operatorManager.totalOperator();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(error).json({ msg: "Server Error!" });
            }
        });
    }
    operatorWithRange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkBody("skip", "skip should not be empty").notEmpty();
            req.checkBody("limit should not be emprty").notEmpty();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let operatorManager = new OperatorManager_1.OperatorManager();
                let data = yield operatorManager.operatorWithRange(req.body.skip, req.body.limit);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(error).json({ msg: "Server Error!" });
            }
        });
    }
    searchOperator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("serchText", "searchText should not be empty").notEmpty();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let operatorManager = new OperatorManager_1.OperatorManager();
                let data = yield operatorManager.searchOperator(req.params.searchText);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(error).json({ msg: "Server Error!" });
            }
        });
    }
}
exports.OperatorManagerController = OperatorManagerController;
