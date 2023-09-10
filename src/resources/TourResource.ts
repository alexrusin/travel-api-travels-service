import Tour from "../database/models/Tour";
import BaseResource from "./BaseResource";

export type TourEntity = {
  id: string;
  travel_id: string;
  name: string;
  starting_date: Date;
  ending_date: Date;
  price: number;
};

class TourResource extends BaseResource<Tour, TourEntity>() {
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
