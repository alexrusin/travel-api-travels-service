import BaseResource from "./BaseResource";
import TourResource from "./TourResource";

class TravelResource extends BaseResource<TravelAttributes, TravelEntity>() {
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
