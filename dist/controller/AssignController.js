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
exports.AssignController = void 0;
const Assign_1 = require("../model/Assign");
class AssignController {
    getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongoId").isMongoId();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let assign = new Assign_1.Assign(req.params.id);
                let data = yield assign.getInfo();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(error).json({ msg: "Server Error!" });
            }
        });
    }
    updateInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongoId").isMongoId();
            req.checkBody("leaderId", "leaderId must be mongoId").isMongoId();
            req.checkBody("operatorId", "operatorId must be mongoId").isMongoId();
            req.checkBody("count", "count should not be empty").notEmpty();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let assign = new Assign_1.Assign(req.params.id);
                yield assign.updateInfo(req.body);
                res.status(200).json({ mag: "Assign Updated!" });
            }
            catch (error) {
                res.status(error).json({ msg: "Server Error!" });
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
                let assign = new Assign_1.Assign(req.params.id);
                yield assign.delete();
                res.status(200).json({ msg: "Deleted!" });
            }
            catch (error) {
                res.status(error).json({ msg: "Server Error!" });
            }
        });
    }
    doneAssign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongoId").isMongoId();
            req.checkBody("count", "count should not be empty").isInt();
            req.checkBody("fineOut", "fineOut should not be empty").isInt();
            req.checkBody("damageOut", "damageOut should not be empty").isInt();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let assign = new Assign_1.Assign(req.params.id);
                yield assign.doneAssign(req.body.count, req.body.fineOut, req.body.damageOut);
                res.status(200).json({ msg: "Assign Done!" });
            }
            catch (error) {
                res.status(error).json({ msg: "Server Error!" });
            }
        });
    }
    unDoneAssign(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongo Id").isMongoId();
            req.checkBody("count", "count shoutd not be empty").isInt();
            req.checkBody("fineOut", "fineOut should not be empty").isInt();
            req.checkBody("damageOut", "damageOut should not be empty").isInt();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let assign = new Assign_1.Assign(req.params.id);
                yield assign.unDoneAssign(req.body.count, req.body.fineOut, req.body.damageOut);
                res.status(200).json({ msg: "Undone assign" });
            }
            catch (error) {
                res.status(error).json({ msg: "Server Error!" });
            }
        });
    }
}
exports.AssignController = AssignController;
