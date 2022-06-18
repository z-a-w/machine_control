import mongojs from "mongojs"
import { DB } from "../db"

class System {
    stockCollection:string = "stocks"
    wareHouseCollection:string="warehouses"
    stockRecordCollection:string ="stockRecords"

    db:any
    constructor() {
        this.db = new DB()
    }

    async createWarehouse(wareHouse:any){
        try {
            let data = await this.db.CREATE_DOCUMENT(this.wareHouseCollection,wareHouse)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }
    

}
export {System}