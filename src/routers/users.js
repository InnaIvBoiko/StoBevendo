import { Router } from 'express';

import {
  registerUserController,
  getUserByIdController,
  patchUserController,
  getAllUsersController,
  loginUserController,
  resetPasswordController,
  logoutUserController,
  refreshUserSessionController,
  requestResetEmailController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  updateUserSchema
} from '../validation/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/amount', ctrlWrapper(getAllUsersController));

router.get(
  '/:userId',
  isValidId,
  ctrlWrapper(getUserByIdController)
);

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController)
);

router.patch(
  '/:userId',
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController)
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

router.post(
  '/refresh',
  ctrlWrapper(refreshUserSessionController),
);

router.post(
  '/logout',
  ctrlWrapper(logoutUserController),
);

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
