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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assign = void 0;
const mongojs_1 = __importDefault(require("mongojs"));
const db_1 = require("../db");
class Assign {
    constructor(assignId) {
        this.assignCollection = "assigns";
        this.finalRecordCollection = "finalRecords";
        this.assignId = assignId;
        this.db = new db_1.DB();
    }
    getInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(this.assignId) };
            try {
                let data = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.assignCollection, field);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateInfo(updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(this.assignId) };
            try {
                let data = yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.assignCollection, field, { $set: updateData });
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(this.assignId) };
            try {
                let data = yield this.db.DELETE_DOCUMENT_WITH_FIELDS(this.assignCollection, field);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    doneAssign(count, fineOut, damageOut) {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(this.assignId) };
            try {
                //get assign datas
                let assignData = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.assignCollection, field);
                if (!assignData)
                    return 404;
                let body = {
                    _id: this.assignId,
                    count: count,
                    fineOut: fineOut,
                    damageOut: damageOut,
                    cbProductionId: assignData.cbProductionId,
                    operatorId: assignData.operatorId,
                    leaderId: assignData.leaderId,
                    done: true,
                    createdAt: new Date(),
                };
                // store in final record collection
                let data = yield this.db.CREATE_DOCUMENT(this.finalRecordCollection, body);
                //delelt done assign from assign collection
                yield this.db.DELETE_DOCUMENT_WITH_FIELDS(this.assignCollection, field);
                this.db.db.close();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    unDoneAssign(count, fineOut, damagedOut) {
        return __awaiter(this, void 0, void 0, function* () {
            let field = { _id: mongojs_1.default.ObjectId(this.assignId) };
            try {
                //get assign datas
                let assignData = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.assignCollection, field);
                if (!assignData)
                    return 404;
                let body = {
                    _id: this.assignId,
                    count: count,
                    fineOut: fineOut,
                    damagedOut: damagedOut,
                    cbProductionId: assignData.cbProductionId,
                    operatorId: assignData.operatorId,
                    leaderId: assignData.leaderId,
                    done: false,
                    createdAt: new Date(),
                };
                // get final record  
                let fields = { _id: body._id };
                let finalRecordData = yield this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.finalRecordCollection, fields);
                console.log(finalRecordData);
                if (!finalRecordData) {
                    try {
                        //if not exist create final record
                        yield this.db.CREATE_DOCUMENT(this.finalRecordCollection, body);
                    }
                    catch (error) {
                        console.log("can't create finalRecord!");
                        console.log(error);
                        throw error;
                    }
                }
                else {
                    try {
                        //if exist update final record
                        let currentCount = assignData.count - count;
                        let updateData = { count: currentCount };
                        yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.finalRecordCollection, fields, { $set: updateData });
                    }
                    catch (error) {
                        console.log("can't update final record");
                        throw error;
                    }
                }
                //get undone amount
                let newAssignCount = assignData.count - count;
                console.log(newAssignCount);
                let updateAssignCount = { count: newAssignCount };
                // update assign with undone amount
                let data = yield this.db.UPDATE_DOCUMENT_WITH_FIELD(this.assignCollection, fields, { $set: updateAssignCount });
                this.db.db.close();
            }
            catch (error) {
                throw 500;
            }
        });
    }
}
exports.Assign = Assign;
