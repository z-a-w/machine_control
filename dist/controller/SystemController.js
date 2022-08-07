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
exports.SystemController = void 0;
const System_1 = require("../model/System");
class SystemController {
    createWarehouse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkBody("name", "name should not be empty").notEmpty();
            req.checkBody("photo", "photo should not be empty").notEmpty();
            req.checkBody("location", "location should not be empty").notEmpty();
            req.checkBody("note", "note should not be empty").notEmpty();
            let validationErrors = req.validationErrors();
            console.log(validationErrors);
            if (validationErrors)
                return res.status(400).json(validationErrors);
            req.body.createdAt = new Date();
            try {
                let system = new System_1.System();
                let data = yield system.createWarehouse(req.body);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error" });
            }
        });
    }
    getWarehouses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let system = new System_1.System();
                let data = yield system.getWarehouses();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(error).json({ msg: "Server Error" });
            }
        });
    }
    createCbProduction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkBody("name", "name should not be empty").notEmpty();
            req.checkBody("photo", "photo should not be empty").notEmpty();
            req.checkBody("totalOutputCount", "total output count").isInt();
            req.checkBody("location", "location should not be empty").notEmpty();
            req.checkBody("note", "note should not be empty").notEmpty();
            let validationErrors = req.validationErrors();
            if (validationErrors)
                return res.status(400).json(validationErrors);
            req.body.createdAt = new Date();
            req.body.rawItems = [];
            try {
                let system = new System_1.System();
                let data = yield system.createCbProduction(req.body);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(error).json({ msg: "Server Error" });
            }
        });
    }
    getCbProductions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let system = new System_1.System();
                let data = yield system.getCbProductions();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(error).json({ msg: "Server Error" });
            }
        });
    }
}
exports.SystemController = SystemController;
