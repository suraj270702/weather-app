"use client"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { WeatherForecastResponse,WeatherInfo } from "@/types/weatherTypes";




export const weatherApi = createApi({
    reducerPath:"weatherApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://api.openweathermap.org/data/2.5/"}),
    endpoints:(builder)=>({
      getWeatherDetails:builder.query<WeatherInfo,{lon:number,lat:number}>({
        query:({lon,lat})=>`weather?lat=${lat}&lon=${lon}&appid=ce828df304497ea9f71dbd0271cc7c9b`
      }),
      getWeatherForecastDetails:builder.query<WeatherForecastResponse,{lon:number,lat:number}>({
        query:({lon,lat})=>`forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      })
    })
  })
  
  
  export const {useGetWeatherDetailsQuery,useGetWeatherForecastDetailsQuery} = weatherApi