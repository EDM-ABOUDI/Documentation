import React, { useState } from 'react'

import { NavLink } from "react-router-dom"
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { CiMenuKebab } from 'react-icons/ci'
import { IoIosArrowDown } from 'react-icons/io'
import Confirm from "../Dialog/Confirm"
import Message from "../Dialog/Message"
import Modify from "../Dialog/Modify"
import Add from "../Dialog/Add"
import api from '../../Config/axios'

import SubItem from './SubItems'

//MUI
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { IconButton } from '@mui/material'




const Item = ({ item, setIsChange, subItems }) => {

    const [error, setError] = useState([])
    const [showDialog, setShowDialog] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [textMessage, setTextMessage] = useState('')
    const [showModifyDialog, setShowModifyDialog] = useState(false)
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null)
    }

    const openDeleteDialog = () => {
        setTextMessage(`Do you want to delete ${item.caption} ?`)
        setShowDialog(true)
        setAnchorEl(null)
    }

    const handleDelete = async () => {
        try {
            setError('')

            const { data } = await api.delete(`/items/${item.id}`)

            if (data.status = "ok") {
                setIsChange(old => !old)
                setTextMessage(`Item has been deleted success`)
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

    const openModifyDialog = () => {
        setShowModifyDialog(true)
        setAnchorEl(null)
    }

    const handleModify = async (caption) => {
        if (item.caption !== caption) {
            setError('')
            try {
                const { data } = await api.put(`items/${item.id}`, {
                    caption: caption
                })

                if (data.status = "ok") {
                    setIsChange(old => !old)
                    setTextMessage(`Item has been modified success`)
                    setShowMessage(true)
                } else {
                    setError(data.error)
                    setTextMessage(data.error)
                    setShowMessage(true)
                }
            }
            catch (error) {
                setError(error.message)
                setTextMessage(error.message)
                setShowMessage(true)
            }
        }
    }

    const openAddDialog = () => {
        setShowAddDialog(true)
        setAnchorEl(null)
    }

    const handleAdd = async (caption) => {
        setError('')
        try {
            const { data } = await api.post(`/items/sub/add`, {
                caption: caption,
                itemid: item.id
            })

            if (data.status = "ok") {
                setIsChange(old => !old)
                setTextMessage(`Item has been added success`)
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
        <div
            className="flex flex-column relative cursor-pointer gap-[0.2rem] w-[100%] p-[0.3rem] fw-bold text-black text-[0.8rem] rounded-[5px] hover:text-[rgb(50,50,50)] hover:bg-[rgba(0,0,0,0.07)]"
            key={item.id}
        >
            <div className="flex justify-between items-center">
                <p className="text-[1rem] text-[#0000FF]">{item.caption}</p>
                <div className="flex items-center gap-[0.7rem] text-[0.8rem]">

                    <ExpandMoreIcon
                        className={`text-[1rem] transition duration-300 ${isActive[item.id] && 'rotate-180'}`}
                        onClick={() => setIsActive(old => ({ ...old, [item.id]: !old[item.id] }))}
                    />
                    <div>
                        <IconButton
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <CiMenuKebab />
                        </IconButton>
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            <MenuItem onClick={() => openAddDialog()}>
                                <span className='text-[#0000FF] text-[0.8rem]'>Add</span>
                            </MenuItem>
                            <MenuItem onClick={() => openModifyDialog()}>
                                <span className='text-[#0000FF] text-[0.8rem]'>Modify</span>
                            </MenuItem>
                            <MenuItem onClick={() => openDeleteDialog()}>
                                <span className='text-[#0000FF] text-[0.8rem]'>Delete</span>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            {
                isActive[item.id] &&
                < div className="w-[100%] flex flex-column transition duration-300">
                    {
                        subItems.filter(e => e.itemid === item.id)?.map((item,i) => (
                            <SubItem item={item} key={i}/>
                        ))
                    }
                </div>
            }
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
            {/* Modify dialog */}
            {
                showModifyDialog && (
                    <Modify
                        callbackFunction={handleModify}
                        caption={item.caption}
                        setShowDialog={setShowModifyDialog}
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
        </div>
    )
}

export default Item