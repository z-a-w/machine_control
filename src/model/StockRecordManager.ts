import mongojs from "mongojs"
import { DB } from "../db"

class StockRcordManager {
    stockRecordCollection:string = "stockRecords"
    db: any

    constructor() {
        this.db = new DB()
    }

    async getRecordWithDateAndRange(warehouseId:string,itemId:string,startDate:string,endDate:string){
        let field = {
            from:warehouseId,
            item:itemId,
             createdAt: {
                $gte:new Date(startDate),
                $lt:new Date(endDate),
             }
        }

        try {
            let data = await this.db.GET_ALL_DOCUMENTS_WITH_FIELDS(this.stockRecordCollection,field)
            console.log(data)
            this.db.db.close();
            return data
        } catch (error) {
            throw 500
        }
    }
}
export {StockRcordManager}
