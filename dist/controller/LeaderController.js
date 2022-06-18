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
exports.LeaderController = void 0;
const Leader_1 = require("../model/Leader");
class LeaderController {
    getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongo Id").isMongoId();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let leader = new Leader_1.Leader(req.params.id);
                let data = yield leader.getInfo();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error!" });
            }
        });
    }
    updateInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongoId").isMongoId();
            req.checkBody("name", "name should not be empty").notEmpty();
            req.checkBody("phone", "phone should not be empty").notEmpty();
            req.checkBody("password", "password should not be empty").notEmpty();
            req.checkBody("address", "address should not be empty").notEmpty();
            req.checkBody("profile", "profile should not be empty").notEmpty();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let leader = new Leader_1.Leader(req.params.id);
                yield leader.updateInfo(req.body);
                res.status(200).json({ msg: "Data Updated!" });
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
                let leader = new Leader_1.Leader(req.params.id);
                yield leader.delete();
                res.status(200).json({ msg: "Data Deleted!" });
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error" });
            }
        });
    }
    assign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("leaderId", "leaderId must be mongo Id").isMongoId();
            req.checkBody("operatorId", "operatorId must be mongoId").isMongoId();
            req.checkBody("count", "count should be number").isInt();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            req.body.createdAt = new Date();
            try {
                let leader = new Leader_1.Leader(req.params.id);
                let data = yield leader.assign(req.body);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error!" });
            }
        });
    }
}
exports.LeaderController = LeaderController;
