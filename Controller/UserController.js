const sql = require('mssql');
const { config } = require('../Config/ConnectDB');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const nodemailer = require('nodemailer');

const GetUsers = async (req, res) => {
    try {
        await sql.connect(config);
        const users = await sql.query`
            select * from users
        `
        await sql.close()
        return res.json({ status: "ok", users: users.recordset })
    } catch (error) {
        return res.json({ status: "error", error: error.message })
    }
}

const SignUp = async (req, res) => {
    try {
        await sql.connect(config);
        const { email, password, firstname, lastname } = req.body

        if (!(email && password && firstname && lastname))
            return res.json({ status: 'error', error: 'All fields required' })

        const hashPassword = bcrypt.hashSync(password, 10)
        await sql.query`
            INSERT INTO users (email, password, firstname, lastname,isActivated) 
            VALUES (${email}, ${hashPassword},${firstname},${lastname},0)
        `
        await sql.close()

        /* const token = jwt.sign(
            {
                email: email
            },
            process.env.CLIENT_SECRET
        )
        return res.cookie("token", token, {
            httpOnly: true,
        }).json({ status: "ok" }) */

        const token = jwt.sign(
            {
                email: email
            },
            process.env.ACTIVATE_ACCOUNT_SECRET
        )

        // Create a transporter object
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // use SSL
            auth: {
                user: 'aboudimoustafa045@gmail.com',
                pass: 'tzeauvlwtgeznuii',
            }
        });

        var message = {
            from: "EDM Support Team",
            to: email,
            subject: "Account activation",
            html: `
                <div style="padding-x:3rem">
                    <h1 style="color:black">Activate your account</h1>
                    <p>Hi, you've created a new account at ${req.headers.host}. click to the following link to activate your account</p>
                    <a style="width:100%;padding:1rem" href=${req.protocol + '://' + req.headers.host + '/activate_account?token=' + token}>${req.protocol + '://' + req.headers.host + '/activate_account?token=' + token}</a>
                </div>
            `,
        };

        transporter.sendMail(message, function (error, info) {
            if (error)
                return res.json({ status: "error", error: error.message });

            return res.json({ status: "ok" })
        });

    } catch (error) {
        return res.json({ status: "error", error: error.message })
    }
}

const SignIn = async (req, res) => {
    try {
        await sql.connect(config);

        const { email, password } = req.body

        if (!(email && password))
            return res.json({ status: 'error', error: 'All fields required' })

        const user = await sql.query`
            select * from users where email = ${email}
        `

        if (user.recordset.length === 0)
            return res.json({ status: "error", error: "You are not registered from this email before" })

        const comparPassword = await bcrypt.compare(password, user.recordset[0].password)

        if (!comparPassword)
            return res.json({ status: "error", error: "Email or Password are incorrect" })

        const isActivated = user.recordset[0].isActivated;

        if (!isActivated)
            return res.json({ status: "error", error: "Activate you account, check your email inbox" })

        const token = jwt.sign(
            {
                email: email
            },
            process.env.CLIENT_SECRET
        )

        await sql.close()

        return res.cookie("token", token, { httpOnly: true }).json({ status: "ok" })

    } catch (error) {
        return res.json({ status: "error", error: error.message })
    }
}

const CheckUser = async (req, res, next) => {
    try {
        const access_token = req.cookies.token
        jwt.verify(access_token, process.env.CLIENT_SECRET, (error, user) => {
            if (error)
                return res.json({ status: "error", error: error.message })

            if (!user.email)
                return res.json({ status: "error", error: "An error occured" })

            req.body.userid = user.email
            return next()
        })
    } catch (error) {
        return res.json({ status: "error", error: error.message })
    }
}

const VerifyUser = async (req, res) => {
    return res.json({ status: "ok" })
}

const ActivateAccount = async (req, res) => {
    try {
        const access_token = req.query.token

        jwt.verify(access_token, process.env.ACTIVATE_ACCOUNT_SECRET, async (error, user) => {
            if (error)
                return res.json({ status: "error", error: error.message })
            if (!user.email)
                return res.json({ status: "error", error: "An error occured" })

            const email = user.email;
            await sql.connect(config);
            await sql.query`
                update users set isActivated = '1' where email = ${email}
            `
            await sql.close()

            return res.json({ status: "ok" })
        })
    } catch (error) {
        return res.json({ status: "error", error: error.message })
    }
}

const ForgetPassword = async (req, res) => {
    try {
        const { email } = req.body

        if (!email)
            return res.json({ status: "error", error: "Enter an email" })

        const token = jwt.sign(
            {
                email: email
            },
            process.env.RESET_PASSWORD_SECRET
        )

        // Create a transporter object
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // use SSL
            auth: {
                user: 'aboudimoustafa045@gmail.com',
                pass: 'tzeauvlwtgeznuii',
            }
        });

        var message = {
            from: "EDM Support Team",
            to: email,
            subject: "Reset password",
            html: `
                <div style="padding-x:3rem;height:100%">
                    <h1 style="color:black">Reset your password</h1>
                    <p>Click to the following link to reset your password</p>
                    <a href=${req.protocol + '://' + req.headers.host + '/reset_password?token=' + token}>Reset password</a>
                </div>
            `,
        };

        transporter.sendMail(message, function (error, info) {
            if (error)
                return res.json({ status: "error", error: error.message });

            return res.json({ status: "ok" })
        });
    } catch (error) {
        return res.json({ status: "error", error: error.message })
    }
}

const ResetPassword = async (req, res) => {
    try {
        const access_token = req.query.token
        const { password } = req.body

        jwt.verify(access_token, process.env.RESET_PASSWORD_SECRET, async (error, user) => {
            if (error)
                return res.json({ status: "error", error: error.message })
            if (!user.email)
                return res.json({ status: "error", error: "An error occured" })

            const email = user.email;
            const hashPassword = bcrypt.hashSync(password, 10)
            await sql.connect(config);
            await sql.query`
                update users set password = ${hashPassword} where email = ${email}
            `
            await sql.close()

            return res.json({ status: "ok" })
        })
    } catch (error) {
        return res.json({ status: "error", error: error.message })
    }
}

module.exports = {
    GetUsers,
    SignIn,
    SignUp,
    CheckUser,
    ActivateAccount,
    VerifyUser,
    ForgetPassword,
    ResetPassword
}