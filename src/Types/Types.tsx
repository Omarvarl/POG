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
    length: number
}

export interface IPOLength {
    POLength: number,
    scaledPOLength: number,
    screenWidth: number,
    scale: number
}