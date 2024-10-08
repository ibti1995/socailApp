const httpStatusCodes = {
    OK: 200,
    CREATED: 201,
    DELETED: 204,
    NOTMODIFIED: 304,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    INTERNAL_SERVER: 500,
  
    FORGOT_PASSWORD_EMAIL: 20001,
  
    // EMAIL_NOT_VERIFIED
    EMAIL_NOT_VERIFIED: 40300,
  
    // TOKEN EXPIRED
    ACCESS_TOKEN_IS_EXPIRED: 40101,
    REFRESH_TOKEN_IS_EXPIRED: 40102,
  
    // CUSTOM VALIDATION CODES
    VALIDATION_ERROR: 40000,
    EMAIL_VALIDATION: 40001,
    PASSWORD_VALIDATION: 40002,
    DUPLICATED_KEY: 40003,
    EMAIL_ALREADY_USED: 40005,
    PHONE_ALREADY_USED: 40006,
    MONGO_DUPLICATED_KEY: 11000,
    CANNOT_CREATE_DOC: 40050,
    // CUSTOM VALIDATION CODES
    RESOURCE_NOT_FOUND: 40401,
  
  };
  
  export default httpStatusCodes;
  