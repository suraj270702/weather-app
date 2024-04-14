export interface City {
    admin1_code: string | null;
    admin2_code: string | null;
    admin3_code: string | null;
    admin4_code: string | null;
    alternate_names: string[];
    ascii_name: string;
    coordinates: {
      lon: number;
      lat: number;
    };
    cou_name_en: string;
    country_code: string;
    country_code_2: string | null;
    dem: number | null;
    elevation: number | null;
    feature_class: string;
    feature_code: string;
    geoname_id: string;
    label_en: string;
    modification_date: string;
    name: string;
    population: number;
    timezone: string;
  }
  
 export interface CityApiResponse {
    results: City[];
  }