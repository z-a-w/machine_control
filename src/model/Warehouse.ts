import mongojs from "mongojs"
import { DB } from "../db"

class WareHouse {
    warehouseCollection:string = "warehouses"
    stockCollection:string = "stocks"


    warehouseId :string
    db:any
    constructor(warehouseId: string = "not_supported") {
        this.warehouseId = warehouseId
        this.db = new DB()
    }
    async getStock(){
        let field = {from:this.warehouseId}
        try {
            let data = await this.db.GET_ALL_DOCUMENTS_WITH_FIELDS(this.stockCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }

    }
    
    async createNewStock(stock:any){

        try {
            let data = await this.db.CREATE_DOCUMENT(this.stockCollection,stock)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async stockIn(amount:number){
        let field = {from : this.warehouseId}
        try {
            let stockData = this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.stockCollection,field)
            let updateData = stockData.totalInstock+ amount
             await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.stockCollection,field,{$set: updateData})
             this.db.db.close()
        } catch (error) {
            throw 500
        }

    }

    async stockOut(amount:number){
        let field = {from : this.warehouseId}
        try {
            let stockData = this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.stockCollection,field)
            let updateData = stockData.totalInstock-amount
             await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.stockCollection,field,{$set: updateData})
             this.db.db.close()
        } catch (error) {
            throw 500
        }

    }    
    
}
export {WareHouse}