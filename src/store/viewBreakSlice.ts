import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = false

export const viewBreakSlice = createSlice({
    name: 'viewBreak',
    initialState,
    reducers: {
        setViewBreakState: (state) => {
            state = !state
            return state
        }
    }
})

export default viewBreakSlice.reducer
export const { setViewBreakState } = viewBreakSlice.actions