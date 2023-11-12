import Tour from "../database/models/Tour";
import BaseRepository from "./BaseRepository";

export default class TourRepository extends BaseRepository<TourAttributes> {
  protected allowedSortByFields = [
    "name",
    "price",
    "starting_date",
    "ending_date",
  ];

  constructor() {
    super(Tour);
  }
}
