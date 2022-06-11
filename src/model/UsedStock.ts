import mongojs from "mongojs"
import { DB } from "../db"

class UsedStock {

    usedStockCollection: string = "used_stocks"
    usedStockId: string
    db: any

    constructor(usedStockId: string) {
        this.usedStockId = usedStockId
        this.db = new DB()
    }

    async getInfo() {
        let field = { _id: mongojs.ObjectId(this.usedStockId) }
        try {
            let data = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.usedStockCollection, field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async updateInfo(updateData: any) {
        let field = { _id: mongojs.ObjectId(this.usedStockId) }
        try {
            let data = await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.usedStockCollection, field, { $set: updateData })
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async delete() {
        let field = { _id: mongojs.ObjectId(this.usedStockId) }
        try {
            let data = await this.db.DELETE_DOCUMENT_WITH_FIELDS(this.usedStockCollection, field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

}

export { UsedStock }