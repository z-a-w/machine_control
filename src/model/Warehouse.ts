import mongojs from "mongojs"
import { DB } from "../db"

class WareHouse {
    warehouseCollection:string = "warehouses"
    stockCollection:string = "stocks"
    stockRecordCollection = "stockRecords"


    warehouseId :string
    db:any
    constructor(warehouseId: string ) {
        this.warehouseId = warehouseId
        this.db = new DB()
    }

    async getInfo(){
        let field = {_id:mongojs.ObjectId(this.warehouseId)}
        try {
            let data = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.warehouseCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async updateInfo(updateData:any){
        let field = {_id:mongojs.ObjectId(this.warehouseId)}
        try {
            let data = await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.warehouseCollection,field,{$set:updateData})
            this.db.db.close()
            return data
        } catch (error) {
           throw 500 
        }
    }

    async delete(){
        let field = {_id:mongojs.ObjectId(this.warehouseId)}
        try {
            let data = await this.db.DELETE_DOCUMENT_WITH_FIELDS(this.warehouseCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }
    async getStocks(){
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

    async stockIn(stockId:string,amount:number){
        let field = {_id:mongojs.ObjectId(stockId)}
        try {
            let stockData = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.stockCollection,field)
            let recordData = {
                from:this.warehouseId,
                item :stockData._id,
                type : "in",
                count:amount,
                unit:stockData.unit,
                createdAt:new Date()

            }
            await this.db.CREATE_DOCUMENT(this.stockRecordCollection,recordData)
            let updateInstock = stockData.totalInstock+ amount;
            let updateData ={totalInstock:updateInstock,lastUpdatedAt: new Date()}

             await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.stockCollection,field,{$set: updateData})
             this.db.db.close()
        } catch (error) {
            throw 500
        }
    }

    async stockOut(stockId:string,amount:number){
        let field = {_id:mongojs.ObjectId(stockId)}
        try {
            let stockData = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.stockCollection,field)
            let recordData = {
                from:this.warehouseId,
                item :stockData._id,
                type : "out",
                count:amount,
                unit:stockData.unit,
                createdAt:new Date()
            }
            await this.db.CREATE_DOCUMENT(this.stockRecordCollection,recordData)
            let updateInstock = stockData.totalInstock - amount;
            let updateData ={totalInstock:updateInstock,lastUpdatedAt:new Date()}
             await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.stockCollection,field,{$set: updateData})
             this.db.db.close()
        } catch (error) {
            throw 500
        }

    }
}
export {WareHouse}