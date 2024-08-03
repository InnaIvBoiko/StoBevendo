import createHttpError from 'http-errors';
import { getAllUsers, registerUser, getUserById, updateUser, loginUser, refreshUsersSession, logoutUser, resetPassword, requestResetToken } from '../services/users.js';
import { THIRTY_DAYS } from '../constants/index.js';
import { setupSessionCookies } from '../utils/setupSessionCookies.js';
import { setupSession } from '../utils/setupSession.js';

export const getAllUsersController = async (req, res, next) => {
  const user = await getAllUsers();

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found number of all users`,
    data: user,
  });
};

export const registerUserController = async (req, res, next) => {
    const user = await registerUser(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user,
    });
};

export const getUserByIdController = async (req, res, next) => {
  const { userId } = req.params;
  const user = await getUserById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found user with id ${userId}!`,
    data: user,
  });
};

export const patchUserController = async (req, res, next) => {
  const { userId } = req.params;
  const result = await updateUser(userId, req.body);

  if (!result) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully updated user!`,
    data: result.user,
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);

  setupSessionCookies(res, session);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshUserSessionController = async (req, res, next) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res, next) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const requestResetEmailController = async (req, res, next) => {
  await requestResetToken(req.body.email);

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res, next) => {
  await resetPassword(req.body);

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
