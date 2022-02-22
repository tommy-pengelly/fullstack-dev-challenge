export type genericDtoType<dataType, errorType> =
  | genericErrorType<dataType, errorType>
  | genericSuccessType<dataType, errorType>;

type genericErrorType<dataType, errorType> = {
  data: dataType;
  errors?: errorType[];
  success: true;
};

type genericSuccessType<dataType, errorType> = {
  data?: dataType;
  errors: errorType[];
  success: false;
};
