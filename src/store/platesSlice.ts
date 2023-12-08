import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExpansionJoints } from '../Types/Types';

const initialState:IExpansionJoints[] = [{
    id: 'plate_0',
    position: 0,  //  start position in assembley coordinate system
    length: 10000,
    left: 250,  //  min distance for first stand
    right: 250  //  min distance for last stand
    }
]

export const platesSlice = createSlice({
    name: 'plates',
    initialState,
    reducers: {
        addPlate: (state, action:PayloadAction<IExpansionJoints>) => {
            state.push(action.payload)
            state.sort((a, b) => a.position - b.position)
            return state
        },
        removePlate: (state, action:PayloadAction<string>) => {
            const index = state.findIndex(elm => elm.id === action.payload)

            if (index >= 0) {
                state.splice(index, 1)
            }
            return state
        },
        connectPlates: (state, action:PayloadAction<string>) => {
            const index = state.findIndex(elm => elm.id === action.payload)
            
            if (index > 0) {
                state[index - 1].length = state[index].position + state[index].length - state[index - 1].position
                state.splice(index, 1)
            } else if (index === 0 && state.length > 1) {
                state[index + 1].length = state[index + 1].position + state[index + 1].length
                state[index + 1].position = 0
                state[index + 1].id = state[index].id
                state.splice(index, 1)
            }
            return state
        },
        setPosition: (state, action:PayloadAction<{id: string, position: number}>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) state[i].position = action.payload.position
            }
            return state
        },
        setLength: (state, action:PayloadAction<{id: string, length: number}>) => {
            for (let i = 0; i < state.length; i++) {
                if (state.length > 1 || action.payload.length >= 5000)  {
                    if (state[i].id === action.payload.id) state[i].length = action.payload.length
                }
            }
            return state
        },
        setLeft: (state, action:PayloadAction<{id: string, left: number}>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) state[i].left = action.payload.left
            }
            return state
        },
        setRight: (state, action:PayloadAction<{id: string, right: number}>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) state[i].right = action.payload.right
            }
            return state
        },
    }
})

export default platesSlice.reducer
export const {
    addPlate,
    removePlate,
    setPosition,
    setLength,
    setLeft,
    setRight,
    connectPlates
} = platesSlice.actions