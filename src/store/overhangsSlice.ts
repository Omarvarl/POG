import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOverhang } from '../Types/Types';


const defaultLengths: {start: IOverhang, end: IOverhang} = {
    start: {
        length: 250,
        type: 'withBevel',
        filling: false
    },
    end: {
        length: 250,
        type: 'withBevel',
        filling: false
    },
}

export const overhangsSlice = createSlice({
    name: 'overhangs',
    initialState: defaultLengths,
    reducers: {
        setStartLength: (state, action:PayloadAction<number>) => {
            state.start.length = action.payload >= 250 ? action.payload : 250
            return state
        },
        setStartType: (state, action:PayloadAction<string>) => {
            state.start.type = action.payload
            return state
        },
        setStartfilling: (state, action:PayloadAction<boolean>) => {
            state.start.filling = action.payload
            return state
        },
        setEndLength: (state, action:PayloadAction<number>) => {
            state.end.length = action.payload >= 250 ? action.payload : 250
            return state
        },
        setEndType: (state, action:PayloadAction<string>) => {
            state.end.type = action.payload
            return state
        },
        setEndfilling: (state, action:PayloadAction<boolean>) => {
            state.end.filling = action.payload
            return state
        },
    }
})

export default overhangsSlice.reducer
export const {
    setStartLength,
    setEndLength,
    setStartType,
    setEndType,
    setStartfilling,
    setEndfilling
} = overhangsSlice.actions