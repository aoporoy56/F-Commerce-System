const SuccessResponse = (status, message, data, error) => {
    return {
        status: status,
        message: message,
        data: data,
        error: error
    }
}

exports.SuccessResponse = SuccessResponse;