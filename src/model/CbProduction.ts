import mongojs from "mongojs"
import { DB } from "../db"

class CbProduction {
    cbProductionCollection: string = "cbproductions"
    stockCollection: string = "stocks"
    stockRecordCollection: string = "stockRecords"
    usedStockCollection: string = "used_stocks"
    cbProductionId: string
    db: any

    constructor(cbProductionId: string) {
        this.cbProductionId = cbProductionId
        this.db = new DB()
    }

    async getInfo() {
        let field = { _id: mongojs.ObjectId(this.cbProductionId) }
        try {
            let data = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.cbProductionCollection, field)

            let rawIdArr: Array<string> = []
            // Get raw
            data.raws.map((raw: any) => {
                rawIdArr.push(raw.rawId)
            })
            console.log(rawIdArr)
            let rawData = await this.db.GET_DATA_WITH_ARRAY_OF_ID(this.stockCollection, rawIdArr)
            console.log(rawData)
            data.raws = rawData
            return data
        } catch (error) {
            console.log(error)
            throw 500
        }
    }

    async updateInfo(updateData: any) {
        let field = { _id: mongojs.ObjectId(this.cbProductionId) }
        try {
            let data = await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.cbProductionCollection, field, { $set: updateData })
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async delete() {
        let field = { _id: mongojs.ObjectId(this.cbProductionId) }
        try {
            let data = await this.db.DELETE_DOCUMENT_WITH_FIELDS(this.cbProductionCollection, field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async insertRaw(rawId: string) {
        let field = { _id: mongojs.ObjectId(this.cbProductionId) }
        let updateField = { $push: { raws: { rawId, input: 0, lastOutput: 0 } } }
        try {
            let data = await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.cbProductionCollection, field, updateField)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async removeRaw(rawId: string) {
        let field = { _id: mongojs.ObjectId(this.cbProductionId) }
        let updateField = { $pull: { raws: { rawId } } }
        try {
            let data = await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.cbProductionCollection, field, updateField)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async changeRaw(rawId: string, rawCount: number, outCount: number, damagedCount: number) {
        // Check the old raw from model
        let cpField = { _id: mongojs.ObjectId(this.cbProductionId), "raws.rawId": rawId }
        let oldRawCount
        let totalOutputCount
        let lastOutput = 0
        try {
            let data = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.cbProductionCollection, cpField, { raws: 1, totalOutputCount: 1 })
            totalOutputCount = data.totalOutputCount
            data.raws.map((raw: any) => {
                if (raw.rawId === rawId) {
                    oldRawCount = raw.input
                    lastOutput = raw.lastOutput
                }
            })
        } catch (error) {
            console.log(error)
            throw 500
        }

        // Insert data to the used collection
        let netCount = outCount - (totalOutputCount + lastOutput)
        let usedData = {
            rawCount: oldRawCount,
            fineOut: netCount - damagedCount,
            damagedOut: damagedCount,
            totalOut: outCount,
            rawId: rawId,
            cbproductionId: this.cbProductionId,
            createdAt: new Date(),
        }
        try {
            await this.db.CREATE_DOCUMENT(this.usedStockCollection, usedData)
        } catch (error) {
            throw 500
        }

        // Remove from the stock collection
        let stockField = { _id: mongojs.ObjectId(rawId) }
        let stockUpdateField = { $inc: { totalInstock: -rawCount } }
        try {
            await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.stockCollection, stockField, stockUpdateField)
        } catch (error) {
            throw 500
        }

        // Insert into the stock record
        try {
            let stockData = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.stockCollection, stockField)

            let recordData = {
                from: stockData.from,
                item: rawId,
                type: "get",
                count: rawCount,
                unit: stockData.unit,
                createdAt: new Date()
            }

            await this.db.CREATE_DOCUMENT(this.stockRecordCollection, recordData)
        } catch (error) {
            throw 500
        }

        // Update in the model
        let newLastOutput = netCount + lastOutput
        let cpUpdateField = { $set: { "raws.$.input": rawCount, "raws.$.lastOutput": newLastOutput } }
        try {
            await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.cbProductionCollection, cpField, cpUpdateField)
            this.db.db.close()
            return
        } catch (error) {
            throw 500
        }
    }
}

export { CbProduction }