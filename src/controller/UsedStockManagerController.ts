import { UsedStockManager } from "../model/UsedStockManager";

class UsedStockManagerController {

    async getDataWithRange(req: any, res: any) {
        req.checkParams("rawId", "rawId should not be empty").notEmpty()
        req.checkParams("cbproductionId", "cbproductionId should not be empty").notEmpty()
        req.checkBody("startDate", "startDate should not be empty").notEmpty()
        req.checkBody("endDate", "endDate should not be empty").notEmpty()
        let validationErrors = req.validationErrors()
        if (validationErrors) return res.status(400).json(validationErrors)

        try {
            let usedStockManager = new UsedStockManager()
            let data = await usedStockManager.getDataWithRange(req.params.rawId, req.params.cbproductionId, req.body.startDate, req.body.endDate)
            res.status(200).json(data)
        } catch (error) {
            res.status(error).json({ msg: "Server error" })
        }
    }

}

export { UsedStockManagerController }