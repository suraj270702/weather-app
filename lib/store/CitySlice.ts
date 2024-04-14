import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../lib/store'
import { City } from '@/types/cityTypes';



  
  interface CityState {
    cities: City[];
  }
  
  const initialState: CityState = {
    cities: [],
  };

export const citySlice = createSlice({
  name: 'citySlice',
  
  initialState,
  reducers: {
    add:(state,action)=>{
       state.cities.push(action.payload)
    },
    reset:(state,action)=>{
      console.log("from reset",action.payload)
      state.cities = action.payload
      console.log("from reset",state.cities)
    }
  }
})

export const {add,reset } = citySlice.actions


export default citySlice.reducer