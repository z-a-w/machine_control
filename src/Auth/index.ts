import mongojs from "mongojs"
import jwt from "jsonwebtoken"
import { DB } from "../db"

class Auth {

    db: any
    tokenKey: string = "bb2020$!@"
    operatorCollection:string = "operators"
    leaderCollection:string = "leaders"
    constructor() {
        this.db = new DB()
    }

    
    

    async registerOperator(operatorData:any){
        try {
            let data = await this.db.CREATE_DOCUMENT(this.operatorCollection,operatorData)
            data.token = jwt.sign({ _id:data._id}, this.tokenKey)
            this.db.db.close()
            return data
        } catch (error) {
            throw 500
        }
    }
    async loginOperator(phone:string,password:number){
        let fields = {phone,password}
        try {
            let data = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.operatorCollection,fields)
            this.db.db.close()
            if(!data) throw 400
            else{
                data.token = jwt.sign({ _id: data._id},this.tokenKey)
                return data
            }
        } catch (error) {
            throw error
        }
    }

    async verifyOperator(token: string) {
        let decodedToken
        try {
            decodedToken = jwt.verify(token, this.tokenKey)
        } catch (error) {
            throw 400
        }

        let fields = { _id: mongojs.ObjectId(decodedToken._id) }

        try {
            let user = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.operatorCollection, fields)
            this.db.db.close()
            if (!user) throw 401
            else return user
        } catch (error) {
            throw error
        }
    }

    async registerLeader(leader:any){
        try {
            let data = await this.db.CREATE_DOCUMENT(this.leaderCollection,leader)
            data.token = jwt.sign({ _id:data._id}, this.tokenKey)
            this.db.db.close()
            return data
        } catch (error) {
            throw error
        }
    }

    async loginLeader(phone:string,password:number){
        let fields = {phone,password}
        try {
            let data = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.leaderCollection,fields)
            this.db.db.close()
            if(!data) throw 400
            else{
                data.token = jwt.sign({ _id: data._id},this.tokenKey)
                return data
            }
        } catch (error) {
            throw error
        }
    }

    async verifyLeader(token: string) {
        let decodedToken
        try {
            decodedToken = jwt.verify(token, this.tokenKey)
        } catch (error) {
            throw 400
        }

        let fields = { _id: mongojs.ObjectId(decodedToken._id) }

        try {
            let user = await this.db.GET_ONE_DOCUMENT_WITH_FIELDS(this.leaderCollection, fields)
            this.db.db.close()
            if (!user) throw 401
            else return user
        } catch (error) {
            throw error
        }
    }


   

}

export { Auth }
