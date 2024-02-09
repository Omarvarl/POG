import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    display: 'none',
    left: '0px',
    top: '0px',
    exId: ''
}

export const exJointPopVisibilitySlice = createSlice({
    name: 'exJointVisibility',
    initialState,
    reducers: {
        changeExJointVisibility: (state, action:PayloadAction<{left: string, top: string, exId: string}>) => {
            if (state.display === 'none') {
                state.display = 'block'
            } else {
                state.display = 'none'
            }
            state.left = action.payload.left
            state.top = action.payload.top
            state.exId = action.payload.exId
            return state
        },
        hideExJointPop: (state) => {
            state.display = 'none'
            return state
        }
    }
})

export default exJointPopVisibilitySlice.reducer
export const { changeExJointVisibility, hideExJointPop } = exJointPopVisibilitySlice.actions