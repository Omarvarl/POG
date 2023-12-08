import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPOLength } from '../Types/Types';

const initialState:IPOLength = {
    POLength: 10000,
    scaledPOLength: 4000,
    screenWidth: 5940,
    scale: 2.5
}

const drawScales = [1, 2, 2.5, 4, 5, 10, 15, 20, 25, 40, 50, 75, 100];

export const POLengthSlice = createSlice({
    name: 'drawParam',
    initialState,
    reducers: {
        setPOLength: (state, action:PayloadAction<IPOLength>) => {
            const newPOLength = action.payload.POLength
            let scaledPOLength = newPOLength
            const width = action.payload.screenWidth
            let i = 1;
            while (i < drawScales.length && (scaledPOLength + (2500 / drawScales[i]) >= width || scaledPOLength > 5000)) {

                scaledPOLength = newPOLength / drawScales[i];
                i++;
            }
            if (newPOLength >= 5000) {
                return {
                    POLength: newPOLength,
                    scaledPOLength: scaledPOLength,
                    screenWidth: width,
                    scale: drawScales[i - 1]
                }
            } else return state
        }
    }
})

export default POLengthSlice.reducer
export const { setPOLength } = POLengthSlice.actions