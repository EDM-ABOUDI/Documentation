const { db } = require("@vercel/postgres")

const GetItems = async (req, res) => {
    try {
        const client = await db.connect()
        client.sql`
        select * from item order by date;
        `
            .then(async items => {
                client.sql`
                    select * from subitem order by date;
                `
                    .then(
                        (subitems) => {
                            res.json({ status: "ok", items: items.rows, subitems: subitems.rows })
                        }
                    )
                    .catch(error => res.json({ status: "error", error }))
            })
            .catch(error => res.json({ status: "error", error }))
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

const AddItem = async (req, res) => {
    try {
        const client = await db.connect()
        client.sql`
        insert into item (caption) values (${req.body.caption})
        `
        .then(() => res.json({ status: "ok" }))
        .catch(error => res.json({ status: "error", error }))
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

const DeleteItem = async (req, res) => {
    try {
        const client = await db.connect()

        client.sql`
            delete from article where subitemid in (
                select id from subitem where itemid = ${req.params.id}
            )
        `
            .then(() => {
                client.sql`
                    delete from subitem where itemid = ${req.params.id}
                `
                    .then(() => {
                        client.sql`
                            delete from item where id = ${req.params.id}
                        `
                            .then(() => {
                                res.json({ status: "ok" })
                            })
                            .catch(error => res.json({ status: "error", error }))
                    })
                    .catch(error => res.json({ status: "error", error }))
            })
            .catch(error => res.json({ status: "error", error }))

    } catch (error) {
        return res.json({ status: "error", error })
    }
}

const ModifyItem = async (req, res) => {
    try {
        const client = await db.connect()
        client.sql`
        update item set caption = ${req.body.caption} where id = ${req.params.id}
        `
            .then(() => res.json({ status: "ok" }))
            .catch(error => res.json({ status: "error", error }))


    } catch (error) {
        return res.json({ status: "error", error })
    }
}

module.exports = {
    GetItems,
    AddItem,
    DeleteItem,
    ModifyItem,
}