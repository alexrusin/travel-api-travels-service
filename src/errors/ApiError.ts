import BaseError from "./BaseError";

class ApiError extends BaseError<ErrorName, ErrorCode> {}
export default ApiError;
