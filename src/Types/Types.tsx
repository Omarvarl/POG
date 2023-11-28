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
    height: number
}

export interface IExpansionJoints {
    id: number,
    position: number,
    length: number,
    left: number,
    right: number
}

export interface IPOLength {
    POLength: number,
    scaledPOLength: number,
    screenWidth: number,
    scale: number
}

export interface IInitCoord {
    initX: number,
    initY: number
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

export interface ISection {
    name: string,
    initX: number,
    initY: number,
    length: number,
    addedStatePos?: number,
    key: string
}

export interface IUniqSectionData extends IProfile {
    addedStatePos?: number
}

