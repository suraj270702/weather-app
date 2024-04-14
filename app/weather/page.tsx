"use client";
import {
  useGetWeatherDetailsQuery,
  useGetWeatherForecastDetailsQuery,
} from "@/lib/store/WeatherApi";
import Image from "next/image";
import { WeatherData } from "@/types/weatherTypes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

interface DataItem {
  title: string;
  svg: JSX.Element; 
  value: string | undefined;
}

const WeatherPage = () => {

  const [longitude,setLongitude] = useState<string>("")
  const [latitude,setLatitude] = useState<string>("")
  const [name,setName]  = useState("")
  

  const long = useSelector<RootState, number>(
    (state) => state.coords.lon
  );

  const lat = useSelector<RootState, number>(
    (state) => state.coords.lat
  );

  const cityName : string  = useSelector((state:RootState)=> state.coords.cityName);


  useEffect(()=>{
    setLongitude(localStorage.getItem("longitude") || "0")
    setLatitude(localStorage.getItem("latitude")||"")
    setName(localStorage.getItem("cityName") || "")
  },[])
  
  

  const { data: weatherData } = useGetWeatherDetailsQuery({lon:long===0 ? parseFloat(longitude) : long,lat:lat===0 ? parseFloat(latitude) : lat});
  const { data: weatherForecastData } = useGetWeatherForecastDetailsQuery({lon:long===0 ? parseFloat(longitude) : long,lat:lat===0 ? parseFloat(latitude) : lat});

 // console.log(weatherForecastData);

  interface ForecastData {
    [date: string]: WeatherData[];
  }

  const forecastData: ForecastData = {};

  if (weatherForecastData) {
    for (let i = 0; i < weatherForecastData.list.length; i++) {
      let item = weatherForecastData.list[i];
      let date = item.dt_txt.split(" ")[0];
      if (!forecastData[date]) {
        forecastData[date] = [item];
      } else {
        forecastData[date].push(item);
      }
    }
  }

  function formatUnixTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds
    return date.toLocaleTimeString(); // Format time as a string (e.g., "12:30:45 PM")
  }

  const dataArray: DataItem[] = [
    {
      title: "Sunrise",
      svg: (
        <svg
          viewBox="0 0 512 512"
          style={{
            width: "24px",
            height: "24px",
            overflow: "visible",
            opacity: 1,
            zIndex: 1,
            fill: "rgb(147, 153, 162)",
          }}
        >
          <path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96s96-43.1 96-96s-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z" />
        </svg>
      ),
      value: weatherData?.sys
        ? formatUnixTimestamp(weatherData.sys.sunrise)
        : "",
    },
    {
      title: "Sunset",
      svg: (
        <svg
          viewBox="0 0 640 512"
          style={{
            width: "24px",
            height: "24px",
            overflow: "visible",
            opacity: 1,
            zIndex: 1,
            fill: "rgb(147, 153, 162)",
          }}
        >
          <path d="M575.2 325.7c.2-1.9.8-3.7.8-5.6 0-35.3-28.7-64-64-64-12.6 0-24.2 3.8-34.1 10-17.6-38.8-56.5-66-101.9-66-61.8 0-112 50.1-112 112 0 3 .7 5.8.9 8.7-49.6 3.7-88.9 44.7-88.9 95.3 0 53 43 96 96 96h272c53 0 96-43 96-96 0-42.1-27.2-77.4-64.8-90.4zm-430.4-22.6c-43.7-43.7-43.7-114.7 0-158.3 43.7-43.7 114.7-43.7 158.4 0 9.7 9.7 16.9 20.9 22.3 32.7 9.8-3.7 20.1-6 30.7-7.5L386 81.1c4-11.9-7.3-23.1-19.2-19.2L279 91.2 237.5 8.4C232-2.8 216-2.8 210.4 8.4L169 91.2 81.1 61.9C69.3 58 58 69.3 61.9 81.1l29.3 87.8-82.8 41.5c-11.2 5.6-11.2 21.5 0 27.1l82.8 41.4-29.3 87.8c-4 11.9 7.3 23.1 19.2 19.2l76.1-25.3c6.1-12.4 14-23.7 23.6-33.5-13.1-5.4-25.4-13.4-36-24zm-4.8-79.2c0 40.8 29.3 74.8 67.9 82.3 8-4.7 16.3-8.8 25.2-11.7 5.4-44.3 31-82.5 67.4-105C287.3 160.4 258 140 224 140c-46.3 0-84 37.6-84 83.9z" />
        </svg>
      ),
      value: weatherData?.sys
        ? formatUnixTimestamp(weatherData.sys.sunset)
        : "",
    },
    {
      title: "Wind",
      svg: (
        <svg
          viewBox="0 0 512 512"
          style={{
            width: "24px",
            height: "24px",
            overflow: "visible",
            opacity: 1,
            zIndex: 1,
            fill: "rgb(147, 153, 162)",
          }}
        >
          <path d="M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z" />
        </svg>
      ),
      value: weatherData?.wind
        ? weatherData.wind.speed.toString().concat(" Km/h")
        : "",
    },
    {
      title: "Visibility",
      svg: (
        <svg
          viewBox="0 0 512 512"
          style={{
            width: "24px",
            height: "24px",
            overflow: "visible",
            opacity: 1,
            zIndex: 1,
            fill: "rgb(147, 153, 162)",
          }}
        >
          <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" />
        </svg>
      ),
      value: weatherData?.visibility
        ? Math.round(weatherData.visibility / 1000)
            .toString()
            .concat(" Km")
        : "",
    },
    {
      title: "Humidity",
      svg: (
        <svg
          viewBox="0 0 512 512"
          style={{
            width: "24px",
            height: "24px",
            overflow: "visible",
            opacity: 1,
            zIndex: 1,
            fill: "rgb(147, 153, 162)",
          }}
        >
          <path d="M389.66 135.6L231.6 293.66c-9.37 9.37-24.57 9.37-33.94 0l-11.32-11.32c-9.37-9.37-9.37-24.57 0-33.94l.11-.11c-34.03-40.21-35.16-98.94-3.39-140.38-11.97-7.55-26.14-11.91-41.3-11.91C98.88 96 64 130.88 64 173.76V480H0V173.76C0 95.59 63.59 32 141.76 32c36.93 0 70.61 14.2 95.86 37.42 35.9-11.51 76.5-4.5 106.67 21.03l.11-.11c9.37-9.37 24.57-9.37 33.94 0l11.32 11.32c9.37 9.37 9.37 24.57 0 33.94zM384 208c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm32 0c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zm96 0c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm-160 32c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm48-16c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zm80 16c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm-160 32c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm32 0c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zm96 0c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm-128 32c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16zm96 0c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm-96 32c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm64 0c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm-32 32c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm-32 32c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16z" />
        </svg>
      ),
      value: weatherData?.main?.humidity
        ? weatherData.main.humidity.toString().concat("%")
        : "",
    },
    {
      title: "Pressure",
      svg: (
        <svg
          viewBox="0 0 512 512"
          style={{
            width: "24px",
            height: "24px",
            overflow: "visible",
            opacity: 1,
            zIndex: 1,
            fill: "rgb(147, 153, 162)",
          }}
        >
          <path d="M288 32C128.94 32 0 160.94 0 320c0 52.8 14.25 102.26 39.06 144.8 5.61 9.62 16.3 15.2 27.44 15.2h443c11.14 0 21.83-5.58 27.44-15.2C561.75 422.26 576 372.8 576 320c0-159.06-128.94-288-288-288zm0 64c14.71 0 26.58 10.13 30.32 23.65-1.11 2.26-2.64 4.23-3.45 6.67l-9.22 27.67c-5.13 3.49-10.97 6.01-17.64 6.01-17.67 0-32-14.33-32-32S270.33 96 288 96zM96 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm48-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm246.77-72.41l-61.33 184C343.13 347.33 352 364.54 352 384c0 11.72-3.38 22.55-8.88 32H232.88c-5.5-9.45-8.88-20.28-8.88-32 0-33.94 26.5-61.43 59.9-63.59l61.34-184.01c4.17-12.56 17.73-19.45 30.36-15.17 12.57 4.19 19.35 17.79 15.17 30.36zm14.66 57.2l15.52-46.55c3.47-1.29 7.13-2.23 11.05-2.23 17.67 0 32 14.33 32 32s-14.33 32-32 32c-11.38-.01-20.89-6.28-26.57-15.22zM480 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path>
        </svg>
      ),
      value: weatherData?.main?.pressure
        ? weatherData.main.pressure.toString().concat(" hPa")
        : "",
    },
  ];

  //console.log(Object.keys(forecastData))
  //console.log(Object.values(forecastData))

  return (
    <div className="bg-black">
      <div className="w-[90%] mx-auto bg-custom-bg h-full">
        {
          weatherData && weatherForecastData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 gap-y-5 w-[98%] lg:w-[94%] mx-auto">
          <div className="lg:col-span-2">
            <div className="p-5">
              <div className="flex items-center gap-x-10">
                <div>
                  <h1 className="text-[20px] md:text-[30px] lg:text-[40px] font-bold text-white">
                    {cityName ? cityName : name}
                  </h1>
                  <h1 className="text-gray-600 ">
                    {weatherData?.weather[0].main}
                  </h1>
                </div>
                <h1 className="text-[30px] md:text-[40px] lg:text-[50px] font-extrabold text-white">
                  {weatherData?.main.temp &&
                    Math.round(weatherData?.main.temp - 273.15)}
                  °C
                </h1>
              </div>
            </div>
            <div className="mt-10 bg-card-bg w-full rounded-lg p-5">
              <div>
                <h1 className="text-gray-600 text-[20px] md:30px font-medium">
                  Today's Forecast
                </h1>
                <div className="grid grid-cols-2 gap-x-5 gap-y-5 md:grid-cols-4 lg:grid-cols-6 mt-5">
                  {weatherForecastData &&
                    Object.values(forecastData)[0].map((item, i) => (
                      <div className="flex items-center flex-col" key={i}>
                        <h1 className="text-gray-600 font-bold">
                          {item.dt_txt.split(" ")[1]}
                        </h1>
                        <Image
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          className=""
                          width={100}
                          height={100}
                          alt=""
                        />
                        <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-white">
                          {Math.round(item.main.temp - 273.15)}°C
                        </h1>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-5">
              {dataArray.map((item, i) => (
                <div className=" bg-card-bg rounded-lg p-5" key={i}>
                  <div className="flex items-start gap-x-5">
                    <div>{item.svg}</div>
                    <div className="flex flex-col items-center gap-y-5">
                      <h1 className="text-gray-600 text-lg md:text-xl lg:text-2xl font-medium">
                        {item.title}
                      </h1>
                      <h1 className="text-white text-lg md:text-xl lg:text-2xl font-bold">
                        {item.value}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" bg-card-bg rounded-lg mt-10 p-4 h-fit">
            <div>
              <h1 className="text-gray-600 text-[20px]  font-medium">
                6-Day Forecast
              </h1>
              <div className="mt-5">
                {weatherForecastData &&
                  Object.values(forecastData)
                    .slice(1)
                    .map((item, i) => (
                      <div
                        className="flex items-center justify-between mb-5"
                        key={i}
                      >
                        <h1 className="text-white text-[16px] font-medium">
                          {Object.keys(forecastData)[i + 1]}
                        </h1>
                        <Image
                          src={`https://openweathermap.org/img/wn/${item[0].weather[0].icon}@2x.png`}
                          className=""
                          width={100}
                          height={100}
                          alt=""
                        />
                        <h1 className="text-white text-[16px] font-medium">
                          {item[0].weather[0].main}
                        </h1>
                        <h1 className="text-white text-[16px] font-medium">
                          {Math.round(item[0].main.temp - 273.15)}°C
                        </h1>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
          )
        }
      </div>
    </div>
  );
};

export default WeatherPage;
