import Tour from "../../../database/models/Tour";
import ApiError from "../../../errors/ApiError";

export type TourEntity = {
  id: string;
  travel_id: string;
  name: string;
  starting_date: Date;
  ending_date: Date;
  price: number;
};

class TourResource {
  #instance: Tour;
  constructor(tour: Tour | null) {
    if (!tour) {
      throw new ApiError({
        name: "NOT_FOUND_ERROR",
        message: "Entity not found",
        status: 404,
        code: "ERR_NF",
      });
    }
    this.#instance = tour;
  }

  item() {
    const tourResource: TourEntity = {
      id: this.#instance.id,
      travel_id: this.#instance.travel_id,
      name: this.#instance.name,
      starting_date: this.#instance.starting_date,
      ending_date: this.#instance.ending_date,
      price: this.#instance.price,
    };

    return tourResource;
  }

  static collection(tours: Array<Tour>) {
    return tours.map((instance) => {
      const tourResource = new TourResource(instance);
      return tourResource.item();
    });
  }
}

export default TourResource;
