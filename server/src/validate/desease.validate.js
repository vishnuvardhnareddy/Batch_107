// utils/disease.validate.js
import Joi from 'joi';

const diseaseSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': '"Name" should be a type of text',
        'any.required': '"Name" is a required field',
    }),
    symptoms: Joi.string().required().messages({
        'string.base': '"Symptoms" should be a type of text',
        'any.required': '"Symptoms" is a required field',
    }),
    tablets: Joi.string().required().messages({
        'string.base': '"Tablets" should be a type of text',
        'any.required': '"Tablets" is a required field',
    }),
    description: Joi.string().optional(),
});

export default diseaseSchema;
