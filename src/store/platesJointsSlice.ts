import { createSlice, PayloadAction } from '@reduxjs/toolkit';

    const initialState:{
        id: string,
        length: number
    }[] = []

    export const platesJointsSlice = createSlice({
        name: 'platesJoints',
        initialState,
        reducers: {
            addPlateJoint: (state, action:PayloadAction<{id: string, length: number}>) => {
                state.push(action.payload)
                return state
            },
            removePlateJoint: (state, action:PayloadAction<string>) => {

                const index = state.findIndex(elm => elm.id === action.payload)

                if (index >= 0) {
                    state.splice(index, 1)
                }
                return state
            },
            setLengthJoint: (state, action: PayloadAction<{id: string, length: number}>) => {
                const index = state.findIndex(elm => elm.id === action.payload.id)
                state[index].length = action.payload.length
                return state
            },
            setIDJoint: (state, action: PayloadAction<{id: string, newId: string}>) => {
                const index = state.findIndex(elm => elm.id === action.payload.id)
                if (index !== -1) state[index].id = action.payload.newId
                // console.log(index)
                return state
            }
        }
    })

export default platesJointsSlice.reducer
export const {
    addPlateJoint,
    removePlateJoint,
    setLengthJoint,
    setIDJoint
} = platesJointsSlice.actions