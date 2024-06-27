const { db } = require("@vercel/postgres")

const AddSubItem = async (req, res) => {
    try {
        const client = await db.connect()
        client.sql`
        insert into subitem (caption,itemid) values (${req.body.caption},${req.body.itemid})
        `
        .then(() => res.json({ status: "ok" }))
        .catch(error => res.json({ status: "error", error }))
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

const DeleteSubItem = async (req, res) => {
    try {
        const client = await db.connect()
        client.sql`
        delete from article where subitemid = ${req.params.id};
        `
        .then(() => {
            db.sql`
            delete from subitem where id = ${req.params.id};
            `
            .then(() => res.json({ status: "ok" }))
            .catch(error => res.json({ status: "error", error }))
        })
        .catch(error => res.json({ status: "error", error }))
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

module.exports = {
    AddSubItem,
    DeleteSubItem
}