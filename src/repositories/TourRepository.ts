import Tour from "../database/models/Tour";
import BaseRepository from "./BaseRepository";

export default class TourRepository extends BaseRepository<TourAttributes> {
  constructor() {
    super(Tour);
  }
}
