import * as Joi from 'joi'

const configSchema = Joi.object({

    // MongoDB configuration
    MONGODB_URI: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    
    // Minio configuration
    BUCKET_NAME: Joi.string().required(),
    STACKHERO_MINIO_HOST: Joi.string().required(),
    MINIO_CONSOLE_PORT: Joi.number().required(),
    MINIO_API_PORT: Joi.number().required(),
    STACKHERO_MINIO_ACCESS_KEY: Joi.string().required(),
    STACKHERO_MINIO_SECRET_KEY: Joi.string().required(),

    // Mail configuration
    MAIL_HOST: Joi.string().required(),
    MAIL_PORT: Joi.number().required(),
    MAIL_USERNAME: Joi.string().allow(''),
    MAIL_PASSWORD: Joi.string().allow(''),
})

/**
 * Custom function to validate environment variables. It takes an object containing environment variables as input and outputs validated environment variables.
 *
 * @param {Record<string, any>} config - Description of the parameter.
 * @returns {Record<string, any>} Description of the return value.
 * @throws {Error} Description of the exception.
 */
export function validateConfig(config: Record<string, any>) {
  const { error, value } = configSchema.validate(config, {
    allowUnknown: true,
    cache: true,
    convert: true,
  })
  if (error) {
    throw new Error(`Config validation error: ${error.message}`)
  }
  return value
}
