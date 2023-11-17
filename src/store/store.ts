import { configureStore } from '@reduxjs/toolkit';
import pageSizeSlice from './pageSizeSlice';
import drawParamSlice from './drawParamSlice';
import POLengthSlice from './POLengthSlice';
import realPageSizeSlice from './realPageSizeSlice';
import expansionJointsSlice from './expansionJointsSlice';

const store = configureStore({
    reducer: {
        pageSize: pageSizeSlice,
        drawParam: drawParamSlice,
        POLength: POLengthSlice,
        realPageSize: realPageSizeSlice,
        expansionJoints: expansionJointsSlice
    }
    
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store