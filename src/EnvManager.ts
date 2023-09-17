import { studlyCaseToSnakeCase } from "./utils/functions";

class EnvManager {
  [x: string]: any;
  getDbConnectionUrl() {
    return `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  }
}
const envManager = new EnvManager();

export default new Proxy(envManager, {
  get(envManager: EnvManager, field: string) {
    return function (defaultValue?: string | number | boolean) {
      if (field in envManager) {
        // if method exists on envManager (getDbConnectionUrl)
        return envManager[field](defaultValue);
      }
      let envVariable: string | number | undefined =
        process.env[studlyCaseToSnakeCase(field.replace("get", ""))];

      if (envVariable && /^true$/i.test(envVariable)) {
        return true;
      }

      if (envVariable && /^false$/i.test(envVariable)) {
        return false;
      }

      if (envVariable && !isNaN(parseInt(envVariable, 10))) {
        envVariable = parseInt(envVariable, 10);
      }
      return envVariable || defaultValue;
    };
  },
});
