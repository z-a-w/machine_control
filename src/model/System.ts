import { DB } from "../db"

class System {

    stockCollection: string = "stocks"
    wareHouseCollection: string = "warehouses"
    stockRecordCollection: string = "stockRecords"
    cbProductionCollection: string = "cbproductions"
    db: any

    constructor() {
        this.db = new DB()
    }

    async createWarehouse(wareHouse: any) {
        try {
            let data = await this.db.CREATE_DOCUMENT(this.wareHouseCollection, wareHouse)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async getWarehouses() {
        try {
            let data = await this.db.GET_ALL_DOCUMENTS(this.wareHouseCollection)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async createCbProduction(cbProduction: any) {
        try {
            let data = await this.db.CREATE_DOCUMENT(this.cbProductionCollection, cbProduction)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async getCbProductions() {
        try {
            let data = await this.db.GET_ALL_DOCUMENTS(this.cbProductionCollection)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }
    

}
export { System }