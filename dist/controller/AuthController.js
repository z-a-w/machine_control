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
exports.AuthController = void 0;
const Auth_1 = require("../Auth");
class AuthController {
    registerOperator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkBody("name", "name should not be empty ").notEmpty();
            req.checkBody("phone", "phone should not be empty").isInt();
            req.checkBody("address", "address should not be empty").notEmpty();
            req.checkBody("profile", "profile should not be empty").notEmpty();
            req.checkBody("password", "password should not be empty").isInt();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let auth = new Auth_1.Auth();
                let data = yield auth.registerOperator(req.body);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error!" });
            }
        });
    }
    loginOperator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkBody("phone", "phone should not be empty").notEmpty();
            req.checkBody("password", "password should not be empty").isInt();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let auth = new Auth_1.Auth();
                let data = yield auth.loginOperator(req.body.phone, req.body.password);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error!" });
            }
        });
    }
    verifyOperator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers['x-access-token'];
            try {
                let auth = new Auth_1.Auth();
                let data = yield auth.verifyOperator(token);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error" });
            }
        });
    }
    registerLeader(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkBody("name", "name should not be empty").notEmpty();
            req.checkBody("phone", "phone should not be empty").notEmpty();
            req.checkBody("password", "password length should be greater than 6").isLength(6);
            req.checkBody("address", "address should not be empty").notEmpty();
            req.checkBody("profile", "profile should not be empty").notEmpty();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let auth = new Auth_1.Auth();
                let data = yield auth.registerLeader(req.body);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error!" });
            }
        });
    }
    loginLeader(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkBody("phone", "phone should not be empty").notEmpty();
            req.checkBody("password", "password should not be empty").isInt();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let auth = new Auth_1.Auth();
                let data = yield auth.loginLeader(req.body.phone, req.body.password);
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ msg: "Server Error" });
            }
        });
    }
}
exports.AuthController = AuthController;
