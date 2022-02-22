export type genericResponseType<dataType, errorType> = {
    data: dataType
    success: true
    errors: errorType[]
}
