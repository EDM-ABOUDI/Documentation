const sql = require('mssql');
const { config } = require('../Config/ConnectDB');

const GetItems = async (req, res) => {
    try {
        const { userid } = req.body
        await sql.connect(config);
        let items = await sql.query`
            select * from item where userid = ${userid} order by date;
        `

        let subitems = await sql.query`
            select * from subitem where userid = ${userid} order by date;
        `
        return res.json({ status: "ok", items: items.recordset, subitems: subitems.recordset })
    } catch (error) {
        return res.json({ status: "error", error: error.message })
    }
}

const AddItem = async (req, res) => {
    try {
        const { caption, userid } = req.body
        await sql.connect(config);
        await sql.query`
            insert into item (caption,userid) values (${caption},${userid})
        `
        return res.json({ status: "ok" })
    } catch (error) {
        return res.json({ status: "error", error: error.message })
    }
}

const DeleteItem = async (req, res) => {
    try {
        const { userid } = req.body
        await sql.connect(config);
        await sql.query`
            delete from article where subitemid in (
                select id from subitem where itemid = ${req.params.id} and userid = ${userid}
            )
        `
        await sql.query`
            delete from subitem where itemid = ${req.params.id} and userid = ${userid}
        `
        await sql.query`
            delete from item where id = ${req.params.id} and userid = ${userid}
        `
        return res.json({ status: "ok" })
    } catch (error) {
        return res.json({ status: "error", error: error.message })
    }
}

const ModifyItem = async (req, res) => {
    try {
        const { userid } = req.body
        await sql.connect(config);
        await sql.query`
            update item set caption = ${req.body.caption} where id = ${req.params.id} and userid = ${userid}
        `
        return res.json({ status: "ok" })
    } catch (error) {
        return res.json({ status: "error", error: error.message })
    }
}

module.exports = {
    GetItems,
    AddItem,
    DeleteItem,
    ModifyItem,
}