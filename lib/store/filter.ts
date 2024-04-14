import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../lib/store'


interface filterState {
  value: number,
  search:string,
  sort:string
}


const initialState: filterState = {
  value: 0,
  search:"",
  sort:"ascii_name"
}

export const counterSlice = createSlice({
  name: 'filter',
  
  initialState,
  reducers: {
    increment: state => {
      state.value += 20
    },
    decrement: state => {
      state.value -= 20
    },
    
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
    setSearchQuery:  (state,action :PayloadAction<string>)=>{
      state.search=action.payload;
    },
    setSortName:(state,action:PayloadAction<string>)=>{
      state.sort = action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount,setSearchQuery,setSortName } = counterSlice.actions


export default counterSlice.reducer