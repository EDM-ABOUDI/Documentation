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

//middleware
app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

//routes

const ItemsRouter = require("./Router/ItemsRouter")
const SubItemsRouter = require("./Router/SubItemsRouter")
const ArticlesRouter = require("./Router/ArticlesRouter")

app.use('/api/items', ItemsRouter)
app.use('/api/items/sub', SubItemsRouter)
app.use('/api/items/sub',ArticlesRouter)

// client routes
app.use(express.static(path.join(__dirname, "Client/build")))

const buildPath = path.normalize(path.join(__dirname, "Client/build"))

app.use(express.static(buildPath))

app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'))
})


// postgreesql
const { db } = require("@vercel/postgres")
const createTables = async function () {
    try {
        const client = await db.connect()

        await client.sql`
        create table if not exists item (
            id serial primary key,
            caption varchar(50) not null,
            date timestamp not null default CURRENT_TIMESTAMP
        );
        `
        await client.sql`
        create table if not exists subitem(
            id serial primary key,
            itemid integer,
            caption varchar(50) not null,
            constraint fk_item FOREIGN key(itemid) references item(id) on delete set null,
            date timestamp not null default CURRENT_TIMESTAMP
        );
        `
        await client.sql`
        create table if not exists article (
            id serial primary key,
            subitemid integer,
            title varchar(50) not null,
            description text,
            code text,
            image text,
            file text,
            constraint fk_subitem foreign key(subitemid) references subitem(id) on delete set null,
            date timestamp not null default CURRENT_TIMESTAMP
        );`
    } catch (err) {
        console.log(err.message)
    }
}

//listen to server
app.listen(port, () => {
    console.log('Listen to http://localhost:8081')
    createTables()
})