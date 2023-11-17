import { configureStore } from '@reduxjs/toolkit';
import pageSizeSlice from './pageSizeSlice';
import drawParamSlice from './drawParamSlice';
import POLengthSlice from './POLengthSlice';


// let startW = 4200
// let startH = 2970
// while (window.innerWidth * 0.85 < startW || window.innerHeight < startH) {
//     startW /= 1.1;
//     startH /= 1.1;
// }

// const defaultPageSize:IPagedDim = {
//     width: startW,
//     height: startH
// }



// const pageSizeReducer = (pageSize = defaultPageSize, action:{type:string, payload:IPagedDim}) => {
//     switch (action.type) {
//         case 'SET_PAGE_SIZE':
//             return {...pageSize, width:action.payload.width, height:action.payload.height}

//         default: return pageSize
//     }
// }

// const drawParamReducer = (param = `translate(0, 0) scale(1)`, action:{type:string, payload:string}) => {
//     switch (action.type) {
//         case 'SET_PARAM':
//             return action.payload

//         default: return param
//     }
// }

// const POLengthReducer = (len = 0, action:{type:string, payload:number}) => {
//     switch (action.type) {
//         case 'SET_LEN':
//             return action.payload

//         default: return len
//     }
// }

// const rootReducer = combineReducers({
//     pageSizeReducer,
//     drawParamReducer,
//     POLengthReducer
// })


const store = configureStore({
    reducer: {
        pageSize: pageSizeSlice,
        drawParam: drawParamSlice,
        POLength: POLengthSlice
    }
    
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store