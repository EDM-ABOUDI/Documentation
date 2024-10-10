import React from 'react'
import { Box, Typography } from '@mui/material'
import { useQuery } from "react-query"
import api from "../../Config/axios"
import Error from '../Error/Error'
import { useParams } from 'react-router-dom'

const ActivateAccount = () => {

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    const { isLoading, data, error, isError } = useQuery('activate_account', async () => {
        return await api.post(`/user/activate_account?token=${token}`)
    })

    if (isLoading)
        return (
            <Box
                p={2}
                component="div"
                width="100%"
                height="calc(100vh - 64px)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                padding="1.5rem"
            >
                <Typography variant="h2" fontSize="1rem">Waiting ...</Typography>
            </Box>
        )

    if (isError)
        return <Error error={error} />

    if (data.data.status === "error")
        return <Error error={data.data.error} />

    return (
        <Box
            p={2}
            component="div"
            width="100%"
            height="calc(100vh - 64px)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding="1.5rem"
        >
            <Typography variant="h2" fontSize="1rem">The account has been activated success!</Typography>
        </Box>
    )
}

export default ActivateAccount