import { Box, Divider, Stack, Text } from '@chakra-ui/react'
import { useFormik, FormikProps, FormikConfig, FormikErrors } from 'formik'
import React, { useEffect } from 'react'
import NumberInput from '../NumberInput'

export interface InputFormProps {
    onSubmit: (
        values: FormValuesType,
        setFieldErrorsCallBack: (errors: FormikErrors<FormValuesType>) => void
    ) => void
    initialValues?: FormValuesType
}

export type FormValuesType = {
    startingAmount: number
    monthlyDeposit: number
    annualInterestRate: number
}

const defualtValues: FormValuesType = {
    startingAmount: 10,
    monthlyDeposit: 2,
    annualInterestRate: 7,
}

const config: FormikConfig<FormValuesType> = {
    initialValues: defualtValues,
    onSubmit: () => {},
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, initialValues }) => {
    // could be using onSubmit better to feed errors back through
    const formik: FormikProps<FormValuesType> = useFormik<FormValuesType>({
        ...config,
        initialValues: initialValues || config.initialValues,
        onSubmit: async (values, { setErrors }) => {
            await onSubmit(values, setErrors)
        },
    })

    // This use effect feels undeterministic or creates a possible
    // race condition. Perhaps Formik is not the best in this case
    // as it wants the submit to be triggered by a dedicated event rather than
    // by an onChange of an input element.
    useEffect(() => {
        formik.submitForm()
    }, [formik.values, formik.dirty])

    return (
        <Box borderRight={'1px solid #efefef'} width={285} minWidth={285}>
            <Box margin={'2rem'}>
                <Stack>
                    <Text>Enter Values</Text>
                    <Divider></Divider>
                    <NumberInput
                        id="startingAmount"
                        label="Starting amount"
                        value={formik.values.startingAmount}
                        onChange={formik.handleChange}
                        error={formik.errors['startingAmount']}
                    ></NumberInput>
                    <NumberInput
                        id="monthlyDeposit"
                        label="Monthly Deposit"
                        value={formik.values.monthlyDeposit}
                        onChange={formik.handleChange}
                        error={formik.errors['monthlyDeposit']}
                    ></NumberInput>
                    <NumberInput
                        id="annualInterestRate"
                        label="Annual Interest Rate (%)"
                        value={formik.values.annualInterestRate}
                        onChange={formik.handleChange}
                        error={formik.errors['annualInterestRate']}
                    ></NumberInput>
                </Stack>
            </Box>
        </Box>
    )
}

export default InputForm
