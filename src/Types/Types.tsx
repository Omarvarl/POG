export interface ICardProject {
    id: number,
    name: string,
    imgPath: string
}

export interface IDrawAreaStyles {
    height: string,
    width: string,
    cursor: string,
    transform: string
}

export interface ICursorPosition {
    startX: number,
    startY: number,
    pointX: number,
    pointY: number,
    scale: number,
    flag: boolean
}