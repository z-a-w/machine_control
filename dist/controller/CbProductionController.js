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
exports.CbProductionController = void 0;
const CbProduction_1 = require("../model/CbProduction");
class CbProductionController {
    getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id should be mongoId").isMongoId();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            let cbProduction = new CbProduction_1.CbProduction(req.params.id);
            try {
                let data = yield cbProduction.getInfo();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ msg: "Server error" });
            }
        });
    }
    updateInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id should be mongoId").isMongoId();
            req.checkBody("name", "name should not be empty").notEmpty();
            req.checkBody("location", "location should not be empty").notEmpty();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            let cbProduction = new CbProduction_1.CbProduction(req.params.id);
            try {
                yield cbProduction.updateInfo(req.body);
                res.status(200).json({ msg: "Data Updated !" });
            }
            catch (error) {
                res.status(500).json({ msg: "Server error" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id should be mongoId").isMongoId();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            let cbProduction = new CbProduction_1.CbProduction(req.params.id);
            try {
                yield cbProduction.delete();
                res.status(200).json({ msg: "Data deleted !" });
            }
            catch (error) {
                res.status(error).json({ msg: "Server error" });
            }
        });
    }
    insertRaw(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id should be mongoId").isMongoId();
            req.checkParams("rawId", "rawId should not be empty").isMongoId();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            let cbProduction = new CbProduction_1.CbProduction(req.params.id);
            try {
                let data = yield cbProduction.insertRaw(req.params.rawId);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(error).json({ msg: "Server error" });
            }
        });
    }
    removeRaw(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id should be mongoId").isMongoId();
            req.checkParams("rawId", "rawId should be mongoId").isMongoId();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            let cbProduction = new CbProduction_1.CbProduction(req.params.id);
            try {
                let data = yield cbProduction.removeRaw(req.params.rawId);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(error).json({ msg: "Server error" });
            }
        });
    }
    getRaw(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id should be mongoId").isMongoId();
            req.checkBody("rawId", "rawId should be mongoId").isMongoId();
            req.checkBody("count", "chound should be number").isInt();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            let cbProduction = new CbProduction_1.CbProduction(req.params.id);
            try {
                let data = yield cbProduction.getRaw(req.body.rawId, req.body.count);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(error).json({ msg: "Server error" });
            }
        });
    }
}
exports.CbProductionController = CbProductionController;
