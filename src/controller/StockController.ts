import { Stock } from "../model/Stock";

class StockController {
    async getInfo(req:any,res:any){
        req.checkParams("id","id must be mongoId").isMongoId();
        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)

        let stock = new Stock(req.params.id)
        try {
            let data = await stock.getInfo()
            res.status(200).json(data)
        } catch (error:any) {
            res.status(500).json(error)
        }
    }

    async updateInfo(req: any,res: any){
        req.checkParams("id","id must be mongoId").isMongoId()
        req.checkBody("name","name should not be empty").notEmpty()
        req.checkBody("unit","unit should not be empty").notEmpty()
        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)
        
        try {
            let stock = new Stock(req.params.id)
            let data = await stock.updateInfo(req.body)
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
            let stock = new Stock(req.params.id)
            let data = await stock.delete()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
export {StockController}