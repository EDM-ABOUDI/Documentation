import { useEffect, useState } from "react"
import { FaImage } from "react-icons/fa"
import { AiFillCloseCircle } from 'react-icons/ai'
import Message from "../../components/Dialog/Message"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../Config/axios"
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { storage } from "../../Config/firebase"


const ModifyArticle = () => {

    const { id, aid } = useParams()
    const navigate = useNavigate()

    const [article, setArticle] = useState({})
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const [error, setError] = useState([])
    const [showMessage, setShowMessage] = useState(false)
    const [textMessage, setTextMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getArticle = async () => {
            try {
                const { data } = await api.get(`/items/sub/${id}/article/${aid}`)
                if (data.status = "ok") {
                    setArticle(data.article[0])
                    setImage(data.article[0].image)
                    setFile(data.article[0].file)
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
        getArticle()
    }, [])


    const handleModify = async () => {

        setError('')
        setLoading(true)
        try {
            let imageUrl = article.image
            let fileUrl = article.file
            if (image && typeof image === 'object') imageUrl = await uploadFile(image)
            if (file && typeof file === 'object') fileUrl = await uploadFile(file)

            const { data } = await api.put(`/items/sub/${id}/article/${aid}`, {
                title: article.title,
                description: article.description,
                code: article.code,
                image: imageUrl,
                file:fileUrl
            })

            if (data.status = "ok") {
                setTextMessage(`Article has been added success`)
                setShowMessage(true)
                navigate(`/items/sub/${id}`)
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
        setLoading(false)
    }

    const uploadFile = (file) => {
        const storageRef = ref(storage, `articles/${file.name}${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise(resolve => {
            uploadTask.on("state_changed",
                (snapshot) => {
                    /*const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);*/
                },
                (error) => {
                    setError(error.message)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        if (article.image) {
                            const desertRef = ref(storage, article.image);

                            // Delete the file
                            deleteObject(desertRef).then(() => {
                                console.log('Previeus image deleted success')
                            }).catch((error) => {
                                console.log(error)
                            });
                        }
                        resolve(downloadURL)
                    });
                }
            );
        }, (error) => {
            console.log(error)
        })
    }

    return (
        <div className="flex items-center justify-center w-[100%]">
            <div className="flex flex-column gap-[0.5rem] w-[100%]">
                <div className="text-center">
                    <h1 className="fw-bold text-[1.5rem]">Modify article</h1>
                </div>
                <div className="flex flex-column w-[100%] sm:w-[640px]">
                    <label htmlFor="title" className="fw-bold">Title</label>
                    <input
                        value={article.title}
                        onChange={e => setArticle(old => ({ ...old, title: e.target.value }))}
                        name="title"
                        id="title"
                        className="border w-[100%] h-[40px] rounded-[5px] p-[0.2rem]"
                    />
                </div>
                <div className="flex flex-column w-[100%]">
                    <label htmlFor="file" className="fw-bold gap-[0.5rem] items-center">
                        File
                    </label>
                    <input
                        type="file"
                        onChange={e => {
                            e.target.files[0] && setFile(e.target.files[0])
                        }}
                        name="file"
                        id="file"
                        className="border w-[100%] h-[40px] rounded-[5px] p-[0.2rem]"
                    />
                    {typeof file === 'string' && <iframe src={file}></iframe>}
                </div>
                <div className="flex flex-column w-[100%]">
                    <label htmlFor="image" className="fw-bold gap-[0.5rem] items-center">
                        <span className="flex gap-[0.5rem] items-center">Image <FaImage /></span>
                        {!image && <img src={'/images/placeholder.png'} className="my-[0.5rem]" />}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                            e.target.files[0] && setImage(e.target.files[0])
                        }}
                        name="title"
                        id="image"
                        className="border w-[100%] h-[40px] rounded-[5px] p-[0.2rem] hidden"
                    />
                    {
                        image &&
                        <div className="relative w-[100%] my-[0.5rem]">
                            <img src={typeof image === 'object' ? URL.createObjectURL(image) : image} className="w-[100%]" />
                            <div className="absolute top-[0.5rem] right-[0.5rem] text-[red] text-[2rem]">
                                <AiFillCloseCircle
                                    onClick={() => setImage(null)}
                                />
                            </div>
                        </div>
                    }
                </div>
                <div className="flex flex-column w-[100%] sm:w-[640px]">
                    <label htmlFor="description" className="fw-bold">Description</label>
                    <textarea
                        value={article.description}
                        onChange={e => setArticle(old => ({ ...old, description: e.target.value }))}
                        name="description"
                        id="description"
                        rows={4}
                        className="border w-[100%] rounded-[5px] p-[0.2rem]"
                    />
                </div>
                <div className="flex flex-column w-[100%] sm:w-[640px]">
                    <label htmlFor="code" className="fw-bold">Code</label>
                    <textarea
                        value={article.code}
                        onChange={e => setArticle(old => ({ ...old, code: e.target.value }))}
                        name="code"
                        id="code"
                        rows={8}
                        className="border border-[grey] w-[100%] rounded-[5px] p-[0.2rem]"
                    />
                </div>
                <button
                    className="w-fit flex gap-[0.5rem] bg-[#0000FF] py-[0.2rem] px-[0.5rem] rounded-[3px] text-white text-[0.8rem] fw-bold items-center"
                    onClick={() => handleModify()}
                >
                    {loading ? 'Loading...' : 'Save'}
                </button>
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
    )
}

export default ModifyArticle