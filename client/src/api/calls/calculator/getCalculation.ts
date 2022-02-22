import { chartDataType } from '../../../types/chartDatatype'
import { fieldErrorType } from '../../../types/fieldErrorType'
import { genericResponseType } from '../../../types/genericResponseType'
import { API_BASE_URI } from '../../API_BASE_URI'
import { GET } from '../../HttpRequests'

type numberOfAnnualPeriodsType = 1 | 2 | 4 | 12

export type getCalculationParameterTypes = {
    startingAmount: number
    annualInterestRate: number
    monthlyDeposit: number
    years: number
    numberOfAnnualPeriods: numberOfAnnualPeriodsType
}

export type getCalculationResponseType = genericResponseType<chartDataType, fieldErrorType>

export default async function getCalculation(data: getCalculationParameterTypes) {
    // hacky way to build a query
    const query = new URL('/calculator', API_BASE_URI)
    query.searchParams.append('startingAmount', data.startingAmount.toString())
    query.searchParams.append('annualInterestRate', data.annualInterestRate.toString())
    query.searchParams.append('monthlyDeposit', data.monthlyDeposit.toString())
    query.searchParams.append('years', data.years.toString())
    query.searchParams.append('numberOfAnnualPeriods', data.numberOfAnnualPeriods.toString())

    const res = await GET('/calculator' + query.search)

    // add better response handling

    return res.data
}
