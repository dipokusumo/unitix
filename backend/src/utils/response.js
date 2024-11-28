class ResponseAPI {
    static success(res, data = null, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    static error(res, message = 'Error', statusCode = 400, errors = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            errors
        });
    }

    static badRequest(res, message = 'Bad Request', errors = null) {
        return this.error(res, message, 400, errors);
    }

    static unauthorized(res, message = 'Unauthorized') {
        return this.error(res, message, 401);
    }

    static forbidden(res, message = 'Forbidden') {
        return this.error(res, message, 403);
    }

    static notFound(res, message = 'Not Found') {
        return this.error(res, message, 404);
    }

    static conflict(res, message = 'Conflict') {
        return this.error(res, message, 409);
    }

    static unprocessableEntity(res, message = 'Unprocessable Entity', errors = null) {
        return this.error(res, message, 422, errors);
    }

    static tooManyRequests(res, message = 'Too Many Requests') {
        return this.error(res, message, 429);
    }

    static serverError(res, error) {
        console.error(error);
        return this.error(
            res,
            'Internal Server Error',
            500,
            process.env.NODE_ENV === 'development' ? error.message : null
        );
    }

    static created(res, data = null, message = 'Resource created successfully') {
        return this.success(res, data, message, 201);
    }

    static accepted(res, data = null, message = 'Request accepted for processing') {
        return this.success(res, data, message, 202);
    }

    static noContent(res) {
        return res.status(204).send();
    }

    static notImplemented(res, message = 'Not Implemented') {
        return this.error(res, message, 501);
    }

    static badGateway(res, message = 'Bad Gateway') {
        return this.error(res, message, 502);
    }

    static serviceUnavailable(res, message = 'Service Unavailable') {
        return this.error(res, message, 503);
    }

    static gatewayTimeout(res, message = 'Gateway Timeout') {
        return this.error(res, message, 504);
    }
}

module.exports = ResponseAPI;