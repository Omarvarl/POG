import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 'translate(0, 0) scale(1)'

export const drawParamSlice = createSlice({
    name: 'drawParam',
    initialState,
    reducers: {
        setDrawParam: (state, action:PayloadAction<string>) => {
            return action.payload
        }
    }
})

export default drawParamSlice.reducer
export const { setDrawParam } = drawParamSlice.actions