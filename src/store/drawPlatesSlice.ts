import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { IDrawPlates, ISection } from '../Types/Types';

const initialState:IDrawPlates[] = [{
    id: 'plate_0',
    reducedLength: 10000,  //  reduced length of plate for reduced dtawing view
    sections: [] //  sections, wich belong this plate
    }
]

export const platesSlice = createSlice({
    name: 'plates',
    initialState,
    reducers: {
        setReducedLength: (state, action:PayloadAction<{id: string, reducedLength: number}>) => {
            for (let i = 0; i < state.length; i++) {
                if (state.length > 1 || action.payload.reducedLength >= 5000)  {
                    if (state[i].id === action.payload.id) state[i].reducedLength = action.payload.reducedLength
                }
            }
            return state
        },
        addSection: (state, action:PayloadAction<{id: string, section:ISection}>) => {
            const i = state.findIndex(elm => elm.id === action.payload.id)
                if (i !== -1) {
                    state[i].sections.push(action.payload.section)
                } else {
                    state.push({
                        id: action.payload.id,
                        reducedLength: action.payload.section.length,
                        sections: [action.payload.section]
                    })
                    state.sort((a, b) => {
                        
                        return a.sections.length && b.sections.length ? a.sections[0].initX - b.sections[0].initX : 1

                    })
                }
            return state
        },
        removeSection: (state, action:PayloadAction<string>) => {
            const i = state.findIndex(elm => elm.id === action.payload)
                if (i !== -1) {
                    if (i === 0) {
                        if (state.length > 1) {
                            state[i + 1].id = state[i].id
                        }
                    }
                    state.splice(i, 1)
                    console.log(current(state))
                }
            return state
        },
        clearSections: (state, action:PayloadAction<string>) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload) state[i].sections = []
            }
            return state
        },
    }
})

export default platesSlice.reducer
export const {
    setReducedLength,
    addSection,
    clearSections,
    removeSection
} = platesSlice.actions