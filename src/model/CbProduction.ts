import mongojs from "mongojs"
import { DB } from "../db"

class CbProduction {
    cbProductionCollection: string = "cbproductions"
    stockCollection: string = "stocks"
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
            this.db.db.close()
            return data
        } catch (error) {
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
        let updateField = { $push: { raws: { rawId, input: 0 } } }
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

    async getRaw(rawId: string, count: number) {
        // Check the old raw from model
        let cpField = { _id: mongojs.ObjectId(this.cbProductionId), "raws.rawId": rawId }
        try {
            let data = this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.cbProductionCollection, cpField)
            return data
        } catch (error) {
            throw 500
        }

        // // Check the old raw from model
        // let cpField = { _id: mongojs.ObjectId(this.cbProductionId), "raws.rawId": rawId }


        // // Remove from stock collection
        // let stockField = { _id: mongojs.ObjectId(rawId) }
        // let stockUpdateField = { $inc: { totalInstock: -count } }
        // try {
        //     await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.stockCollection, stockField, stockUpdateField)
        // } catch (error) {
        //     throw 500
        // }

        // // Insert to the model
        // let cpUpdateField = { $set: { "raws.$.input": count } }
        // try {
        //     await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.cbProductionCollection, cpField, cpUpdateField)
        // } catch (error) {
        //     throw 500
        // }
    }

}

export { CbProduction }