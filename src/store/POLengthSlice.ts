import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 0

export const POLengthSlice = createSlice({
    name: 'drawParam',
    initialState,
    reducers: {
        setPOLength: (state, action:PayloadAction<number>) => {
            return action.payload
        }
    }
})

export default POLengthSlice.reducer
export const { setPOLength } = POLengthSlice.actions