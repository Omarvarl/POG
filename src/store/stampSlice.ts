import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const defaultPageSize: {
    display: string,
    designer: string,
    checker: string,
    techControl: string,
    normControl: string,
    approver: string
} = {
    display: 'none',
    designer: '',
    checker: '',
    techControl: '',
    normControl: '',
    approver: ''
}

export const stampSlice = createSlice({
    name: 'stamp',
    initialState: defaultPageSize,
    reducers: {
        showStampMenu: (state) => {
            state.display = 'block'
            return state
        },

        hideStampMenu: (state) => {
            state.display = 'none'
            return state
        },

        setDesigner: (state, action:PayloadAction<string>) => {
            state = {...state, designer: action.payload}
            return state
        },
        setChecker: (state, action:PayloadAction<string>) => {
            state = {...state, checker: action.payload}
            return state
        },
        setTechControl: (state, action:PayloadAction<string>) => {
            state = {...state, techControl: action.payload}
            return state
        },
        setNormControl: (state, action:PayloadAction<string>) => {
            state = {...state, normControl: action.payload}
            return state
        },
        setApprover: (state, action:PayloadAction<string>) => {
            state = {...state, approver: action.payload}
            return state
        }
    }
})

export default stampSlice.reducer
export const {
    showStampMenu,
    hideStampMenu,
    setDesigner,
    setChecker,
    setTechControl,
    setNormControl,
    setApprover
} = stampSlice.actions