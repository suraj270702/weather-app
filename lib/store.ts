import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../lib/store/filter'
import cityReducer from './store/CitySlice'
import { userAPi } from './store/Api'
import { weatherApi } from './store/WeatherApi'
import coordinatesReducer from './store/CoordinatesSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      filter:filterReducer,
      city:cityReducer,
      coords:coordinatesReducer,
      [userAPi.reducerPath]:userAPi.reducer,
      [weatherApi.reducerPath]:weatherApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userAPi.middleware).concat(weatherApi.middleware)
  })
}


export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']