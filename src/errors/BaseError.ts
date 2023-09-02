class BaseError<N extends string, C extends string> extends Error {
  name: N;
  message: string;
  status: number;
  code?: C;

  constructor({
    name,
    message,
    status,
    code,
  }: {
    name: N;
    message: string;
    status: number;
    code?: C;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.status = status;
    this.code = code;
  }
}

export default BaseError;
