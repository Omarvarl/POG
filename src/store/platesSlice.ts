import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlates, IExpansionJoints, IPOLength } from '../Types/Types';
import calc from '../Logic/calc';

const initialState:IPlates[] = [{
    id: 'plate_0',
    position: 0,  //  start position in assembley coordinate system
    length: 10000,  //  real length of plate
    reducedLength: 10000,  //  reduced length of plate for reduced dtawing view
    left: 250,  //  min distance for first stand
    right: 250,  //  min distance for last stand
    sections: []  //  sections on this plate
}]

export const platesSlice = createSlice({
    name: 'plates',
    initialState,
    reducers: {
        addPlate: (state, action:PayloadAction<IExpansionJoints>) => {
            state.push({
                ...action.payload,
                reducedLength: action.payload.length,
                sections: []
            })
            state.sort((a, b) => a.position - b.position)
            return state
        },
        setSections: (state, action:PayloadAction<{
            POLength: number,
            expansionJoints: IExpansionJoints[],
            plateJoints: {id: string, length: number}[]
        }>) => {
            const {POLength, expansionJoints, plateJoints} = action.payload
            const sections = calc(POLength, expansionJoints, plateJoints, state)
            state.forEach(plate => {
                plate.sections = []
                sections.forEach(section => {
                    if (section.initX >= plate.position
                      && section.initX <= plate.position + plate.length) {
                        plate.sections.push(section)
                      }
                  })
            })
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
        setReducedLength: (state, action:PayloadAction<{id: string, reducedLength: number}>) => {
            for (let i = 0; i < state.length; i++) {
                if (state.length > 1 || action.payload.reducedLength >= 5000)  {
                    if (state[i].id === action.payload.id) state[i].length = action.payload.reducedLength
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
        removeSames: (state) => {
            state.forEach(plate => {

                const sections = plate.sections
                let currentName = ''
                let len = 0

                for (let i = 0; i < sections.length; i++) {
                    const section = sections[i]

                    if (currentName === section.name
                        && i + 1 < sections.length
                    ) {
                        len = section.length - 1000
                        section.length = 1000
                        section.name = 'ReducedSection'
                        i++

                        while (i < sections.length
                            && sections[i].name === currentName
                        ) {
                            len += sections[i].length
                            sections.splice(i, 1)
                        }
                        i--

                    } else {
                        section.initX -= len
                        currentName = section.name
                    }
                }
                plate.reducedLength -= len
            })
            return state
        }
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
    connectPlates,
    setReducedLength,
    setSections,
    removeSames
} = platesSlice.actions