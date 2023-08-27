import Travel from "../../../database/models/Travel";

type TravelEntity = {
  id: string;
  name: string;
  description: string;
  slug: string;
  number_of_days: number;
};

class TravelResource {
  #instance: Travel;
  constructor(travel: Travel | null) {
    if (!travel) {
      throw new Error("Entity not found");
    }
    this.#instance = travel;
  }

  item() {
    const travelResource: TravelEntity = {
      id: this.#instance.id,
      name: this.#instance.name,
      description: this.#instance.description,
      slug: this.#instance.slug,
      number_of_days: this.#instance.number_of_days,
    };

    return travelResource;
  }

  static collection(travels: Array<Travel>) {
    return travels.map((instance) => {
      const travelResource = new TravelResource(instance);
      return travelResource.item();
    });
  }
}

export default TravelResource;
