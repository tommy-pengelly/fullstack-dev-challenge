import React from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import theme from './theme'
import CalculatorPage from './pages/Calculator'

const defaultTheme = extendTheme(theme)

function App() {
    return (
        <ChakraProvider theme={defaultTheme}>
            <CalculatorPage></CalculatorPage>
        </ChakraProvider>
    )
}

export default App
