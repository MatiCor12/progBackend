import { Router } from 'express';
import logger from '../config/logger.js'

const router = Router();

router.get('/', (req, res) => {
    logger.debug('This is a debug message');
    logger.http('This is an HTTP message');
    logger.info('This is an info message');
    logger.warning('This is a warning message');
    logger.error('This is an error message');
    logger.fatal('This is a fatal message');
    res.send('Logger test complete');
});

export default router;