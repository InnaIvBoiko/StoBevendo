import Joi from 'joi';

export const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    gender: Joi.string().valid('male', 'female'),
    weight: Joi.number().integer().min(6).max(16),
    activity: Joi.number().integer().min(6).max(16),
    waterRate: Joi.number().integer().min(6).max(16),
    avatar: Joi.string()
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const sendResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
