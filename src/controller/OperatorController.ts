import { Operator } from "../model/Operator";

class OperatorController{
    async getInfo(req:any,res:any){
        req.checkParams("id","id must be mongoId").isMongoId();
        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        let operator = new Operator(req.params.id)
        try {
            let data = await operator.getInfo()
            res.status(200).json(data)
        } catch (error:any) {
            res.status(500).json(error)
        }
    }

    async updateInfo(req: any,res: any){
        req.checkParams("id","id must be mongo Id").isMongoId()
        req.checkBody("name","name should not be empty ").notEmpty()
        req.checkBody("phone","phone should not be empty").isInt()
        req.checkBody("address","address should not be empty").notEmpty()
        req.checkBody("profile","profile should not be empty").notEmpty()
        req.checkBody("password","password should not be empty").isInt()
        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)
        try {
            let operator = new Operator(req.params.id)
            let data = await operator.updateInfo(req.body)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async delete(req: any,res: any){
        req.checkParams("id","id must be mongoId").isMongoId()
        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)
        try {
            let operator = new Operator(req.params.id)
            let data = await operator.delete()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    
}
export {OperatorController}
