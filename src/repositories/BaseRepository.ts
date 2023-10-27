import { ModelStatic } from "sequelize";

export default abstract class BaseRepository<A> {
  modelClass: ModelStatic<any>;

  constructor(modelClass: ModelStatic<any>) {
    this.modelClass = modelClass;
  }

  getAll(options: Record<string, any> = {}): Promise<Array<A>> {
    if (!options.hasOwnProperty("order")) {
      options = {
        ...options,
        ...this.getDefaultOrderBy(),
      };
    }

    return this.modelClass.findAll(options);
  }

  getById(id: string, options: Record<string, any> = {}): Promise<A> {
    return this.modelClass.findByPk(id, options);
  }

  create(body: Record<string, any>): Promise<A> {
    return this.modelClass.create(body);
  }

  protected getDefaultOrderBy() {
    return {
      order: [["created_at", "DESC"]],
    };
  }
}
