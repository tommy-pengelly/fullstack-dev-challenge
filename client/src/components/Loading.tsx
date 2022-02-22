import React from 'react'
import { Text, Box, Spinner } from '@chakra-ui/react'

interface LoadingProps {
    children: string
}

const Loading: React.FC<LoadingProps> = ({ children }) => {
    return (
        <Box textAlign={'center'} margin={'auto'}>
            <Spinner />
            <Text variant={'body1'}>{children}</Text>
        </Box>
    )
}

export default Loading
