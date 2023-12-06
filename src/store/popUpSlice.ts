import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    display: 'none',
    x: 0,
    y: 0
};

export const popUpSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
        setPopUp: (state, action:PayloadAction<{x: number, y: number}>) => {
            state.display = (state.display === 'none') ? 'flex' : 'none'
            state.x = action.payload.x
            state.y = action.payload.y
            return state
        },
        hidePopUp: (state) => {
            state.display = 'none'
            return state
        }
    }
})

export default popUpSlice.reducer
export const { setPopUp, hidePopUp } = popUpSlice.actions