import { ModelStatic } from "sequelize";
import { parse } from "liqe";
import ApiError from "../errors/ApiError";
import getSequelizeWhereClause from "../utils/getSequelizeWhereClause";

export default abstract class BaseRepository<A> {
  modelClass: ModelStatic<any>;
  protected allowedSortByFields: Array<string> = ["created_at"];
  protected allowedFilterByFields: Array<string> = [];

  constructor(modelClass: ModelStatic<any>) {
    this.modelClass = modelClass;
  }

  getAll(options: Record<string, any> = {}): Promise<Array<A>> {
    const orderBy = this.getOrderBy(options.sortBy);
    delete options.sortBy;
    options.order = orderBy;

    if (options.filterBy) {
      const filterBy = this.getFilterBy(options.filterBy);
      delete options.filterBy;
      options.where = filterBy;
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

  protected getOrderBy(sortBy: string | undefined): Array<[string, string]> {
    const orderBy: Array<[string, string]> = [["created_at", "DESC"]];

    if (!sortBy) {
      return orderBy;
    }

    const parts = sortBy.split("-");

    if (!this.allowedSortByFields.includes(parts[0])) {
      return orderBy;
    }

    if (!parts[1] || !["asc", "desc"].includes(parts[1].toLowerCase())) {
      return orderBy;
    }

    return [[parts[0], parts[1].toLowerCase()]];
  }

  protected getFilterBy(filterBy: string): Record<string, any> {
    try {
      return getSequelizeWhereClause(
        parse(filterBy),
        this.allowedFilterByFields
      );
    } catch (error: any) {
      throw new ApiError({
        name: "FILTER_BY_ERROR",
        message: error.message,
        status: 400,
        code: "ERR_FTB",
      });
    }
  }
}
