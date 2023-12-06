import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPOLength } from '../Types/Types';

const initialState:IPOLength = {
    POLength: 0,
    scaledPOLength: 1,
    screenWidth: 4200,
    scale: 1
}

const drawScales = [1, 2, 2.5, 4, 5, 10, 15, 20, 25, 40, 50, 75, 100];

export const reducedPOLengthSlice = createSlice({
    name: 'drawParam',
    initialState,
    reducers: {
        setReducedPOLength: (state, action:PayloadAction<IPOLength>) => {
            const newPOLength = action.payload.POLength
            let scaledPOLength = newPOLength
            const width = action.payload.screenWidth
            let i = 1;
            while (i < drawScales.length && (scaledPOLength + (2500 / drawScales[i]) >= width || scaledPOLength > 5000)) {
                scaledPOLength = newPOLength / drawScales[i];
                i++;
            }
            return {
                POLength: newPOLength,
                scaledPOLength: scaledPOLength,
                screenWidth: width,
                scale: drawScales[i - 1]
            }
        },
        setReducedScale: (state, action: PayloadAction<number>) => {
            state.scale = action.payload
            return state
        }
    }
})

export default reducedPOLengthSlice.reducer
export const { setReducedPOLength, setReducedScale } = reducedPOLengthSlice.actions