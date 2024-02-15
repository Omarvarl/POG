import { configureStore } from '@reduxjs/toolkit';
import pageSizeSlice from './pageSizeSlice';
import drawParamSlice from './drawParamSlice';
import POLengthSlice from './POLengthSlice';
import realPageSizeSlice from './realPageSizeSlice';
import expansionJointsSlice from './expansionJointsSlice';
import platesSlice from './platesSlice';
import viewBreakSlice from './viewBreakSlice';
import popUpSlice from './popUpSlice';
import currentPlateSlice from './currentPlateSlice';
import platesJointsSlice from './platesJointsSlice';
import inputVisibilitySlice from './inputVisibilitySlice';
import overhangsSlice from './overhangsSlice';
import overhangsVisibilitySlice from './overhangsVisibilitySlice';
import stampSlice from './stampSlice';
import exJointPopVisibility from './exJointPopVisibility';
import upFitingSlice from './upFitingSlice';



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
        popUp: popUpSlice,
        currentPlate: currentPlateSlice,
        inputVisibility: inputVisibilitySlice,
        overnahgs: overhangsSlice,
        overhangVisibility: overhangsVisibilitySlice,
        stamp: stampSlice,
        exJointPopVisibility: exJointPopVisibility,
        upFitingState: upFitingSlice
    }
    
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store