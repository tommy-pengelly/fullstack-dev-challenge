import { Flex } from '@chakra-ui/react'
import React from 'react'
import InputForm from '../components/InputForm'
import { FormValuesType } from '../components/InputForm/InputForm'
import DefaultLayout from '../components/layouts/Default'
import LineChart from '../components/LineChart'
import Loading from '../components/Loading'
import Error from '../components/Error'
import debounce from 'lodash.debounce'
import getCalculation, { getCalculationResponseType } from '../api/calls/calculator/getCalculation'
import { chartDataType } from '../types/chartDatatype'
import { fieldErrorType } from '../types/fieldErrorType'
import { FormikErrors } from 'formik'

interface CalculatorProps {}

const YEARS = 50
const ANNUAL_PERIODS = 12

type calculateDataCallback = (res: getCalculationResponseType) => void

const calculateData = async (values: FormValuesType, callback: calculateDataCallback) => {
    const res = await getCalculation({
        ...values,
        numberOfAnnualPeriods: ANNUAL_PERIODS,
        years: YEARS,
    })

    callback(res)
}

const debouncedCalculateData = debounce((values: FormValuesType, cb: calculateDataCallback) => {
    calculateData(values, cb)
}, 500)

const initialChartData: chartDataType = { xAxis: [0, 1], yAxis: [1000, 2000] }

const initialValues: FormValuesType = {
    startingAmount: 10,
    monthlyDeposit: 2,
    annualInterestRate: 7,
}

const Calculator: React.FC<CalculatorProps> = ({}) => {
    const [chartData, setChartData] = React.useState<chartDataType | undefined>(initialChartData)
    const [isLoading, setIsLoading] = React.useState<boolean>(true)

    const handleSubmit = async (
        values: FormValuesType,
        setFieldErrorsCallBack: (errors: FormikErrors<FormValuesType>) => void
    ) => {
        const callback = (res: getCalculationResponseType) => {
            if (res.success) {
                setChartData(res.data)
            } else {
                setChartData(undefined)
                //map errors
                const errors = res?.errors?.reduce((obj, fieldError) => {
                    obj[fieldError.field] = fieldError.error
                    return obj
                }, {} as any)

                //force them into error callback from formik serErrors
                setFieldErrorsCallBack(errors as FormikErrors<FormValuesType>)
            }
            setIsLoading(false)
        }

        await setIsLoading(true)
        debouncedCalculateData(values, callback)
    }

    return (
        <DefaultLayout>
            <Flex width={'100vw'} flex={1}>
                <InputForm onSubmit={handleSubmit} initialValues={initialValues}></InputForm>
                {/* Aspect ratio is tricky, graph seems to have a fixed ratio and wants to grow to the max-width of it's parent */}
                <Flex p={6} maxH={`calc(100vh - ${57}px)`} flex={1}>
                    {isLoading ? (
                        <Loading>Loading data</Loading>
                    ) : chartData === undefined ? (
                        <Error>There is an error with your calculator values</Error>
                    ) : (
                        <LineChart
                            title="Savings Over time"
                            xAxisData={chartData.xAxis}
                            yAxisData={chartData.yAxis}
                            xLabel="Years"
                            yLabel="Amount"
                        />
                    )}
                </Flex>
            </Flex>
        </DefaultLayout>
    )
}

export default Calculator
