const { db } = require("@vercel/postgres")

const GetArticles = async (req, res) => {
    try {
        const client = await db.connect()
        client.sql`
        select * from article where subitemid = ${req.params.id} order by date;
        `
        .then(
            (articles) => {
                res.json({ status: "ok", articles: articles.rows })
            }
        )
        .catch(error => res.json({ status: "error", error }))
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

const AddArticle = async (req, res) => {
    try {
        const client = await db.connect()
        client.sql`
        insert into article (subitemid,title,description,code,image,file) values (
            ${req.params.id},
            ${req.body.title},
            ${req.body.description},
            ${req.body.code},
            ${req.body.image},
            ${req.body.file}
        );
        `
        .then(() => res.json({ status: "ok" }))
        .catch(error => res.json({ status: "error", error }))
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

const DeleteArticle = async (req, res) => {
    try {
        const client = await db.connect()
        client.sql`
        delete from article where id = ${req.params.aid} and subitemid = ${req.params.id};
        `
        .then(() => res.json({ status: "ok" }))
        .catch(error => res.json({ status: "error", error }))
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

const GetArticle = async (req, res) => {
    try {
        const client = await db.connect()
        client.sql`
        select * from article where id = ${req.params.aid} and subitemid = ${req.params.id};
        `
        .then(
            (article) => {
                res.json({ status: "ok", article: article.rows })
            }
        )
        .catch(error => res.json({ status: "error", error }))
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

const ModifyArticle = async (req, res) => {
    try {
        const client = await db.connect()
        client.sql`
        update article set 
        title = ${req.body.title},
        description = ${req.body.description},
        code = ${req.body.code},
        image = ${req.body.image}
        where id = ${req.params.aid} and subitemid = ${req.params.id}
        `
        .then(() => res.json({ status: "ok" }))
        .catch(error => res.json({ status: "error", error }))
    } catch (error) {
        return res.json({ status: "error", error })
    }
}

const DeleteAllArticles = async (req, res) => {
    try {
        const client = await db.connect()
        client.sql`
        delete from article where subitemid = ${req.params.id};
        `
        .then(() => res.json({ status: "ok" }))
        .catch(error => res.json({ status: "error", error }))
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