import { Assign } from "../model/Assign";

class AssignController {
    async getInfo(req:any,res:any){
        req.checkParams("id","id must be mongoId").isMongoId()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let assign = new Assign(req.params.id)
            let data = await assign.getInfo()
            res.status(200).json(data)
        } catch (error) {
            res.status(error).json({msg:"Server Error!"})
        }
    }
    async updateInfo(req: any,res: any){
        req.checkParams("id","id must be mongoId").isMongoId()
        req.checkBody("leaderId","leaderId must be mongoId").isMongoId()
        req.checkBody("operatorId","operatorId must be mongoId").isMongoId()
        req.checkBody("count","count should not be empty").notEmpty()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)

        try {
            let assign = new Assign(req.params.id)
            await assign.updateInfo(req.body)
            res.status(200).json({mag:"Assign Updated!"})
        } catch (error) {
            res.status(error).json({msg:"Server Error!"})
        }
    }

    async delete(req:any,res:any){
        req.checkParams("id","id must be mongoId").isMongoId()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)

        try {
            let assign  = new Assign(req.params.id)
            await assign.delete()
            res.status(200).json({msg:"Deleted!"})
        } catch (error) {
            res.status(error).json({msg:"Server Error!"})
        }
    }

    async doneAssign(req: any,res: any){
        req.checkParams("id","id must be mongoId").isMongoId()
        req.checkBody("count","count should not be empty").isInt()
        req.checkBody("fineOut","fineOut should not be empty").isInt()
        req.checkBody("damageOut","damageOut should not be empty").isInt()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)

        try {
            let assign = new Assign(req.params.id)
            await assign.doneAssign(req.body.count,req.body.fineOut,req.body.damageOut)
            res.status(200).json({msg:"Assign Done!"})
        } catch (error) {
            res.status(error).json({msg:"Server Error!"})
        }
    }

    async unDoneAssign(req:any,res:any){
        req.checkParams("id","id must be mongo Id").isMongoId()
        req.checkBody("count","count shoutd not be empty").isInt()
        req.checkBody("fineOut","fineOut should not be empty").isInt()
        req.checkBody("damageOut","damageOut should not be empty").isInt()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)

        try {
            let assign = new Assign(req.params.id)
            await assign.unDoneAssign(req.body.count,req.body.fineOut,req.body.damageOut)
            res.status(200).json({msg:"Undone assign"})
        } catch (error) {
            res.status(error).json({msg:"Server Error!"})
        }
    }
}
export {AssignController}