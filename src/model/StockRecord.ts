import mongojs from "mongojs"
import { DB } from "../db"

class StockRecords {
    stockRecordCollection:string = "stockRecords"


    stockRecordId :string
    db:any
    constructor(stockRecordId: string = "not_supported") {
        this.stockRecordId = stockRecordId
        this.db = new DB()
    }
    async getInfo(){
        let field = {_id:mongojs.ObjectId(this.stockRecordId)}
        try {
            let data = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.stockRecordCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async updateInfo(updateData:any){
        let field = {_id:mongojs.ObjectId(this.stockRecordId)}
        try {
            let data = await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.stockRecordCollection,field,{$set: updateData})
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async delete(){
        let field = {_id:mongojs.ObjectId(this.stockRecordId)}
        try {
            let data = await this.db.DELETE_DOCUMENT_WITH_FIELDS(this.stockRecordCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }
}
export {StockRecords}