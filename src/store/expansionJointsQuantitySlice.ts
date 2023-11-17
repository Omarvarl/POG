import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = 0

export const expansionJointsQuantitySlice = createSlice({
    name: 'expansionJointsQuantity',
    initialState,
    reducers: {
        increaseExpansionJointsQuantity: (state) => {
            return (state + 1)
        }
    }
})

export default expansionJointsQuantitySlice.reducer
export const { increaseExpansionJointsQuantity } = expansionJointsQuantitySlice.actions