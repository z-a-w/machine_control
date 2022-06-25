import { UsedStock } from "../model/UsedStock";

class UsedStockController {
    async getInfo(req:any,res:any){
        req.checkParams("id","id must be mogoId").isMongoId()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let useStock = new UsedStock(req.params.id)
            let data = await useStock.getInfo()
            return data
        } catch (error) {
            throw error
        }
    }

    // async updateInfo(req: any,res: any){
    //  req.checkParams("id","id must be mongoId").isMongoId()
    //  req.checkBody("")
    //  let validationError = req.validationErrors()
    //     if(validationError) return res.status(400).json(validationError)
    //     try {
    //         let useStock = new UsedStock(req.params.id)
    //         let data = await useStock.updateInfo(req.body)
    //         return data
    //     } catch (error) {
    //         throw error
    //     } 
    // }

    async delete(req: any,res: any){
        req.checkParams("id","id must be mongoId").isMongoId()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let useStock = new UsedStock(req.params.id)
            let data = await useStock.delete()
            return data
        } catch (error) {
            throw error
        }
    }
}
export {UsedStockController}