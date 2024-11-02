// utils/user.validate.js
import Joi from 'joi';

const userSchema = Joi.object({
    username: Joi.string().required().min(3).max(30).messages({
        'string.base': 'Username must be a string',
        'string.empty': 'Username is required',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must be at most 30 characters long',
    }),
    password: Joi.string().required().min(6).messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
    }),
});

export default userSchema;
