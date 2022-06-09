"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const mongojs_1 = __importDefault(require("mongojs"));
const promise_1 = __importDefault(require("core-js-pure/features/promise"));
class DB {
    constructor() {
        this.dbName = "machine";
        this.db = (0, mongojs_1.default)(this.dbName);
    }
    GET_ALL_DOCUMENTS(collectionName, requiredFields = {}) {
        return new promise_1.default((resolve, reject) => {
            this.db[collectionName].find({}, requiredFields, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    GET_ALL_DOCUMENTS_WITH_FIELDS(collectionName, fields, requiredFields = {}) {
        return new promise_1.default((resolve, reject) => {
            this.db[collectionName].find(fields, requiredFields, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    GET_ONE_DOCUMENT_WITH_FIELDS(collectionName, fields, requiredFields = {}) {
        return new promise_1.default((resolve, reject) => {
            this.db[collectionName].findOne(fields, requiredFields, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    DELETE_DOCUMENT_WITH_FIELDS(collectionName, fields) {
        return new promise_1.default((resolve, reject) => {
            this.db[collectionName].remove(fields, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    CREATE_DOCUMENT(collectionName, document) {
        return new promise_1.default((resolve, reject) => {
            this.db[collectionName].insert(document, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    UPDATE_DOCUMENT_WITH_FIELD(collectionName, fields, updateFields) {
        return new promise_1.default((resolve, reject) => {
            this.db[collectionName].update(fields, updateFields, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    GET_DATA_WITH_SKIP_AND_LIMIT(collectionName, skip, limit) {
        return new promise_1.default((resolve, reject) => {
            this.db[collectionName].aggregate([
                {
                    $facet: {
                        totalData: [
                            { $skip: skip },
                            { $limit: limit },
                            { $sort: { createdAt: -1 } },
                        ],
                    },
                },
            ], (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data[0].totalData);
            });
        });
    }
    GET_DATA_WITH_SKIP_AND_LIMIT_AND_FIELDS(collectionName, fields, skip, limit, sort = { createdAt: -1 }) {
        return new promise_1.default((resolve, reject) => {
            this.db[collectionName].aggregate([
                {
                    $facet: {
                        totalData: [
                            { $match: fields },
                            { $skip: skip },
                            { $limit: limit },
                            { $sort: sort },
                        ],
                    },
                },
            ], (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data[0].totalData);
            });
        });
    }
    GET_TOTAL_COUNT(collectionName, fields = {}) {
        return new promise_1.default((resolve, reject) => {
            this.db[collectionName].count(fields, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    GET_RANDOM_WITH_LIMIT(collectionName, limit) {
        return new promise_1.default((resolve, reject) => {
            this.db[collectionName].aggregate([{ $sample: { size: limit } }], (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
    GET_DATA_WITH_ARRAY_OF_ID(collectionName, idArr) {
        for (let i = 0; i < idArr.length; i++) {
            idArr[i] = mongojs_1.default.ObjectId(idArr[i]);
        }
        return new promise_1.default((resolve, reject) => {
            this.db[collectionName].find({
                _id: {
                    $in: idArr
                }
            }, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
}
exports.DB = DB;
