import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPagedDim } from '../Types/Types'

let startW = 5940
let startH = 4200
while (window.innerWidth * 0.85 < startW || window.innerHeight < startH) {
    startW /= 1.1;
    startH /= 1.1;
}

const defaultPageSize:IPagedDim = {
    width: startW,
    height: startH,
    factor: 1
}

export const pageSizeSlice = createSlice({
    name: 'pageSize',
    initialState: defaultPageSize,
    reducers: {
        setPageSize: (state, action:PayloadAction<IPagedDim>) => {
            state = action.payload
            return state
        }
    }
})

export default pageSizeSlice.reducer
export const { setPageSize } = pageSizeSlice.actions