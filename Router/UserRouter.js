const express = require("express")
const router = express.Router()

const { GetUsers, SignIn, SignUp, CheckUser, VerifyAccount, ActivateAccount, VerifyUser, ForgetPassword, ResetPassword } = require("../Controller/UserController")

router.get('/', GetUsers)
router.post('/signup', SignUp)
router.post('/signin', SignIn)
router.post('/verify_user', CheckUser, VerifyUser)
router.post('/activate_account', ActivateAccount)
router.post('/forget_password', ForgetPassword)
router.post('/reset_password', ResetPassword)

module.exports = router