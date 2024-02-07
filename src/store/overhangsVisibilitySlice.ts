import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    display: 'none',
    target: 'start',
    left: 0,
    top: 0
}

export const OverhangVisibilitySlice = createSlice({
    name: 'OverhangVisibility',
    initialState,
    reducers: {
        changeOverhangVisibility: (state, action:PayloadAction<{left: number, top: number, target: string}>) => {
            state.display = (state.display === 'none') ? 'flex' : 'none'
            state.left = action.payload.left
            state.top = action.payload.top
            state.target = action.payload.target
            return state
        },
        hideOverhangMenu: (state) => {
            state.display = 'none'
            return state
        }
    }
})

export default OverhangVisibilitySlice.reducer
export const { changeOverhangVisibility, hideOverhangMenu } = OverhangVisibilitySlice.actions