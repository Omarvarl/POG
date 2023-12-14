import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = false

export const viewBreakSlice = createSlice({
    name: 'viewBreak',
    initialState,
    reducers: {
        setViewBreakState: (state, action:PayloadAction<boolean>) => {
            if (action.payload) {
                return action.payload
            } else {
                return false
            }

        }
    }
})

export default viewBreakSlice.reducer
export const { setViewBreakState } = viewBreakSlice.actions