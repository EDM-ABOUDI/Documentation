import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate, useParams } from "react-router-dom"
import api from "../../Config/axios"
import Message from "../../components/Dialog/Message"
import { FaPlus } from "react-icons/fa"
import Article from "../../components/Article/Article"
import Confirm from "../../components/Dialog/Confirm"

const Articles = () => {

    const { id } = useParams()

    

    const [articles, setArticles] = useState([])
    const [error, setError] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [textMessage, setTextMessage] = useState('')
    const [isChange, setIsChange] = useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [deleteText, setDeleteText] = useState('')

    useEffect(() => {
        setError('')
        articles.length > 0 && articles[0].subitemid != id && setArticles([])
        const getArticles = async () => {
            try {
                const { data } = await api.get(`/items/sub/${id}/articles`)
                if (data.status = "ok") {
                    setArticles(data.articles)
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
        getArticles()
    }, [isChange, id])

    const openDeleteDialog = (text) => {
        setDeleteText(text)
        if (text === 'item') {
            setTextMessage(`Do you want to delete this item and all related article ? `)
            setShowConfirmDialog(true)
        } else if (text === 'articles') {
            setTextMessage(`Do you want to delete all related article ? `)
            setShowConfirmDialog(true)
        }
    }

    const handleDelete = () => {
        if (deleteText === 'item')
            deleteItem()
        else if (deleteText === 'articles')
            deleteArticles()
    }

    const deleteItem = async () => {
        try {
            setError('')

            const { data } = await api.delete(`/items/sub/${id}`)

            if (data.status = "ok") {
                setIsChange(old => !old)
                setTextMessage(`Item has been deleted success`)
                setShowMessage(true)
                window.location = "/"
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

    const deleteArticles = async () => {
        try {
            setError('')

            const { data } = await api.delete(`/items/sub/${id}/articles`)

            if (data.status = "ok") {
                setIsChange(old => !old)
                setTextMessage(`All articles has been deleted success`)
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
        <div className="flex flex-column gap-[1rem]">
            <div className="flex gap-[1rem] justify-end">
                <button
                    className="flex gap-[0.2rem] bg-[red] py-[0.2rem] px-[0.5rem] rounded-[3px] text-white text-[0.8rem] fw-bold items-center"
                    onClick={() => openDeleteDialog('articles')}
                >
                    Delete articles
                </button>
                <button
                    className="flex gap-[0.2rem] bg-[red] py-[0.2rem] px-[0.5rem] rounded-[3px] text-white text-[0.8rem] fw-bold items-center"
                    onClick={() => openDeleteDialog('item')}
                >
                    Delete item
                </button>
                <NavLink
                    className="flex gap-[0.2rem] bg-[#0000FF] py-[0.2rem] px-[0.5rem] rounded-[3px] text-white text-[0.8rem] fw-bold items-center"
                    to="add-article"
                >
                    Add article <FaPlus />
                </NavLink>
            </div>
            {
                articles?.map(article => (
                    <Article
                        key={article.id}
                        article={article}
                        setIsChange={setIsChange}
                    />
                ))
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
            {/* Delete item dialog */}
            {
                showConfirmDialog && (
                    <Confirm
                        text={textMessage}
                        callbackFunction={handleDelete}
                        setShowDialog={setShowConfirmDialog}
                    />
                )
            }
        </div>
    )

}

export default Articles