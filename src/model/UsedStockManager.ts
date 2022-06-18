import mongojs from "mongojs"
import { DB } from "../db"

class UsedStockManager {

    usedStockCollection: string = "used_stocks"
    db: any

    constructor() {
        this.db = new DB()
    }

    async getDataWithRange(rawId: string, cbproductionId: string, startDate: string, endDate: string) {
        let field = {
            rawId,
            cbproductionId,
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }
        try {
            let data = await this.db.GET_ALL_DOCUMENTS_WITH_FIELDS(this.usedStockCollection, field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

}

export { UsedStockManager }