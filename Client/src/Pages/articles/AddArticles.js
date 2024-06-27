import { useState } from "react"
import { FaClosedCaptioning, FaImage} from "react-icons/fa"
import { AiFillCloseCircle } from "react-icons/ai"
import Message from "../../components/Dialog/Message"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../Config/axios"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../Config/firebase"


const AddArticle = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [article, setArticle] = useState({})
    const [error, setError] = useState([])
    const [showMessage, setShowMessage] = useState(false)
    const [textMessage, setTextMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [file,setFile] = useState(null)


    const handleNew = async () => {

        setError('')
        setLoading(true)
        try {
            let imageUrl = ''
            let fileUrl = '';
            if (image) imageUrl = await Upload(image)
            // if (file) fileUrl = await Upload(file)

            const { data } = await api.post(`/items/sub/${id}/article/add`, {
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
                setError(data.error.message)
                setTextMessage(data.error.message)
                setShowMessage(true)
            }


        } catch (error){
            setError(error.message)
            setTextMessage(error.message)
            setShowMessage(true)
        }
        setLoading(false)
    }

    const Upload = (file) => {
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
                    console.log('DownloadURL ' + downloadURL);
                        resolve(downloadURL)
                    });
                }
            );
        }, (error) => {
            setError(error.message)
        })
    }

    return (
        <div className="flex justify-center w-[100%]">
            <div className="flex flex-column gap-[0.5rem] w-[100%] sm:w-[640px]">
                <div className="text-center">
                    <h1 className="fw-bold text-[1.5rem]">Add article</h1>
                </div>
                <div className="flex flex-column">
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
                </div>
                <div className="flex flex-column w-[100%]">
                    <label htmlFor="image" className="fw-bold gap-[0.5rem] items-center">
                        <span className="flex gap-[0.5rem] items-center">Image <FaImage /></span>
                        {!image && <img src={'/images/placeholder.png'} className="my-[0.5rem]" />}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        // value={article.image}
                        onChange={e => {
                            e.target.files[0] && setImage(e.target.files[0])
                        }}
                        name="image"
                        id="image"
                        className="border w-[100%] h-[40px] rounded-[5px] p-[0.2rem] hidden"
                    />
                    {
                        image &&
                        <div className="relative w-[100%] my-[0.5rem]">
                            <img src={URL.createObjectURL(image)} className="w-[100%]" />
                            <div className="absolute top-[0.5rem] right-[0.5rem] text-[red] text-[2rem]">
                                <AiFillCloseCircle
                                    onClick={() => setArticle(old => ({ ...old, image: '' }))}
                                />
                            </div>
                        </div>
                    }
                </div>
                <div className="flex flex-column w-[100%]">
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
                <div className="flex flex-column w-[100%]">
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
                    className="w-fit flex gap-[0.5rem] bg-[blue] py-[0.2rem] px-[0.5rem] rounded-[3px] text-white text-[0.8rem] fw-bold items-center"
                    onClick={() => handleNew()}
                >
                    {loading ? 'Loading...' : 'New'}
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

export default AddArticle