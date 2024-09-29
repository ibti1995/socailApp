import Joi from 'joi';
import dotenv from 'dotenv';

// require and configure dotenv, will load vars in .env in PROCESS.ENV
dotenv.config({ path: '.env' });

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
    MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
        is: Joi.string().equal('development'),
        then: Joi.boolean().default(true),
        otherwise: Joi.boolean().default(false),
    }),
    APP_NAME: Joi.string().required().description('Application name is required'),
    MONGODB_URI: Joi.string().required().description('Mongo DB host url is required'),
})
.unknown()
.required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
console.log(envVars.MONGODB_URI,"envVars.MONGODB_URI")

const envConfig = {
    env: envVars.NODE_ENV,
    appName: envVars.APP_NAME,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    mongoUri: envVars.MONGODB_URI,

};

export default envConfig;
