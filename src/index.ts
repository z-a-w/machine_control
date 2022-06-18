import express from "express"
import bodyParser from "body-parser"
import validator from "express-validator"
const fileUpload = require("express-fileupload")

import SystemRouter from "./router/SystemRouter"
import WarehouseRouter from "./router/WarehouseRouter"
import StockRecordRouter from "./router/StockRecordRouter"
import StockRouter from "./router/StockRouter"
import CbProductionRouter from "./router/CbProductionRouter"
import UsedStockManagerRouter from "./router/UsedStockManagerRouter"
import AuthRouter from "./router/AuthRouter"
import LeaderRouter from "./router/LeaderRouter"
import StockRecordMangerRouter from "./router/StockRecordManagerRouter"
import AssignRouter from "./router/Assign Router"
import LeaderManagerRouter from "./router/LeaderManagerRouter"
import OpereatorRouter from "./router/OperatorRouter"
import OperatorManagerRouter from "./router/OperatorManagerRouter"

class App {

    port: number = 3000
    app: any
    configs: any = [
        {
            name: "Access-Control-Allow-Origin",
            val: "*",
        },
        {
            name: "Access-Control-Allow-Methods",
            val: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        },
        {
            name: "Access-Control-Allow-Headers",
            val: "Origin, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,Content-Type, Date, X-Api-Version, x-access-token",
        },
    ]

    constructor() {
        this.setupApplication()
    }

    setupApplication() {
        this.app = express()

        // Use third party libries
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(validator())
        this.app.use(fileUpload({ createParentPath: true }))

        // Use express application configs
        this.app.use((req: any, res: any, next: any) => { this.configs.map((config: { name: string; val: string }) => res.set(config.name, config.val)); next() })

        // Use routes
        this.app.use("/api/system", SystemRouter)
        this.app.use("/api/warehouse", WarehouseRouter)
        this.app.use("/api/stock-record", StockRecordRouter)
        this.app.use("/api/stock", StockRouter)
        this.app.use("/api/cbproduction", CbProductionRouter)
        this.app.use("/api/usedstock-manager", UsedStockManagerRouter)
        this.app.use("/api/auth",AuthRouter)
        this.app.use("/api/leader",LeaderRouter)
        this.app.use("/api/leader-manager",LeaderManagerRouter)
        this.app.use("/api/stock-record-manager",StockRecordMangerRouter)
        this.app.use("/api/assign",AssignRouter)
        this.app.use("/api/operator",OpereatorRouter)
        this.app.use("/api/operator-manager",OperatorManagerRouter)
        
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log("Server is running on port " + this.port + ". \n ^c to exit.")
        })
    }
}

const expressApp = new App()
expressApp.startServer()