import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = true

export const upFitingSlice = createSlice({
    name: 'viewBreak',
    initialState,
    reducers: {
        changeUpFitingState: (state) => {
            state = !state
            return state
        }
    }
})

export default upFitingSlice.reducer
export const { changeUpFitingState } = upFitingSlice.actions