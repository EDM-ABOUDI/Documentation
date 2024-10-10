const sql = require('mssql');
const { config } = require('../Config/ConnectDB');

const AddSubItem = async (req, res) => {
    try {
        const { userid } = req.body
        await sql.connect(config);
        await sql.query`
            INSERT INTO subitem (caption, itemid,userid) 
            VALUES (${req.body.caption}, ${req.body.itemid},${userid})
        `
        return res.json({ status: "ok" })
    } catch (error) {
        return res.json({ status: "error", error:error.message })
    }
}

const DeleteSubItem = async (req, res) => {
    try {
        const { userid } = req.body
        await sql.connect(config);
        await sql.query`
            delete from article where subitemid = ${req.params.id} and userid = ${userid};
        `
        await sql.query`
        delete from subitem where id = ${req.params.id};
        `
        return res.json({ status: "ok" })
    } catch (error) {
        return res.json({ status: "error", error:error.message })
    }
}

module.exports = {
    AddSubItem,
    DeleteSubItem
}