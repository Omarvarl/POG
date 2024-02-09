import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExpansionJoints } from '../Types/Types';


const initialState:IExpansionJoints[] = []

export const expansionJointsQuantitySlice = createSlice({
    name: 'expansionJointsQuantity',
    initialState,
    reducers: {
        addExpansionJoin: (state, action:PayloadAction<IExpansionJoints>) => {
            state.push(action.payload)
            state.sort((a, b) => a.position - b.position)
            return state
        },
        removeExpansionJoint: (state, action:PayloadAction<string>) => {
            const index = state.findIndex(elm => elm.id === action.payload)

            if (index >= 0) {
                state.splice(index, 1)
            }
            return state
        },
        setExpansionJointPosition: (state, action:PayloadAction<{id: string, position: number}>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) state[i].position = action.payload.position
            }
            return state
        },
        setExpansionJointLength: (state, action:PayloadAction<{id: string, length: number}>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) state[i].length = action.payload.length
            }
            return state
        },
        setExpansionJointLeft: (state, action:PayloadAction<{id: string, left: number}>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) state[i].left = action.payload.left
            }
            return state
        },
        setExpansionJointRight: (state, action:PayloadAction<{id: string, right: number}>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) state[i].right = action.payload.right
            }
            return state
        },
        setIdExpansionJoint: (state, action:PayloadAction<{id: string, newId: string}>) => {
            const index = state.findIndex(elm => elm.id === action.payload.id)
            if(index !== -1) state[index].id = action.payload.newId
            return state
        },
        setMove: (state, action:PayloadAction<{id: string, move: number}>) => {
            const index = state.findIndex(elm => elm.id === action.payload.id)
            if(index !== -1) state[index].move = action.payload.move
            return state
        }
    }
})

export default expansionJointsQuantitySlice.reducer
export const {
    addExpansionJoin,
    removeExpansionJoint,
    setExpansionJointPosition,
    setExpansionJointLength,
    setExpansionJointLeft,
    setExpansionJointRight,
    setIdExpansionJoint,
    setMove
} = expansionJointsQuantitySlice.actions