export interface ICardProject {
    id: number,
    name: string,
    imgPath: string
}

export interface ICursorPosition {
    startX: number,
    startY: number,
    pointX: number,
    pointY: number,
    scale: number,
    flag: boolean
}

export interface IPagedDim {
    width: number,
    height: number,
    factor: number,
    format: string
}

export interface IGround {
    id: string,
    position: number,
    length: number
}

export interface ISection {
    name: string,
    initX: number,
    initY: number,
    length: number,
    addedStatePos?: number,
    key: string
}

export interface IExpansionJoints extends IGround {
    left: number,
    right: number
}

export interface IPlates extends IExpansionJoints {
    reducedLength: number,
    reducedPosition: number,
    sections: ISection[]
}

export interface IPOLength {
    POLength: number,
    screenWidth: number,
    scale: number,
    reducedLength: number,
    reducedScale: number
}

export interface IInitCoord {
    initX: number,
    initY: number,
    scale?: number
}

export interface IProfile extends IInitCoord {
    length: number
}

export interface IComponents {
    [key: string]: IProfile
}

export interface IPOParts {
    startX: number,
    startY: number,
    length: number
}

export interface IUniqSectionData extends IProfile {
    addedStatePos?: number
}

export interface IDimArrow extends IInitCoord {
    type: {
        type: string,
        dir: string
    },
    length: number,
    indent: number,
    id: string,
    unchange?: boolean
}

export interface IFillingTubesSet {
    initX: number,
    initY: number,
    sectionLength: number,
    scale: number
}

export interface IOverhang {
    length: number,
    type: string,
    filling: boolean
}

