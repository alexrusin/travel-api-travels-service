import BaseError from "./BaseError";

type ErrorName =
  | "NOT_FOUND_ERROR"
  | "CONNECTION_ERROR"
  | "METHOD_NOT_IMPLEMENTED";
type ErrorCode = "ERR_NF" | "ERR_REMOTE" | "NOT_IMPL";

class ApiError extends BaseError<ErrorName, ErrorCode> {}
export default ApiError;
