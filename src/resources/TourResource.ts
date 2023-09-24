import BaseResource from "./BaseResource";

class TourResource extends BaseResource<TourAttributes, TourEntity>() {
  item() {
    const tourResource: TourEntity = {
      id: this.instance.id,
      travel_id: this.instance.travel_id,
      name: this.instance.name,
      starting_date: this.instance.starting_date,
      ending_date: this.instance.ending_date,
      price: this.instance.price,
    };

    return tourResource;
  }
}

export default TourResource;
