interface City {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    sunrise:number,
    sunset:number
  }
  
  interface Coordinates {
    lat: number;
    lon: number;
  }
  
 export interface WeatherForecastResponse {
    cnt: number;
    cod: string;
    list: WeatherData[];
    city:City
  }
  
 export  interface WeatherData {
    dt: number;
    dt_txt: string;
    main: MainWeatherData;
    weather: WeatherCondition[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
  }
  
  interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf?: number;
  }
  
  interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface Clouds {
    all: number;
  }
  
  interface Wind {
    speed: number;
    deg: number;
    gust?: number;
  }
  
  interface Sys {
    pod: string;
  }

export   interface WeatherInfo {
    base: string;
    clouds: {
      all: number;
    };
    cod: number;
    coord: {
      lon: number;
      lat: number;
    };
    dt: number;
    id: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity?: number;
    };
    name: string;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    visibility: number;
    weather: Array<{
      id?: number;
      main?: string;
      description?: string;
      icon?: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
  }