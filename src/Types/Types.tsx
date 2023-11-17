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