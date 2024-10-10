import { useState } from "react";
import api from "../../Config/axios";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Dialog/Message";

const ForgetPassword = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: ''
    })
    const [error, setError] = useState([])
    const [showMessage, setShowMessage] = useState(false)
    const [textMessage, setTextMessage] = useState('')

    const HandleForgetPassword = async () => {
        try {
            setError('')
            const { data } = await api.post(`/user/forget_password`, {
                email: formData.email,
            })


            if (data.status === "ok") {
                setTextMessage(`Reset password link has been sent success please check you mail inbox`)
                setShowMessage(true)
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
                                    Forget Password
                                </div>
                            </div>
                            <div className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => setFormData(old => ({ ...old, email: e.target.value }))}
                                />
                                <button
                                    className="mt-3 tracking-wide font-semibold bg-[#0000FF] text-white w-full py-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none mt-5"
                                    onClick={() => HandleForgetPassword()}
                                >
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="">
                                        Send Mail
                                    </span>
                                </button>
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

export default ForgetPassword
