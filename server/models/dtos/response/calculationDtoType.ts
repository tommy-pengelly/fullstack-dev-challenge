import { calculatorGraphData } from "../../calculator/calculatorGraphData";
import { fieldErrorType } from "../../error/fieldErrorType";
import { genericDtoType } from "./genericDtoType";

export type calculationDtoType = genericDtoType<calculatorGraphData, fieldErrorType>;
