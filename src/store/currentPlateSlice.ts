import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGround } from '../Types/Types';

const initialState = {
    id: 'plate_0',
    position: 0,
    length: 10000
}

export const currentPlateSlice = createSlice({
    name: 'currentGround',
    initialState,
    reducers: {
        setCurrentPlate: (state, action:PayloadAction<IGround>) => {
            // console.log('CHANGE', action.payload)
            return action.payload
        }
    }
})

export default currentPlateSlice.reducer
export const { setCurrentPlate } = currentPlateSlice.actions