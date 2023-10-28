import ApiError from "../errors/ApiError";

function BaseResource<A, E>() {
  return class Resource {
    instance: A;
    constructor(instance: A | null) {
      if (!instance) {
        throw new ApiError({
          name: "NOT_FOUND_ERROR",
          message: "Entity not found",
          status: 404,
          code: "ERR_NF",
        });
      }
      this.instance = instance;
    }

    item(): E {
      throw new ApiError({
        name: "METHOD_NOT_IMPLEMENTED",
        message: "Method item() must be implemented in resource entity class",
        status: 400,
        code: "NOT_IMPL",
      });
    }

    static collection(entities: Array<A>): Array<E> | undefined {
      if (!entities) {
        return;
      }
      return entities.map((instance) => {
        const resource = new this(instance);
        return resource.item();
      });
    }
  };
}

export default BaseResource;
