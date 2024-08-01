import Joi from 'joi';

export const createWaterSchema = Joi.object({
    volume: Joi.number().integer().min(2).max(4).required(),
    date: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Date should be a string "2024-08-01 07:00"',
        'any.required': 'Date is required'
    }),
    userId: Joi.string()
});

export const updateWaterSchema = Joi.object({
    volume: Joi.number().integer().min(2).max(4),
    date: Joi.string().min(3).max(30),
    userId: Joi.string()
});
