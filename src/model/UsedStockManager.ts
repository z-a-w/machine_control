import mongojs from "mongojs"
import { DB } from "../db"

class UsedStockManager {

    usedStockCollection: string = "used_stocks"
    db: any

    constructor() {
        this.db = new DB()
    }

    async createUsedStock(usedStock: any) {
        try {
            let data = await this.db.CREATE_DOCUMENT(this.usedStockCollection, usedStock)
            return data
        } catch (error) {
            throw 500
        }
    }

}

export { UsedStockManager }