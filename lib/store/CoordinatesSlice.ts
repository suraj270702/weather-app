import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../lib/store'


interface coordinatesState {
    lon: number,
    lat: number
    cityName:string
}


const initialState: coordinatesState = {
    lon: 0,
    lat: 0,
    cityName:""
}

export const coordinatesSlice = createSlice({
    name: 'coordinates',

    initialState,
    reducers: {
        setCoordinates: (state, action) => {
            const  { lon, lat,name } = action.payload 
            state.lon = lon
            state.lat = lat
            state.cityName=name
        },

    }
})

export const { setCoordinates } = coordinatesSlice.actions


export default coordinatesSlice.reducer