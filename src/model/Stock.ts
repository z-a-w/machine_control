import mongojs from "mongojs"
import { DB } from "../db"

class Stock {
    stockCollection:string = "stocks"
    stockId :string
    db:any
    
    constructor(stockId: string = "not_supported") {
        this.stockId = stockId
        this.db = new DB()
    }
    async getInfo(){
        let field = {_id:mongojs.ObjectId(this.stockId)}
        try {
            let data = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.stockCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async updateInfo(updateData:any){
        let field = {_id:mongojs.ObjectId(this.stockId)}
        try {
            let data = await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.stockCollection,field,{$set: updateData})
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async delete(){
        let field = {_id:mongojs.ObjectId(this.stockId)}
        try {
            let data = await this.db.DELETE_DOCUMENT_WITH_FIELDS(this.stockCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }
}
export {Stock}