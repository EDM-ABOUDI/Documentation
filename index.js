const express = require("express")
const app = express()
const path = require("path")

//dotenv
require("dotenv").config()

// //port
const port = process.env.PORT || 8081

//cors
const cors = require("cors")

//body parser
const bodyParser = require("body-parser")

//Cookie Parser
const cookieParser = require('cookie-parser')

//middleware
app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use(express.cookieParser())

//routes

const ItemsRouter = require("./Router/ItemsRouter")
const SubItemsRouter = require("./Router/SubItemsRouter")
const ArticlesRouter = require("./Router/ArticlesRouter")
const UsersRouter = require("./Router/UserRouter")
const { CheckUser } = require("./Controller/UserController")

app.use('/api/items', CheckUser, ItemsRouter)
app.use('/api/items/sub', CheckUser, SubItemsRouter)
app.use('/api/items/sub', CheckUser, ArticlesRouter)
app.use('/api/user', UsersRouter)

// client routes
app.use(express.static(path.join(__dirname, "Client/build")))

const buildPath = path.normalize(path.join(__dirname, "Client/build"))

app.use(express.static(buildPath))

app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'))
})

//SQL Server
const { connectToSqlServer } = require("./Config/ConnectDB")

// SQL Server
const sql = require('mssql');
connectToSqlServer()
//listen to server
app.listen(port, () => {
    console.log('Listen to http://localhost:8081')
})