import { LeaderManager } from "../model/leaderManager";

class LeaderManagerController {
    async totalLeader(req: any,res: any){
        try {
            let leaderManager = new LeaderManager()
            let data = await leaderManager.totalLeader()
            res.status(200).json(data)
        } catch (error) {
            res.status(error).json({msg:"Server Error!"})
        }
    }

    async leaderWithRange(req: any,res: any){
        req.checkBody("skip","skip should not be empty").notEmpty()
        req.checkBody("limit","limit should not be empty").notEmpty()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let leaderManager = new LeaderManager()
            let data = await leaderManager.leaderWithRange(req.body.skip,req.body.limit)
            res.status(200).json(data)
        } catch (error) {
            res.status(error).json({msg:"Server Error!"})
        }
    }

    async searchLeader(req:any,res:any){
        req.checkParams("searchText","searchText should not be empty").notEmpty()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let leaderManager = new LeaderManager()
            let data = await leaderManager.searchLeader(req.params.searchText)
            res.status(200).json(data)
        } catch (error) {
            res.status(error).json({msg:"Server Error!"})
        }

    }
}
export {LeaderManagerController}