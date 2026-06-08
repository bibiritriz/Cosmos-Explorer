export type ApodItem = {
  title: string;
  date: string;
  url: string;
  hdurl?: string;
  explanation: string;
  media_type: 'image' | 'video';
  copyright?: string;
};

export type EpicImage = {
  identifier: string;
  image: string;
  date: string;
  caption: string;
  coords?: {
    centroid_coordinates?: { lat: number; lon: number };
  };
};

export type CloseApproach = {
  close_approach_date: string;
  miss_distance: { kilometers: string };
  relative_velocity: { kilometers_per_hour: string };
};

export type NeoItem = {
  id: string;
  name: string;
  is_potentially_hazardous_asteroid: boolean;
  estimated_diameter: {
    kilometers: { estimated_diameter_min: number; estimated_diameter_max: number };
  };
  close_approach_data: CloseApproach[];
};
