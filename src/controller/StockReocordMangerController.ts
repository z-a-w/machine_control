import { StockRcordManager } from "../model/StockRecordManager";

class StockRecordManagerController {
    async getRecordWithDateAndRange(req: any,res: any){
        req.checkParams("warehouseId","warehouseId must be mongoId").isMongoId()
        req.checkParams("itemId","itemId must be mongoId").isMongoId()
        req.checkBody("startDate","startDate should not be empty").notEmpty()
        req.checkBody("endDate","endDate should not be empty").notEmpty()
        let validationError= req.validationErrors() 
        if(validationError) return res.status(400).json(validationError)
        try {
            let stockRecordManager =  new StockRcordManager()
            console.log(req.params.warehouseId)
            console.log(req.params.itemId)
            console.log(req.body)
            let data = await stockRecordManager.getRecordWithDateAndRange(req.params.warehouseId,req.params.itemId,req.body.startDate,req.body.endDate)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg:"Server Error!"})
        }

    }
}
export {StockRecordManagerController}