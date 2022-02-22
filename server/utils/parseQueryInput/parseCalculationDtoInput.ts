import { numberOfAnnualPeriodsType } from "server/models/calculator/numberOfAnnuakPeriods";
import { getCalculationQueryDto } from "server/models/dtos/request/getCalculationQueryDto";
import { fieldErrorType } from "server/models/error/fieldErrorType";

export const parseCalculationDtoInput = (inputData: {
  [key: string]: any;
}): [getCalculationQueryDto, fieldErrorType[]] => {
  let errors: fieldErrorType[] = [];

  let startingAmount = parseFloat(inputData["startingAmount"]?.toString());
  let annualInterestRate = parseFloat(inputData["annualInterestRate"]?.toString());
  let monthlyDeposit = parseFloat(inputData["monthlyDeposit"]?.toString());
  let years = parseFloat(inputData["years"]?.toString());
  let numberOfAnnualPeriods = parseFloat(inputData["numberOfAnnualPeriods"]?.toString()) as numberOfAnnualPeriodsType;

  if (isNaN(startingAmount)) {
    errors.push({ field: "startingAmount", error: "Not a number" });
  }

  if (isNaN(annualInterestRate)) {
    errors.push({ field: "annualInterestRate", error: "Not a number" });
  }
  if (isNaN(monthlyDeposit)) {
    errors.push({ field: "monthlyDeposit", error: "Not a number" });
  }
  if (isNaN(years)) {
    errors.push({ field: "years", error: "Not a number" });
  }
  if (isNaN(numberOfAnnualPeriods)) {
    errors.push({ field: "numberOfAnnualPeriods", error: "Not a number" });
  }

  let data: getCalculationQueryDto = {
    startingAmount,
    annualInterestRate,
    monthlyDeposit,
    years,
    numberOfAnnualPeriods,
  };

  return [data, errors];
};
