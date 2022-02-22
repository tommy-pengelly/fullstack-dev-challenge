import { calculatorGraphData } from "server/models/calculator/calculatorGraphData";
import { numberOfAnnualPeriodsType } from "server/models/calculator/numberOfAnnuakPeriods";

export const compoundInterest = (
  startingAmount: number,
  annualInterestRate: number,
  numberOfAnnualPeriods: numberOfAnnualPeriodsType,
  monthlyDeposit: number
): number => {
  let periodicRate = annualInterestRate / numberOfAnnualPeriods;
  let close = startingAmount;

  for (let i = 0; i < numberOfAnnualPeriods; i++) {
    close = (close + monthlyDeposit) * (1 + periodicRate);
  }

  const interest = close - startingAmount;
  return interest;
};

export const calculateData = (
  startingAmount: number,
  annualInterestRate: number,
  monthlyDeposit: number,
  years: number,
  numberOfAnnualPeriods: numberOfAnnualPeriodsType
): calculatorGraphData => {
  let xAxis = [0];
  let yAxis: number[] = [startingAmount];

  let annualInterestRatePercentage = annualInterestRate / 100;
  for (let i = 1; i <= years; i++) {
    xAxis.push(i);
    let interest = compoundInterest(yAxis[i - 1], annualInterestRatePercentage, numberOfAnnualPeriods, monthlyDeposit);

    let closingBalance = interest + yAxis[i - 1];

    yAxis.push(closingBalance);
  }

  let yAxis_rounded = yAxis.map((e: number) => Math.round(e * 100) / 100);

  return { xAxis, yAxis: yAxis_rounded };
};
