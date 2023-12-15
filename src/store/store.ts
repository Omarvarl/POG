import { configureStore } from '@reduxjs/toolkit';
import pageSizeSlice from './pageSizeSlice';
import drawParamSlice from './drawParamSlice';
import POLengthSlice from './POLengthSlice';
import realPageSizeSlice from './realPageSizeSlice';
import expansionJointsSlice from './expansionJointsSlice';
import platesSlice from './platesSlice';
import viewBreakSlice from './viewBreakSlice';
import reducedPOLengthSlice from './reducedPOLengthSlice';
import popUpSlice from './popUpSlice';
import currentPlateSlice from './currentPlateSlice';
import platesJointsSlice from './platesJointsSlice';
import inputVisibilitySlice from './inputVisibilitySlice';



const store = configureStore({
    reducer: {
        pageSize: pageSizeSlice,
        drawParam: drawParamSlice,
        POLength: POLengthSlice,
        realPageSize: realPageSizeSlice,
        expansionJoints: expansionJointsSlice,
        plates: platesSlice,
        platesJoints: platesJointsSlice,
        viewBreak: viewBreakSlice,
        reducedPOLEngth: reducedPOLengthSlice,
        popUp: popUpSlice,
        currentPlate: currentPlateSlice,
        inputVisibility: inputVisibilitySlice
    }
    
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store