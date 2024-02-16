import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = true

export const doubleSectionsSlice = createSlice({
    name: 'viewBreak',
    initialState,
    reducers: {
        changeDoubleSectionsState: (state) => {
            state = !state
            return state
        }
    }
})

export default doubleSectionsSlice.reducer
export const { changeDoubleSectionsState } = doubleSectionsSlice.actions