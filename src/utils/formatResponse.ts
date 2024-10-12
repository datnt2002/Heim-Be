const formatResponse = (
    statusCode: number,
    isError: boolean,
    message: string,
    data?: object
) => {
    const response = {
        statusCode,
        isError,
        message,
        data,
    }
    if (isError) {
        delete response.data
    }
    return response
}

export default formatResponse
