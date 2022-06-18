import { Leader } from "../model/Leader";

class LeaderController {

    async getInfo(req: any,res: any){
        req.checkParams("id","id must be mongo Id").isMongoId()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let leader = new Leader(req.params.id)
            let data = await leader.getInfo()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg:"Server Error!"})
        }
    }

    async updateInfo(req:any,res:any){
        req.checkParams("id","id must be mongoId").isMongoId()
        req.checkBody("name","name should not be empty").notEmpty()
        req.checkBody("phone","phone should not be empty").notEmpty()
        req.checkBody("password","password should not be empty").notEmpty()
        req.checkBody("address","address should not be empty").notEmpty()
        req.checkBody("profile","profile should not be empty").notEmpty()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let leader = new Leader(req.params.id)
            await leader.updateInfo(req.body)
            res.status(200).json({msg:"Data Updated!"})
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }
    }

    async delete(req: any,res: any){
        req.checkParams("id","id must be mongoId").isMongoId()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let leader = new Leader(req.params.id)
            await leader.delete()
            res.status(200).json({msg:"Data Deleted!"})
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }
    }

    async assign(req:any,res:any){
        req.checkParams("leaderId","leaderId must be mongo Id").isMongoId()
        req.checkBody("cbProductionId","cbProductionId should not be empty").notEmpty
        req.checkBody("operatorId","operatorId must be mongoId").isMongoId()
        req.checkBody("count","count should be number").isInt()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        req.body.leaderId = req.params.leaderId
        req.body.createdAt  = new Date()
        try {
            let leader = new Leader(req.params.id)
            let data = await leader.assign(req.body)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg:"Server Error!"})
        }

    }
}
export {LeaderController}