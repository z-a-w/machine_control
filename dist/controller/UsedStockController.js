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
exports.UsedStockController = void 0;
const UsedStock_1 = require("../model/UsedStock");
class UsedStockController {
    getInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mogoId").isMongoId();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let useStock = new UsedStock_1.UsedStock(req.params.id);
                let data = yield useStock.getInfo();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    // async updateInfo(req: any,res: any){
    //  req.checkParams("id","id must be mongoId").isMongoId()
    //  req.checkBody("")
    //  let validationError = req.validationErrors()
    //     if(validationError) return res.status(400).json(validationError)
    //     try {
    //         let useStock = new UsedStock(req.params.id)
    //         let data = await useStock.updateInfo(req.body)
    //         return data
    //     } catch (error) {
    //         throw error
    //     } 
    // }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.checkParams("id", "id must be mongoId").isMongoId();
            let validationError = req.validationErrors();
            if (validationError)
                return res.status(400).json(validationError);
            try {
                let useStock = new UsedStock_1.UsedStock(req.params.id);
                let data = yield useStock.delete();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UsedStockController = UsedStockController;
