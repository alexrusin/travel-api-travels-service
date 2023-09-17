export function studlyCaseToSnakeCase(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .join("_")
    .toUpperCase();
}
