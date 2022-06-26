import { CbProduction } from "../model/CbProduction"

class CbProductionController {

    async getInfo(req: any, res: any) {
        req.checkParams("id", "id should be mongoId").isMongoId()
        let validationErrors = req.validationErrors()
        if (validationErrors) return res.status(400).json(validationErrors)

        let cbProduction = new CbProduction(req.params.id)
        try {
            let data = await cbProduction.getInfo()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ msg: "Server error" })
        }
    }

    async updateInfo(req: any, res: any) {
        req.checkParams("id", "id should be mongoId").isMongoId()
        req.checkBody("name", "name should not be empty").notEmpty()
        req.checkBody("location", "location should not be empty").notEmpty()
        req.checkBody("note","note should not be empty").notEmpty()
        let validationErrors = req.validationErrors()
        if (validationErrors) return res.status(400).json(validationErrors)

        let cbProduction = new CbProduction(req.params.id)
        try {
            await cbProduction.updateInfo(req.body)
            res.status(200).json({ msg: "Data Updated !" })
        } catch (error) {
            res.status(500).json({ msg: "Server error" })
        }
    }

    async delete(req: any, res: any) {
        req.checkParams("id", "id should be mongoId").isMongoId()
        let validationErrors = req.validationErrors()
        if (validationErrors) return res.status(400).json(validationErrors)

        let cbProduction = new CbProduction(req.params.id)
        try {
            await cbProduction.delete()
            res.status(200).json({ msg: "Data deleted !" })
        } catch (error) {
            res.status(error).json({ msg: "Server error" })
        }
    }

    async insertRaw(req: any, res: any) {
        req.checkParams("id", "id should be mongoId").isMongoId()
        req.checkParams("rawId", "rawId should not be empty").isMongoId()
        let validationErrors = req.validationErrors()
        if (validationErrors) return res.status(400).json(validationErrors)

        let cbProduction = new CbProduction(req.params.id)
        try {
            let data = await cbProduction.insertRaw(req.params.rawId)
            res.status(200).json(data)
        } catch (error) {
            res.status(error).json({ msg: "Server error" })
        }
    }

    async removeRaw(req: any, res: any) {
        req.checkParams("id", "id should be mongoId").isMongoId()
        req.checkParams("rawId", "rawId should be mongoId").isMongoId()
        let validationErrors = req.validationErrors()
        if (validationErrors) return res.status(400).json(validationErrors)

        let cbProduction = new CbProduction(req.params.id)
        try {
            let data = await cbProduction.removeRaw(req.params.rawId)
            res.status(200).json(data)
        } catch (error) {
            res.status(error).json({ msg: "Server error" })
        }
    }

    async changeRaw(req: any, res: any) {
        req.checkParams("id", "id should be mongoId").isMongoId()
        req.checkBody("rawId", "rawId should be mongoId").isMongoId()
        req.checkBody("count", "chound should be number").isInt()
        req.checkBody("outCount", "outCould should be number").isInt()
        req.checkBody("damagedCount", "damagedCount should be number").isInt()
        let validationErrors = req.validationErrors()
        if (validationErrors) return res.status(400).json(validationErrors)

        let cbProduction = new CbProduction(req.params.id)
        try {
            await cbProduction.changeRaw(req.body.rawId, req.body.count, req.body.outCount, req.body.damagedCount)
            res.status(200).json({ msg: "Raw changed successfully " })
        } catch (error) {
            res.status(error).json({ msg: "Server error" })
        }
    }

}

export { CbProductionController }