import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    display: 'none',
    exId: ''
}

export const exJointPopVisibilitySlice = createSlice({
    name: 'exJointVisibility',
    initialState,
    reducers: {
        showExJointPop: (state, action:PayloadAction<string>) => {
            state.display = 'block'
            state.exId = action.payload
            return state
        },
        hideExJointPop: (state) => {
            state.display = 'none'
            return state
        }
    }
})

export default exJointPopVisibilitySlice.reducer
export const { showExJointPop, hideExJointPop } = exJointPopVisibilitySlice.actions