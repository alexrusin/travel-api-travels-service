import Travel from "../database/models/Travel";
import BaseResource from "./BaseResource";
import TourResource, { TourEntity } from "./TourResource";

export type TravelEntity = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  number_of_days: number;
  tours: Array<TourEntity>;
};

class TravelResource extends BaseResource<Travel, TravelEntity>() {
  item() {
    const travelResource: TravelEntity = {
      id: this.instance.id,
      name: this.instance.name,
      description: this.instance.description || undefined,
      slug: this.instance.slug,
      number_of_days: this.instance.number_of_days,
      tours: TourResource.collection(this.instance.tours),
    };

    return travelResource;
  }
}

export default TravelResource;
