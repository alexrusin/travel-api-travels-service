type TourEntity = {
  id: string;
  travel_id: string;
  name: string;
  starting_date: Date;
  ending_date: Date;
  price: number;
};

type TravelEntity = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  number_of_days: number;
  tours: Array<TourEntity>;
};

interface TourAttributes {
  id: string;
  travel_id: string;
  name: string;
  starting_date: Date;
  ending_date: Date;
  price: number;
  created_at: Date;
  updated_at: Date;
}

interface TravelAttributes {
  id: string;
  name: string;
  description: string;
  slug: string;
  is_public: boolean;
  number_of_days: number;
  tours: Array<TourAttributes>;
  created_at: Date;
  updated_at: Date;
}
