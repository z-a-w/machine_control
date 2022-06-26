import { Auth } from "../Auth";

class AuthController {
    async registerOperator(req: any,res: any){
        req.checkBody("name","name should not be empty ").notEmpty()
        req.checkBody("phone","phone should not be empty").isInt()
        req.checkBody("address","address should not be empty").notEmpty()
        req.checkBody("profile","profile should not be empty").notEmpty()
        req.checkBody("password","password should not be empty").isInt()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let auth = new Auth()
            let data= await auth.registerOperator(req.body)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg:"Server Error!"})
        }
    }

    async loginOperator(req:any,res:any){
        req.checkBody("phone","phone should not be empty").notEmpty()
        req.checkBody("password","password should not be empty").isInt()
        let validationError= req.validationErrors()
        if(validationError)return res.status(400).json(validationError)
        try {
            let auth = new Auth()
            let data =  await auth.loginOperator(req.body.phone,req.body.password)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg:"Server Error!"})
        }
        }

    async verifyOperator(req:any,res:any){
        const token: string = req.headers['x-access-token']
        try {
            let auth = new Auth()
            let data = await auth.verifyOperator(token)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }
    }


    async registerLeader(req: any,res: any){
    req.checkBody("name","name should not be empty").notEmpty()
    req.checkBody("phone","phone should not be empty").notEmpty()
    req.checkBody("password","password length should be greater than 6").isLength(6)
    req.checkBody("address","address should not be empty").notEmpty()
    req.checkBody("profile","profile should not be empty").notEmpty()
    let validationError = req.validationErrors()
    if(validationError) return res.status(400).json(validationError)
    try {
        let auth = new Auth()
        let data = await auth.registerLeader(req.body)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({msg:"Server Error!"})
    }
    }

    async loginLeader(req:any,res:any){
        req.checkBody("phone","phone should not be empty").notEmpty()
        req.checkBody("password","password should not be empty").isInt()
        let validationError = req.validationErrors()
        if(validationError) return res.status(400).json(validationError)
        try {
            let auth = new Auth()
            let data = await auth.loginLeader(req.body.phone,req.body.password)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }


    }
    async verifyLeader(req:any,res:any){
        const token: string = req.headers['x-access-token']
        try {
            let auth = new Auth()
            // let data = await auth.verifyLeader(token)
            // res.status(200).json(data)
        } catch (error) {
            res.status(500).json({msg:"Server Error"})
        }
    }
    
}
export {AuthController}