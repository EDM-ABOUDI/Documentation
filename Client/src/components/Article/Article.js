import { FaCopy, FaDownload, FaEdit, FaTrash } from "react-icons/fa"
import { AiFillCheckCircle } from "react-icons/ai"
import api from "../../Config/axios"
import { useState } from "react"
import Confirm from "../Dialog/Confirm"
import Message from "../Dialog/Message"
import { NavLink } from "react-router-dom"
import { storage } from "../../Config/firebase"
import { getBlob, getDownloadURL, ref } from "firebase/storage"

const Article = ({ article, setIsChange }) => {
    const [error, setError] = useState([])
    const [showMessage, setShowMessage] = useState(false)
    const [textMessage, setTextMessage] = useState('')
    const [showDialog, setShowDialog] = useState(false)
    const [isCopy, setIsCopy] = useState(false)

    const openDeleteDialog = () => {
        setTextMessage(`Do you want to delete this article ?`)
        setShowDialog(true)
    }

    const handleDelete = async () => {
        try {
            setError('')

            const { data } = await api.delete(`/items/sub/${article.subitemid}/article/${article.id}`)

            if (data.status = "ok") {
                setIsChange(old => !old)
                setTextMessage(`Item has been deleted success`)
                setShowMessage(true)
            } else {
                setError(data.error.message)
                setTextMessage(data.error.message)
                setShowMessage(true)
            }

        } catch (error) {
            setError(error.message)
            setTextMessage(error.message)
            setShowMessage(true)
        }
    }


    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code)
        setIsCopy(true)
        setTimeout(() => {
            setIsCopy(false)
        }, 3000);
    }

    const downloadFile = async (file) => {
        // try {
        //     const xhr = new XMLHttpRequest()
        //     xhr.responseType = 'blob'
        //     xhr.onload = event => {
        //         const blob = xhr.response
        //     }
        //     xhr.open('GET', file)
        //     xhr.send()
        // } catch (error) {
        //     console.log(error.message)
        // }
    }

    return (
        <div className="flex flex-column relative gap-[0.5rem] p-[0.5rem] shadow-lg">
            {article.title && <h1 className="text-[1.5rem] fw-bold">{article.title}</h1>}
            {article.description && <pre className="text-[0.8rem]">{article.description}</pre>}
            {article.image && <img src={article.image} className="w-[100%]" />}
            {
                article.code &&
                <div className="relative w-[100%]">
                    <pre className="relative text-[rgb(0,120,180)] bg-dark rounded-[5px] overflow-auto w-[100%] max-h-[500px] p-[1rem]">
                        {article.code}
                    </pre>
                    <div className="absolute top-[1rem] right-[1rem] cursor-pointer">
                        {isCopy ? <AiFillCheckCircle className="text-[green]" /> : <FaCopy onClick={() => copyToClipboard(article.code)} className="text-white" />}
                    </div>
                </div>
            }
            <div className="absolute flex gap-[0.5rem] top-[0.5rem] right-[0.5rem] cursor-pointer">
                <FaTrash className="text-[red]"
                    onClick={() => openDeleteDialog()}
                />
                <NavLink to={`/items/sub/${article.subitemid}/article/${article.id}`}>
                    <FaEdit className="text-[green]" />
                </NavLink>
                {
                    article.file && (
                        <a href={article.file}>
                            <FaDownload />
                        </a>
                    )
                }
            </div>
            {/* confirm dialog */}
            {
                showDialog && (
                    <Confirm
                        text={textMessage}
                        callbackFunction={handleDelete}
                        setShowDialog={setShowDialog}
                    />
                )
            }
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
    )
}

export default Article