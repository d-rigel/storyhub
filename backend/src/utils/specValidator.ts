import { BadRequestError } from '../core/errorHandler';

export const validateInput = async (schema: any, data: any) => {
  try {
    const value = await schema.validateAsync(data, {
      allowUnknown: true,
      stripUnknown: true,
      errors: {
        wrap: {
          label: ''
        }
      },
      abortEarly: false
    });
    return value;
  } catch (error) {
    const errorMsg = await formatError(error);
    throw new BadRequestError(errorMsg);
  }
};

const formatError = async (error: any) => {
  return await error?.details?.map((err: any) => err.message);
};
