import { WareHouse } from "../model/Warehouse";

class WareHouseController {

    async getInfo (req: any,res: any){
        req.checkParams("id","id must be mongo Id").isMongoId()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let warehouse = new WareHouse(req.params.id)
            let data = await warehouse.getInfo()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }
    }


    async updateInfo(req:any,res:any){
        req.checkParams("id","id must be mongo Id").isMongoId()
        req.checkBody("name","name should not be empty").notEmpty()
        req.checkBody("location","location should not be empty").notEmpty()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let warehouse = new WareHouse(req.params.id)
            await warehouse.updateInfo(req.body)
            res.status(200).json({msg:" Warehouse Updated!"})
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }
    }
    
    async delete(req:any,res:any){
        req.checkParams("id","id must be mongoId").isMongoId()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let warehouse = new WareHouse(req.params.id)
            await warehouse.delete()
            res.status(200).json({msg:" Warehouse Deleted!"})
        } catch (error) {
            res.status(500).json({msg:"Server Error!"})
        }
    }

    async getStock(req: any,res: any){
    req.checkParams("id","id should must be mongoId").isMongoId()
    let validationError = req.validationErrors()
    if(validationError) return res.status(400).json(validationError)

        try {
            let warehouse = new WareHouse(req.params.id)
            let data = await warehouse.getStocks()
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
        req.body.createdAt = new Date()
        try {
            let wareHouse = new WareHouse(req.params.id)
            await wareHouse.createNewStock(req.body)
            res.status(200).json({msg:"stock created"})
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }

    }

    async stockIn(req:any,res:any){
        req.checkParams("warehouseId","warehouseId must be mongoId").isMongoId()
        req.checkParams("stockId","stockId must be mongoId ").isMongoId()
        req.checkBody("amount","amount should not be empty").notEmpty()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let warehouse= new WareHouse(req.params.warehouseId)
            await warehouse.stockIn(req.params.stockId,req.body.amount)
            res.status(200).json({msg:"Stock Increased"})
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }
    }

    async stockOut(req:any,res:any){
        req.checkParams("warehousId","warehousId must be mongoId").isMongoId()
        req.checkParams("stockId","stockId must be mongoId").isMongoId()
        req.checkBody("amount","amount should not be empty").notEmpty()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let warehouse= new WareHouse(req.params.id)
            await warehouse.stockOut(req.params.stockId,req.body.amount)
            res.status(200).json({msg:"Stock Decreased"})
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }
    }


}
export {WareHouseController}