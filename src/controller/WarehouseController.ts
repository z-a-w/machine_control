import { WareHouse } from "../model/Warehouse";

class WareHouseController {
    async getStock(req: any,res: any){
    req.checkParams("warehouseId","warehouseId must be mongoId").notEmpty()
    let validationError = req.validationErrors()
    if(validationError) return res.status(400).json(validationError)

        try {
            let warehouse = new WareHouse(req.params.warehouseId)
            let data = await warehouse.getStock()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg:"Sever Error"})
        }
    }

    async createNewStock(req:any,res:any){
        req.checkParams("id","id must be mongo Id").isMongoId()
        req.checkBody("name","name should not be empty").notEmpty()
        req.checkBody("totalInstock","totalInstock must be number").isInt()
        req.checkBody("unit","unit should not be empty").notEmpty()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)

        req.body.from = req.params.id;
        try {
            let wareHouse = new WareHouse(req.params.id)
            await wareHouse.createNewStock(req.body)
            res.status(200).json({msg:"stock created"})
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }

    }

    async stockIn(req:any,res:any){
        req.checkParams("id","id must be mongoId").isMongoId
        req.checkBody("amount","amount should not be empty").notEmpty()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let warehouse= new WareHouse(req.params.id)
            await warehouse.stockIn(req.body.amount)
            res.status(200).json({msg:"Stock Increased"})
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }
    }

    async stockOut(req:any,res:any){
        req.checkParams("id","id must be mongoId").isMongoId
        req.checkBody("amount","amount should not be empty").notEmpty()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let warehouse= new WareHouse(req.params.id)
            await warehouse.stockOut(req.body.amount)
            res.status(200).json({msg:"Stock Increased"})
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }
    }


}
export {WareHouseController}