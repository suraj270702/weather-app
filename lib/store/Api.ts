"use client"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CityApiResponse } from '@/types/cityTypes'
export const userAPi = createApi({
    reducerPath: 'Api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/' }),
    endpoints: (builder) => ({
      getCities: builder.query<CityApiResponse,{page:number,name:string}>({
        query: ({page,name}) => `records?offset=${page}&limit=30&order_by=${name}`,
        
      }),
      getSuggestedCities:builder.query<CityApiResponse,{name:string}>({
        query:({name})=>`records?where=suggest(name,"${name}")&limit=10`
      }),
      
    })
})



export const {useGetCitiesQuery,useGetSuggestedCitiesQuery} = userAPi
  