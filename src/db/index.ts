import mongojs from "mongojs"
import Promise from "core-js-pure/features/promise"

class DB {
    dbName: string = "machine"
    db: any

    constructor() {
        this.db = mongojs(this.dbName)
    }

    GET_ALL_DOCUMENTS(collectionName: string, requiredFields: any = {}) {
        return new Promise((resolve: any, reject: any) => {
            this.db[collectionName].find({}, requiredFields, (err: any, data: any) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    GET_ALL_DOCUMENTS_WITH_FIELDS(collectionName: string, fields: any, requiredFields: any = {}) {
        return new Promise((resolve: any, reject: any) => {
            this.db[collectionName].find(fields, requiredFields, (err: any, data: any) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    GET_ONE_DOCUMENT_WITH_FIELDS(collectionName: string, fields: any, requiredFields: any = {}) {
        return new Promise((resolve: any, reject: any) => {
            this.db[collectionName].findOne(fields, requiredFields, (err: any, data: any) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    DELETE_DOCUMENT_WITH_FIELDS(collectionName: string, fields: any) {
        return new Promise((resolve: any, reject: any) => {
            this.db[collectionName].remove(fields, (err: any, data: any) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    CREATE_DOCUMENT(collectionName: string, document: any) {
        return new Promise((resolve: any, reject: any) => {
            this.db[collectionName].insert(document, (err: any, data: any) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    UPDATE_DOCUMENT_WITH_FIELD(collectionName: string, fields: any, updateFields: any) {
        return new Promise((resolve: any, reject: any) => {
            this.db[collectionName].update(fields, updateFields, (err: any, data: any) => {
                if (err) reject(err)
                else resolve(data)
            })
        })
    }

    GET_DATA_WITH_SKIP_AND_LIMIT(collectionName: string, skip: number, limit: number) {
        return new Promise((resolve: any, reject: any) => {
            this.db[collectionName].aggregate(
                [
                    {
                        $facet: {
                            totalData: [
                                { $skip: skip },
                                { $limit: limit },
                                { $sort: { createdAt: -1 } },
                            ],
                        },
                    },
                ],
                (err: any, data: { totalData: any }[]) => {
                    if (err) reject(err);
                    else resolve(data[0].totalData);
                }
            );
        })
    }

    GET_DATA_WITH_SKIP_AND_LIMIT_AND_FIELDS(collectionName: string, fields: any, skip: number, limit: number, sort: any = { createdAt: -1 }) {
        return new Promise((resolve: any, reject: any) => {
            this.db[collectionName].aggregate(
                [
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
                ],
                (err: any, data: { totalData: any }[]) => {
                    if (err) reject(err);
                    else resolve(data[0].totalData);
                }
            );
        })
    }

    GET_TOTAL_COUNT(collectionName: string, fields: any = {}) {
        return new Promise((resolve: any, reject: any) => {
            this.db[collectionName].count(fields, (err: any, data: any) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
    }

    GET_RANDOM_WITH_LIMIT(collectionName: string, limit: number) {
        return new Promise((resolve: any, reject: any) => {
            this.db[collectionName].aggregate(
                [{ $sample: { size: limit } }],
                (err: any, data: any) => {
                    if (err) reject(err);
                    else resolve(data);
                }
            );
        });
    }

    GET_DATA_WITH_ARRAY_OF_ID(collectionName: string, idArr: Array<string>) {
        for (let i = 0; i < idArr.length; i++) {
            idArr[i] = mongojs.ObjectId(idArr[i])
        }
        return new Promise((resolve: any, reject: any) => {
            this.db[collectionName].find({
                _id: {
                    $in: idArr
                }
            },
                (err: any, data: any) => {
                    if (err) reject(err);
                    else resolve(data)
                }
            );
        })
    }

}


export { DB }