import mongojs from "mongojs"
import { DB } from "../db"

class Assign{
    assignCollection:string = "assigns"
    finalRecordCollection:string = "finalRecords"
    assignId:string
    db:any

    constructor(assignId:string){
        this.assignId = assignId
        this.db = new DB()
    }

    async getInfo(){
        let field = {_id:mongojs.ObjectId(this.assignId)}
        try {
            let data = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.assignCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw error
        }
    }

    async updateInfo(updateData:any){
        let field = {_id:mongojs.ObjectId(this.assignId)}
        try {
            let data = await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.assignCollection,field,{$set:updateData})
            this.db.db.close()
            return data
        } catch (error) {
            throw error
        }
    }
    
    async delete(){
        let field = {_id:mongojs.ObjectId(this.assignId)}
        try {
            let data = await this.db.DELETE_DOCUMENT_WITH_FIELDS(this.assignCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw error
        }
    }
    
    async doneAssign(count:number,fineOut:number,damageOut:number){
        let field = {_id:mongojs.ObjectId(this.assignId)}
        try {
            //get assign datas
            let assignData = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.assignCollection,field)
            if(!assignData) return 404
            let body={
                _id: this.assignId,
                 count : count,
                 fineOut : fineOut,
                 damageOut:damageOut,
                 cbProductionId : assignData.cbProductionId,
                 operatorId: assignData.operatorId,
                 leaderId: assignData.leaderId,
                 done:true,
                 createdAt:new Date(),
            }

            // store in final record collection
            let data =  await this.db.CREATE_DOCUMENT(this.finalRecordCollection,body)

            //delelt done assign from assign collection
            await this.db.DELETE_DOCUMENT_WITH_FIELDS(this.assignCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw error
        }
    }

    async unDoneAssign(count:number,fineOut:number,damagedOut:number){
        let field = {_id:mongojs.ObjectId(this.assignId)}
        try {
            //get assign datas
        let assignData = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.assignCollection,field)
        if(!assignData) return 404
        let body = {
            _id:this.assignId,
            count: count,
            fineOut:fineOut,
            damagedOut : damagedOut,
            cbProductionId:assignData.cbProductionId,
            operatorId:assignData.operatorId,
            leaderId:assignData.leaderId,
            done:false,
            createdAt:new Date(),
        }
        // get final record  
        let fields = {_id:body._id}
        let finalRecordData = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.finalRecordCollection,fields)
        console.log(finalRecordData)
        if(!finalRecordData) {
            try {
                //if not exist create final record
                await this.db.CREATE_DOCUMENT(this.finalRecordCollection,body)
            } catch (error) {
                console.log("can't create finalRecord!")
                console.log(error)
                throw error
            }
        }else {
            try {
                //if exist update final record
                let currentCount = assignData.count - count
                let updateData = {count:currentCount}
                await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.finalRecordCollection,fields,{$set:updateData})
            } catch (error) {
                console.log("can't update final record")
                throw error
            }
        }
        //get undone amount
        let newAssignCount = assignData.count-count
        console.log(newAssignCount)
        let updateAssignCount = {count:newAssignCount}
        // update assign with undone amount
        let data = await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.assignCollection,fields,{$set:updateAssignCount})
        
        this.db.db.close()
        } catch (error) {
            throw 500
        }
    }
}
export {Assign}