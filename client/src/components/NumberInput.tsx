import React from 'react'
import {
    NumberInputField,
    Text,
    NumberInput as ChakraNumberInputField,
    Input,
    FormControl,
    FormErrorMessage,
} from '@chakra-ui/react'

export interface NumberInputProps {
    id: string
    label: string
    value: number
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string | undefined
}

const NumberInput: React.FC<NumberInputProps> = ({ id, label, value, onChange, error }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e)
    }
    return (
        <FormControl isInvalid={Boolean(error)}>
            <Text mb="8px">{label}</Text>
            <Input
                id={id}
                name={id}
                type="number"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            ></Input>

            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    )
}

export default NumberInput
