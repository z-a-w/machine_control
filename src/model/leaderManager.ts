import mongojs from "mongojs"
import { DB } from "../db"

class LeaderManager{
    leaderCollection:string = "leaders"
    db:any

    constructor(){
        this.db = new DB()
    }

    async totalLeader(){
        try {
            let data = await this.db.GET_TOTAL_COUNT(this.leaderCollection)
            this.db.db.close()
            return data
        } catch (error) {
            throw error
        }
    }

    async leaderWithRange(skip:number,limit:number){
        try {
            let data = await this.db.GET_DATA_WITH_SKIP_AND_LIMIT(this.leaderCollection,skip,limit)
            this.db.db.close()
            return data
        } catch (error) {
            throw error
        }
    }
    
    async searchLeader(searchText:string){
        try {
            let field = {$text:{$search:searchText}}
            let data = await this.db.GET_ALL_DOCUMENTS_WITH_FIELDS(this.leaderCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw error
        }
    }

    
}
export {LeaderManager}