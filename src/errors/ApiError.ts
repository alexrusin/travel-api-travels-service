import BaseError from "./BaseError";

type ErrorName = "NOT_FOUND_ERROR" | "CONNECTION_ERROR";
type ErrorCode = "ERR_NF" | "ERR_REMOTE";

class ApiError extends BaseError<ErrorName, ErrorCode> {}
export default ApiError;
