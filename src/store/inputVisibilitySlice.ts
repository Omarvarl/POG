import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    display: 'none',
    left: 0,
    top: 0
}

export const inputVisibilitySlice = createSlice({
    name: 'inputVisibility',
    initialState,
    reducers: {
        changeVisibility: (state, action:PayloadAction<{left: number, top: number}>) => {
            if (state.display === 'none') {
                state.display = 'block'
            } else {
                state.display = 'none'
            }
            state.left = action.payload.left
            state.top = action.payload.top
            return state
        },
        hideInput: (state) => {
            state.display = 'none'
            return state
        }
    }
})

export default inputVisibilitySlice.reducer
export const { changeVisibility, hideInput } = inputVisibilitySlice.actions