import { ModelStatic } from "sequelize";
import ApiError from "../errors/ApiError";

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

  async update(id: string, body: Record<string, any>): Promise<A> {
    const instance = await this.modelClass.findByPk(id);
    if (!instance) {
      return instance;
    }
    return instance.update(body);
  }

  async delete(id: string): Promise<A> {
    const instance = await this.modelClass.findByPk(id);
    if (!instance) {
      throw new ApiError({
        name: "NOT_FOUND_ERROR",
        message: "Entity not found",
        status: 404,
        code: "ERR_NF",
      });
    }
    return instance.destroy();
  }

  protected getDefaultOrderBy() {
    return {
      order: [["created_at", "DESC"]],
    };
  }
}
