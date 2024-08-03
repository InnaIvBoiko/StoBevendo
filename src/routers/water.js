import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';

import {
    getWaterController,
    getWaterByIdController,
    createWaterController,
    deleteWaterController,
    patchWaterController
} from '../controllers/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createWaterSchema, updateWaterSchema } from '../validation/water.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getWaterController));

router.get(
    '/:waterId',
    isValidId,
    ctrlWrapper(getWaterByIdController)
);

router.post(
    '/add',
    validateBody(createWaterSchema),
    ctrlWrapper(createWaterController));

router.delete('/:waterId', ctrlWrapper(deleteWaterController));

router.patch(
    '/:waterId',
    validateBody(updateWaterSchema),
    ctrlWrapper(patchWaterController));


export default router;
