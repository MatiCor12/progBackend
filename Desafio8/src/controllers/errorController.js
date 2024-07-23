import { CustomError, errorDictionary } from "../utils/customErrors.js"

export const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    if (errors.length > 1) {
        const formattedErrors = errors.join(' ');
        res.status(400).send({ messages: formattedErrors });
    } else {
        res.status(400).send({ messages: errors });
    }
};

export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (err.name === 'ValidationError') {
        handleValidationError(err, res);
    } else if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
};