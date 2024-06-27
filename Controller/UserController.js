const { db } = require("@vercel/postgres")

const GetUsers = async (req, res) => {
    try {
        const client = await db.connect()
        const { rows } = await client.sql`
        select * from users
        `
        return res.json({ status: "ok", rows })
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

module.exports = {
    GetUsers,
}