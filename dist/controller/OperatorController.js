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
exports.OperatorController = void 0;
const Operator_1 = require("../model/Operator");
class OperatorController {
    getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongoId").isMongoId();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            let operator = new Operator_1.Operator(req.params.id);
            try {
                let data = yield operator.getInfo();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    updateInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongo Id").isMongoId();
            req.checkBody("name", "name should not be empty ").notEmpty();
            req.checkBody("phone", "phone should not be empty").isInt();
            req.checkBody("address", "address should not be empty").notEmpty();
            req.checkBody("profile", "profile should not be empty").notEmpty();
            req.checkBody("password", "password should not be empty").isInt();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            try {
                let operator = new Operator_1.Operator(req.params.id);
                let data = yield operator.updateInfo(req.body);
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
                let operator = new Operator_1.Operator(req.params.id);
                let data = yield operator.delete();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.OperatorController = OperatorController;
