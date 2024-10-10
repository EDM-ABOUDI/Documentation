import { useState } from "react";
import api from "../../Config/axios";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Dialog/Message";

const SignUp = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: ''
    })
    const [error, setError] = useState([])
    const [showMessage, setShowMessage] = useState(false)
    const [textMessage, setTextMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const HandleSignUp = async () => {
        try {
            setError('')
            const { data } = await api.post(`/user/signup`, {
                email: formData.email,
                password: formData.password,
                firstname: formData.firstname,
                lastname: formData.lastname,
            })

            console.log(data)
            if (data.status == "ok") {
                setTextMessage(`An email has been sent, check you email inbox to activate your account`)
                setShowMessage(true)
                setTimeout(() => {
                    navigate('/signin')
                }, 500)

            } else {
                setError(data.error)
                setTextMessage(data.error)
                setShowMessage(true)
            }
        } catch (error) {
            setError(error.message)
            setTextMessage(error.message)
            setShowMessage(true)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-12 flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">
                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Sign In with Cartesian email
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text"
                                    placeholder="First Name"
                                    name="firstname"
                                    onChange={(e) => setFormData(old => ({ ...old, firstname: e.target.value }))}
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3"
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastname"
                                    onChange={(e) => setFormData(old => ({ ...old, lastname: e.target.value }))}
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3"
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => setFormData(old => ({ ...old, email: e.target.value }))}
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setFormData(old => ({ ...old, password: e.target.value }))}
                                />
                                <button
                                    className="mt-3 tracking-wide font-semibold bg-[#0000FF] text-white w-full py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    onClick={() => HandleSignUp()}
                                >
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="">
                                        Sign Up
                                    </span>
                                </button>
                                <p className="mt-6 text-xs text-gray-600 text-center cursor-pointer">
                                    Already registered &nbsp;
                                    <span
                                        onClick={() => navigate('/signin')}
                                        className="border-b border-gray-500 border-dotted text-[#0000FF]"
                                    >
                                        Signin
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Message dialog */}
                {
                    showMessage && (
                        <Message
                            status={error ? "error" : "ok"}
                            text={textMessage}
                            setShowMessage={setShowMessage}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default SignUp
