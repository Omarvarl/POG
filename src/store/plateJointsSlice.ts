import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExpansionJoints } from '../Types/Types';


const initialState:IExpansionJoints[] = []

export const plateJointsSlice = createSlice({
    name: 'plateJoints',
    initialState,
    reducers: {
        addPlateJoint: (state) => {
                state.push({
                    id: state.length + 1000,
                    position: 0,
                    length: 0,
                    left: 250,
                    right: 250
                })
        },
        removePlateJoint: (state, action:PayloadAction<number>) => {
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

export default plateJointsSlice.reducer
export const {
    addPlateJoint,
    removePlateJoint,
    setPosition,
    setLength,
    setLeft,
    setRight
} = plateJointsSlice.actions