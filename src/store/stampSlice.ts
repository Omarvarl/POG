import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const defaultPageSize: {
    display: string,
    right: string,
    bottom: string,
    designer: string,
    checker: string,
    techControl: string,
    normControl: string,
    approver: string
} = {
    display: 'none',
    right: '0px',
    bottom: '0px',
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
        changeDisplay: (state, action: PayloadAction<{right: string, bottom: string}>) => {
            state = state.display === 'none'
                ? {...state, display: 'block'}
                : {...state, display: 'none'}

            state.right = action.payload.right
            state.bottom = action.payload.bottom
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
    changeDisplay,
    setDesigner,
    setChecker,
    setTechControl,
    setNormControl,
    setApprover
} = stampSlice.actions