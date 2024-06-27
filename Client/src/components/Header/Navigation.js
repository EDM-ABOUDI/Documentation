import { useContext, useEffect, useState } from "react"
import { HiOutlineMenu } from 'react-icons/hi'
import api from "../../Config/axios"
import Item from "../Items/Item"
import Message from "../Dialog/Message"
import { FaPlus } from "react-icons/fa"
import Add from "../Dialog/Add"
import axios from "axios"
import { User } from "../../App"

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [subItems, setSubItems] = useState([])
    const [error, setError] = useState([])
    const [isActive, setIsActive] = useState({})
    const [showMessage, setShowMessage] = useState(false)
    const [textMessage, setTextMessage] = useState('')
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [search, setSearch] = useState('')

    const user = User();

    useEffect(() => {
        setError('')
        const getItems = async () => {
            try {
                const { data } = await api.get('/items')

                if (data.status = "ok") {
                    setItems(data.items)
                    setFilteredItems(data.items)
                    setSubItems(data.subitems)
                    data.items?.map(item => {
                        setIsActive(old => old[item.id] ? ({ ...old }) : ({ ...old, [item.id]: false }))
                    })
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

        getItems()
    }, [user.isChange])

    useEffect(() => {
        if (search !== '')
            setItems(filteredItems.filter(e => e.caption.trim().split(' ').join('').toLowerCase().includes(search.trim().split(' ').join('').toLowerCase())))
        else
            setItems(filteredItems)
    }, [search])

    const openAddDialog = () => {
        setShowAddDialog(true)
    }

    const handleAdd = async (caption) => {
        setError('')
        try {
            const { data } = await api.post(`/items/add`, {
                caption: caption,
            })

            if (data.status = "ok") {
                user.setIsChange(old => !old)
                setTextMessage(`Item has been added success`)
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

    return (
        <header className={`h-[100vh] overflow-y-auto overflow-x-hidden flex flex-column w-[300px] absolute z-50 lg:relative top-0 transition duration-300 ${isOpen ? 'left-0' : 'left-[-300px] lg:left-0'} px-[0.5rem] py-[1rem] bg-[rgba(248,248,248)] rounded`}>
            <div className="block">
                {/* Menu icon */}
                <div onClick={() => setIsOpen(old => !old)} className={`flex text-[2rem] lg:hidden ${isOpen ? 'absolute right-[0.5rem]' : 'fixed top-[0.5rem] left-[0.5rem]'}`} >
                    <HiOutlineMenu />
                </div>
                {/* Header */}
                <h1 className="text-[1.5rem] fw-bold">Learn NAV & BC</h1>
                <hr className="my-[1rem]"></hr>

                {/* Button Add */}
                <div>
                    <button
                        className="flex gap-[0.2rem] bg-[blue] py-[0.2rem] px-[0.5rem] rounded-[3px] text-white text-[0.8rem] fw-bold items-center"
                        onClick={() => openAddDialog()}
                    >
                        Add Item <FaPlus />
                    </button>
                </div>
                <hr className="my-[1rem]"></hr>

                {/* Search */}
                <div className="w-[100%]">
                    <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className="p-[0.3rem] w-[100%] h-[40px] border rounded-[5px] mb-[1rem] outline-none" />
                </div>
            </div>
            <div className="w-[100%] flex flex-column">
                {
                    items.map(item => (
                        <Item
                            key={item.id}
                            item={item}
                            setIsChange={user.setIsChange}
                            subItems={subItems}
                            isActive={isActive}
                            setIsActive={setIsActive}
                        />
                    ))
                }
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
            {/* Add dialog */}
            {
                showAddDialog && (
                    <Add
                        setShowDialog={setShowAddDialog}
                        callbackFunction={handleAdd}
                    />
                )
            }
        </header >
    )

}

export default Navigation 