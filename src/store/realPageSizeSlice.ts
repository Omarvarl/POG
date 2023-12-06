import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPagedDim } from '../Types/Types'

const defaultPageSize:IPagedDim = {
    width: 5940,
    height: 4200,
    factor: 1
}

export const realPageSizeSlice = createSlice({
    name: 'realPageSize',
    initialState: defaultPageSize,
    reducers: {
        setRealPageSize: (state, action:PayloadAction<IPagedDim>) => {
            state = action.payload
            return state
        }
    }
})

export default realPageSizeSlice.reducer
export const { setRealPageSize } = realPageSizeSlice.actions