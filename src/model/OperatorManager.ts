import { DB } from "../db";

class OperatorManager{
    operatorCollection:string = "operator"
    db:any

    constructor(){
        this.db = new DB()
    }

    async totalOperator(){
        try {
            let data = await this.db.GET_TOTAL_COUNT(this.operatorCollection)
            this.db.db.close()
            return data
        } catch (error) {
            throw error
        }
    }

    async operatorWithRange(skip:number,limit:number){
        try {
            let data = await this.db.GET_DATA_SKIP_AND_LIMIT(this.operatorCollection,skip,limit)
            this.db.db.close()
            return data
        } catch (error) {
            throw error
        }
    }
    
    async searchOperator(searchText:string){
        try {
            let field = {$text:{$search:searchText}}
            let data = await this.db.GET_ALL_DOCUMENTS_WITH_FIELDS(this.operatorCollection,field)
            this.db.db.close()
            return data
        } catch (error) {
            throw error
        }
    }

}
export {OperatorManager}