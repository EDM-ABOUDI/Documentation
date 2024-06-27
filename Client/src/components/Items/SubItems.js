import { NavLink } from "react-router-dom"

//MUI
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { IconButton } from '@mui/material'
import { User } from "../../App";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import Confirm from "../Dialog/Confirm";
import Modify from "../Dialog/Modify";

const SubItem = ({ item }) => {
    const user = User()

    const [showModifyDialog, setShowModifyDialog] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [textMessage, setTextMessage] = useState('')

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
        // try {
        //     setError('')

        //     const { data } = await api.delete(`/items/${item.id}`)

        //     if (data.status = "ok") {
        //         setIsChange(old => !old)
        //         setTextMessage(`Item has been deleted success`)
        //         setShowMessage(true)
        //     } else {
        //         setError(data.error.message)
        //         setTextMessage(data.error.message)
        //         setShowMessage(true)
        //     }

        // } catch (error) {
        //     setError(error.message)
        //     setTextMessage(error.message)
        //     setShowMessage(true)
        // }
    }

    const openModifyDialog = () => {
        setShowModifyDialog(true)
        setAnchorEl(null)
    }

    const handleModify = async (caption) => {
        // if (item.caption !== caption) {
        //     setError('')
        //     try {
        //         const { data } = await api.put(`items/${item.id}`, {
        //             caption: caption
        //         })

        //         if (data.status = "ok") {
        //             setIsChange(old => !old)
        //             setTextMessage(`Item has been modified success`)
        //             setShowMessage(true)
        //         } else {
        //             setError(data.error.message)
        //             setTextMessage(data.error.message)
        //             setShowMessage(true)
        //         }
        //     }
        //     catch (error) {
        //         setError(error.message)
        //         setTextMessage(error.message)
        //         setShowMessage(true)
        //     }
        // }
    }
    return (
        <div className="w-[100%] my-[0.2rem]">
            <NavLink className="relative flex flex-column w-[100%] p-[0.5rem] text-[rgb(50,50,50)] text-[0.7rem] rounded-[5px] hover:text-[rgb(50,50,50)] hover:bg-[rgba(0,0,0,0.07)]"
                to={`/items/sub/${item.id}`}
                key={item.id}
            >
                {item.caption}
                <div className="absolute right-0 top-[50%] translate-y-[-50%]">
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
                        <MenuItem onClick={() => openModifyDialog()}>
                            <span className='text-[blue] text-[0.8rem]'>Modify</span>
                        </MenuItem>
                        <MenuItem onClick={() => openDeleteDialog()}>
                            <span className='text-[blue] text-[0.8rem]'>Delete</span>
                        </MenuItem>
                    </Menu>
                </div>
            </NavLink>
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
        </div>
    )
}

export default SubItem