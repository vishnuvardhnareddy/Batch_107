// utils/ApiError.js

class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    static internal(message) {
        return new ApiError(message || 'Internal Server Error', 500);
    }

    static unauthorized(message) {
        return new ApiError(message || 'Unauthorized', 401);
    }

    // Other static methods for different error types can go here
}

export default ApiError;
