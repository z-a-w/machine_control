import { System } from "../model/System";

class SystemController {

    async createWarehouse(req: any,res: any){
        req.checkBody("name","name should not be empty").notEmpty()
        req.checkBody("location","location should not be empty").notEmpty()
        let validationErrors = req.validationErrors()
        if(validationErrors) return res.status(400).json(validationErrors)
        req.body.createdAt = new Date()
        try {
            let system = new System()
            let data = await system.createWarehouse(req.body)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }
    }

}
export {SystemController}