import logger from '../config/logger.js'

export const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);

    res.status(err.statusCode || 500 ).json({
            error: err.message || 'Something went wrong, please try again by completing all the fields'
        });
    }
