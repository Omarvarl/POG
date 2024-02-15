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
    lengthBefore?: number,
    lengthAfter?: number,
    end?: number,
    key: string
}

export interface IExpansionJoints extends IGround {
    left: number,
    right: number,
    move?: number
}

export interface IPlates extends IExpansionJoints {
    reducedLength: number,
    reducedPosition: number,
    sections: ISection[],
    countOfReducedSections: number
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
    scale?: number,
    upFiting?: Function
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
    length: number,
    move: number | undefined
}

export interface IUniqSectionData extends IProfile {
    addedStatePos?: number
}

export interface IExJoint extends IUniqSectionData {
    lengthBefore?: number,
    lengthAfter?: number
}

export interface IDimArrow extends IInitCoord {
    type: {
        type: string,
        dir: string
    },
    length: number,
    indent: number,
    id: string,
    unchange?: boolean,
    text?: string
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

