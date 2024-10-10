const sql = require('mssql');
const { config } = require('../Config/ConnectDB');

const GetArticles = async (req, res) => {
    try {
        const { userid } = req.body
        await sql.connect(config);
        let articles = await sql.query`
            select * from article where subitemid = ${req.params.id} and userid = ${userid} order by date;
        `
        return res.json({ status: "ok", articles: articles.recordset })
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

const AddArticle = async (req, res) => {
    try {
        const { userid } = req.body
        await sql.connect(config);
        await sql.query`
            insert into article (subitemid,title,description,code,image,[file],userid) values (
                ${req.params.id},
                ${req.body.title},
                ${req.body.description},
                ${req.body.code},
                ${req.body.image},
                ${req.body.file},
                ${userid}
            );
        `

        return res.json({ status: "ok" })
    } catch (error) {
        return res.json({ status: "error", error: error.message })
    }
}

const DeleteArticle = async (req, res) => {
    try {
        const { userid } = req.body
        await sql.connect(config);
        await sql.query`
            delete from article where id = ${req.params.aid} and subitemid = ${req.params.id} and userid = ${userid};
        `
        return res.json({ status: "ok" })
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

const GetArticle = async (req, res) => {
    try {
        const { userid } = req.body
        await sql.connect(config);
        let article = await sql.query`
            select * from article where id = ${req.params.aid} and subitemid = ${req.params.id} and userid = ${userid};
        `
        return res.json({ status: "ok", article: article.recordset })
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

const ModifyArticle = async (req, res) => {
    try {
        const { userid } = req.body
        await sql.connect(config);
        await sql.query`
            update article set 
            title = ${req.body.title},
            description = ${req.body.description},
            code = ${req.body.code},
            image = ${req.body.image}
            where id = ${req.params.aid} and subitemid = ${req.params.id} and userid = ${userid}
        `
        return res.json({ status: "ok" })
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

const DeleteAllArticles = async (req, res) => {
    try {
        const { userid } = req.body
        await sql.connect(config);
        sql.query`
            delete from article where subitemid = ${req.params.id} and userid = ${userid};
        `
        return res.json({ status: "ok" })
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

module.exports = {
    GetArticles,
    AddArticle,
    DeleteArticle,
    GetArticle,
    ModifyArticle,
    DeleteAllArticles
}