import mongojs from "mongojs"
import { DB } from "../db"

class Operator {
    operatorCollection:string = "operators"
    finalFineOutputCollection:string="final_fine_outputs"
    finalDamageOutPutCollection:string= "final_damage_outputs"


    operatorId :string
    db:any
    constructor(operatorId: string = "not_supported") {
        this.operatorId = operatorId
        this.db = new DB()
    }

    async getInfo(){
        let field = {_id:mongojs.ObjectId(this.operatorId)}
        try {
            let data = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.operatorCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async updateInfo(updateData:any){
        let field = {_id:mongojs.ObjectId(this.operatorId)}
        try {
            let data = await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.operatorCollection,field,{$set:updateData})
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async delete(){
        let field = {_id:mongojs.ObjectId(this.operatorId)}
        try {
            let data = await this.db.DELETE_DOCUMENT_WITH_FIELDS(this.operatorCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    // async finalFineOutput(count:number){
    //     let field = {operatorId:this.operatorId}
    //     try {
    //         let updateData = {count :count}
    //         let data = await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.finalFineOutput,field,{$inc:{updateData}})
    //         this.db.db.close()
    //         return data
    //     } catch (error) {
    //         throw 500
    //     }
    // }

    // async finalDamageOutput(count:number){
    //     let field = {opertorId:this.operatorId}
    //     try {
    //         let updateData = {count:-count}
    //         let data = await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.finalDamageOutPutCollection,field,{$set:updateData})
    //         this.db.db.close()
    //         return data
    //     } catch (error) {
    //         throw 500
    //     }
    // }

}
export {Operator}