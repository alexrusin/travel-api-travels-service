export function studlyCaseToSnakeCase(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .join("_")
    .toUpperCase();
}

export function depthOfObject(object: Record<string, any>) {
  let level = 1;
  for (const key in object) {
    if (!object.hasOwnProperty(key)) continue;

    if (typeof object[key] == "object") {
      const depth = depthOfObject(object[key]) + 1;
      level = Math.max(depth, level);
    }
  }
  return level;
}
