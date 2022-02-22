import { numberOfAnnualPeriodsType } from "server/models/calculator/numberOfAnnuakPeriods";

export type getCalculationQueryDto = {
  startingAmount: number;
  annualInterestRate: number;
  monthlyDeposit: number;
  years: number;
  numberOfAnnualPeriods: numberOfAnnualPeriodsType;
};
