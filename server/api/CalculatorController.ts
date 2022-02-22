import { Request, Response } from "express";
import { calculationDtoType } from "server/models/dtos/response/calculationDtoType";
import { parseCalculationDtoInput } from "../utils/parseQueryInput/parseCalculationDtoInput";
import { calculateData } from "../services/calculatorService";

// could be a post
export const getCalculation = (req: Request, res: Response<calculationDtoType>) => {
  const [data, errors] = parseCalculationDtoInput(req.query);

  if (errors.length > 0) {
    res.json({ success: false, errors });
  } else {
    const calculation = calculateData(
      data.startingAmount,
      data.annualInterestRate,
      data.monthlyDeposit,
      data.years,
      data.numberOfAnnualPeriods
    );

    res.json({ data: calculation, success: true });
  }
};
