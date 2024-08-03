import Joi from 'joi';

export const registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    gender: Joi.string().valid('male', 'female'),
    weight: Joi.number().positive().min(20).max(250),
    activity: Joi.number().positive().min(0).max(16),
    waterRate: Joi.number().positive().min(1).max(6),
    avatar: Joi.string()
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
  token: Joi.string().required(),
});
