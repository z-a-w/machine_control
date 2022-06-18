import { OperatorManager } from "../model/OperatorManager";

class OperatorManagerController{
    async totalOperator(req: any,res: any){
        try {
            let operatorManager = new OperatorManager()
            let data = await operatorManager.totalOperator()
            res.status(200).json(data)
        } catch (error) {
            res.status(error).json({msg:"Server Error!"})
        }
    }

    async operatorWithRange(req:any,res:any){
        req.checkBody("skip","skip should not be empty").notEmpty()
        req.checkBody("limit should not be emprty").notEmpty()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let operatorManager = new OperatorManager()
            let data = await operatorManager.operatorWithRange(req.body.skip,req.body.limit)
            res.status(200).json(data)
        } catch (error) {
            res.status(error).json({msg:"Server Error!"})
        }
    }

    async searchOperator(req:any,res:any){
        req.checkParams("serchText","searchText should not be empty").notEmpty()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let operatorManager = new OperatorManager()
            let data = await operatorManager.searchOperator(req.params.searchText)
            res.status(200).json(data)
        } catch (error) {
            res.status(error).json({msg:"Server Error!"})
        }
    }

}
export {OperatorManagerController}