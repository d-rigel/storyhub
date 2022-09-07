import joi from "joi";

export const userCreateSchema = joi.object().keys({
    name: joi.string().min(3).max(35).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),

  });