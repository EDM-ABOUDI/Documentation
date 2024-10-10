import { useState } from "react"
import { useQuery } from "react-query"
import { Outlet, useNavigate } from "react-router-dom"
import Navigation from "../../components/Header/Navigation"
import api from "../../Config/axios"
import Error from "../Error/Error"

const Main = () => {

    const navigate = useNavigate();

    const { isLoading, data, error, isError } = useQuery('verify-user', async () => {
        return await api.post(`/user/verify_user`)
    })

    if (isLoading)
        return (
            <div>
                Waiting...
            </div>)

    if (isError)
        return <Error error={error} />
    if (data.data.status === "error")
        return navigate('/signin')

    return (
        <div className='main-container'>
            <Navigation />
            <div className="w-[100%] px-[1rem] md:px-[2rem] py-[2rem] overflow-auto h-[100vh] lg:w-[calc(100% - 300px)]">
                <Outlet />
            </div>
        </div>
    )
}

export default Main