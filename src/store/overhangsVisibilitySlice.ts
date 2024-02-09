import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    display: 'none',
    target: 'start'
}

export const OverhangVisibilitySlice = createSlice({
    name: 'OverhangVisibility',
    initialState,
    reducers: {
        showOverhangMenu: (state, action:PayloadAction<string>) => {
            state.display = 'block'
            state.target = action.payload
            return state
        },
        hideOverhangMenu: (state) => {
            state.display = 'none'
            return state
        }
    }
})

export default OverhangVisibilitySlice.reducer
export const { showOverhangMenu, hideOverhangMenu } = OverhangVisibilitySlice.actions