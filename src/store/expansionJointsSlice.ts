import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExpansionJoints } from '../Types/Types';


const initialState:IExpansionJoints[] = []

export const expansionJointsQuantitySlice = createSlice({
    name: 'expansionJointsQuantity',
    initialState,
    reducers: {
        addExpansionJoin: (state, action:PayloadAction<IExpansionJoints>) => {
            state.push(action.payload)
            return state
        },
        removeExpansionJoint: (state, action:PayloadAction<string>) => {
            let index = -1
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload) index = i
            }
            if (index >= 0) {
                state.splice(index, 1)
            }
            return state
        },
        setPosition: (state, action:PayloadAction<IExpansionJoints>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) state[i].position = action.payload.position
            }
            return state
        },
        setLength: (state, action:PayloadAction<IExpansionJoints>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) state[i].length = action.payload.length
            }
            return state
        },
        setLeft: (state, action:PayloadAction<IExpansionJoints>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) state[i].left = action.payload.left
            }
            return state
        },
        setRight: (state, action:PayloadAction<IExpansionJoints>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) state[i].right = action.payload.right
            }
            return state
        }
    }
})

export default expansionJointsQuantitySlice.reducer
export const {
    addExpansionJoin,
    removeExpansionJoint,
    setPosition,
    setLength,
    setLeft,
    setRight
} = expansionJointsQuantitySlice.actions