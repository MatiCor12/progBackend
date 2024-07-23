import { CustomError, errorDictionary } from '../utils/customError.js';

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }

    res.status(500).json({
        error: 'Something went wrong, please try again by completing all the fields'
    });
};

