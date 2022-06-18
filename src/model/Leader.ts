import mongojs from "mongojs"
import { DB } from "../db"

class Leader{
    leaderCollection:string = "leaders"
    assignCollection:string = "assigns"
    leaderId :string
    db:any

    constructor(leaderId:string){
        this.leaderId = leaderId
        this.db = new DB()
    }

    async getInfo(){
        let field = {_id:mongojs.ObjectId(this.leaderId)}
        try {
            let data = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.leaderCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 5000
        }
    }

    async updateInfo(updateData:any){
        let field = {_id:mongojs.ObjectId(this.leaderId)}
        try {
            let data = await this.db.UPDATE_DOCUMENT_WITH_FIELD(this.leaderCollection,field,{$set:updateData})
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async delete(){
        let field= {_id:mongojs.ObjectId(this.leaderId)}
        try {
            let data = await this.db.DELETE_DOCUMENT_WITH_FIELDS(this.leaderCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }

    async assign(assign:any){
        try {
          let data = await this.db.CREATE_DOCUMENT(this.assignCollection,assign)  
          this.db.db.close()
          return data
        } catch (error) {
            throw 500
        }
    }
}
export {Leader}