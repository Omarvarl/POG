import { IExpansionJoints, IPOParts, ISection } from "../Types/Types"


const calc = (
    POLength:number,
    expansionJoints:IExpansionJoints[],
    plateJointsData:{id: string, length: number}[],
    plates: IExpansionJoints[]
    ):ISection[] => {

    const startX = plates[0].left
    const startY = 800
    const result: ISection[] = []

    console.log(plates)

    const plateJoints = plateJointsData.map(elm => {
        const result = {
            left: 0,
            right: 0
        }
        plates.forEach((plate, index) => {
            if (plate.id.split('_')[1] === elm.id.split('_')[1]) {
                result.left = plate.position + plate.length - plate.right
                if (index !== plates.length - 1) {
                    result.right = plates[index + 1].position + plates[index + 1].left
                }
            }
        })
        return result
    })

    // console.log(plateJoints)

    const parts:IPOParts[] = []
    if (expansionJoints && expansionJoints.length) {
        parts.push({
            startX: startX,
            startY: startY,
            length: expansionJoints[0].position - plates[0].left - plates[0].right
        })
    
        for(let i = 0; i < expansionJoints.length; i++) {
            if (i === expansionJoints.length - 1) {
                parts.push({
                    startX: expansionJoints[i].position + expansionJoints[i].length + expansionJoints[i].right,
                    startY: startY,
                    length: POLength - expansionJoints[i].position - expansionJoints[i].length - expansionJoints[i].right - plates[plates.length - 1].right
                })
                
            } else {
                parts.push({
                    startX: expansionJoints[i].position + expansionJoints[i].length + expansionJoints[i].right,
                    startY: startY,
                    length: expansionJoints[i + 1].position - expansionJoints[i].position - expansionJoints[i].length - expansionJoints[i + 1].left - expansionJoints[i].right
                })
            }
        }
    } else {
        parts.push({
            startX: startX,
            startY: startY,
            length: POLength - plates[plates.length - 1].right - plates[0].left
        })
    }

    let name = 'RegularSection3000'

    for (let i = 0; i < parts.length; i++) {
        // console.log(parts)
        let len = parts[i].length
        let x = parts[i].startX

        if (i === 0) {
            if (i !== parts.length - 1) {
                const oldX = x;
                [x, len] = checkPlateJoints(x, len, 4)

                if (oldX === x) {
                    if (len >= 2500) {
                        result.push({
                            name: 'StartSection1500',
                            initX: x,
                            initY: startY,
                            length: 1500,
                            key: `section_start`
                        })
                        x += 1500
                        len -= 1500
                    } else {
                        result.push({
                            name: 'UniqStartSection',
                            initX: x,
                            initY: startY,
                            length: parts[i + 1].startX - parts[i].startX - parts[i].length + len,
                            addedStatePos: len,
                            key: `section_start`
                        })
                        x += parts[i + 1].startX - parts[i].startX - parts[i].length + len
                        len -= parts[i + 1].startX - parts[i].startX - parts[i].length + len
                    }
                }

            } else {
                if (len > 2500 || len === 1500) {
                    let mark = 1
                    let left = 0
                    plateJoints.forEach(pj => {
                        if (x + 1500 > pj.left && x + 1500 < pj.right) {
                            mark = 0;
                            left = pj.left
                        }
                    })

                    if (mark) {
                        result.push({
                            name: 'StartSection1500',
                            initX: x,
                            initY: startY,
                            length: 1500,
                            key: `section_start`
                        })
                        x += 1500
                        len -= 1500
                    } else {
                        result.push({
                            name: 'UniqStartSection',
                            initX: x,
                            initY: startY,
                            length: left - x,
                            key: `section_start`
                        })
                        len -= (left - x)
                        x = left
                    }
                }
            }
        }

        if (i === parts.length - 1) {
            if (parts[i].length > 2500) {
                let mark = 1
                let right = 0
                plateJoints.forEach(pj => {
                    if (x + len - 1500 > pj.left && x + len - 1500 < pj.right) {
                        mark = 0;
                        right = pj.right
                    }
                })
                if (mark) {
                    result.push({
                        name: 'EndSection1500',
                        initX: x + len,
                        initY: startY,
                        length: 1500,
                        key: `section_last`
                    })
                    len -= 1500
                } else {
                    result.push({
                        name: 'UniqEndSection',
                        initX: x + len,
                        initY: startY,
                        length: x + len - right,
                        key: `section_last`
                    })
                    len -= (x + len - right)
                }

            } else {
                result.push({
                    name: 'UniqEndSection',
                    initX: x + len,
                    initY: startY,
                    length: len,
                    key: `section_last`
                })
                x += len
                len -= len
            }
        }

        name = 'RegularSection3000'
        if (i !== parts.length - 1) {
            if (parts[i + 1].startX + len - parts[i].startX - parts[i].length > 4000) {
                while (len > 4000) {
                    [x, len] = checkPlateJoints(x, len, 3)
                    if (len > 4000) {
                        result.push({
                            name: name,
                            initX: x,
                            initY: startY,
                            length: 3000,
                            key: `section3000_${x}`
                        })
                        x += 3000
                        len -= 3000
                    }
                }
            }
        } else {
            if (len > 4000) {
                while (len > 4000) {
                    [x, len] = checkPlateJoints(x, len, 3)
                    if (len >= 4000) {
                        result.push({
                            name: name,
                            initX: x,
                            initY: startY,
                            length: 3000,
                            key: `section3000_${x}`
                        })
                        x += 3000
                        len -= 3000
                    }
                }
            }
            if (len === 3000 && (i !== 0 || parts.length - 1 === 0 )) {
                [x, len] = checkPlateJoints(x, len, 3)
                if (len === 3000) {
                    result.push({
                        name: name,
                        initX: x,
                        initY: startY,
                        length: 3000,
                        key: `section3000_${x}`
                    })
                    x += 3000
                    len -= 3000
                }
            }
        }

        name = 'RegularSection1500'
        if (i !== parts.length - 1) {
            if (parts[i + 1].startX + len - parts[i].startX - parts[i].length > 2000) {
                while (len > 2500) {
                    [x, len] = checkPlateJoints(x, len, 1.5)
                    if (len > 2500) {
                        result.push({
                            name: name,
                            initX: x,
                            initY: startY,
                            length: 1500,
                            key: `section1500_${x}e`
                        })
                        x += 1500 
                        len -= 1500
                    }
                }
            }
        } else {
            if (len > 2500) {
                while (len > 2500) {
                    [x, len] = checkPlateJoints(x, len, 1.5)
                    if (len > 2500) {
                        result.push({
                            name: name,
                            initX: x,
                            initY: startY,
                            length: 1500,
                            key: `section1500_${x}d`
                        })
                        x += 1500
                        len -= 1500
                    }
                }
            }
            if (len === 1500 && (i !== 0 || parts.length - 1 === 0 )) {
                [x, len] = checkPlateJoints(x, len, 1.5)
                if (len === 1500) {
                    result.push({
                        name: name,
                        initX: x,
                        initY: startY,
                        length: 1500,
                        key: `section1500_${x}c`
                    })
                    x += 1500
                    len -= 1500
                }
            }
        }

        name = 'RegularSection1000'
        if (i !== parts.length - 1) {
            // console.log(x)
            if (parts[i + 1].startX + len - parts[i].startX - parts[i].length > 2000) {
                while (len > 2000) {
                    [x, len] = checkPlateJoints(x, len, 1, parts[i + 1].startX - parts[i].startX - parts[i].length + len)
                    if (len > 2000) {
                        result.push({
                            name: name,
                            initX: x,
                            initY: startY,
                            length: 1000,
                            key: `section1000_${x}`
                        })
                        x += 1000
                        len -= 1000
                    }
                }
            }
        } else {
            if (len > 2000) {
                while (len > 2000) {
                    [x, len] = checkPlateJoints(x, len, 1)
                    if (len > 1500) {
                        result.push({
                            name: name,
                            initX: x,
                            initY: startY,
                            length: 1000,
                            key: `section1000_${x}`
                        })
                        x += 1000
                        len -= 1000
                    }
                }
            }

            if (len === 1000 && (i !== 0 || parts.length - 1 === 0 )) {

                [x, len] = checkPlateJoints(x, len, 1)
                if (len === 1000) {

                    result.push({
                        name: name,
                        initX: x,
                        initY: startY,
                        length: 1000,
                        key: `section1000_${x}`
                    })
                    x += 1000
                    len -= 1000
                }
            }
        }
        
        if (len > 0) {
            if (i !== parts.length - 1) {
                len = checkPlateJoints(x, len, 0, parts[i + 1].startX - parts[i].startX - parts[i].length + len)[1]
                if (len > 0) {
                    result.push({
                        name: 'UniqSection',
                        initX: x,
                        initY: startY,
                        length: parts[i + 1].startX - parts[i].startX - parts[i].length + len,
                        addedStatePos: len,
                        key: `uniqSection_${x}_d`
                    })
                }
            } else {
                len = checkPlateJoints(x, len, 0)[1]
                if (len > 0) {
                    result.push({
                        name: 'UniqSection',
                        initX: x,
                        initY: startY,
                        length: len,
                        addedStatePos: 0,
                        key: `uniqSection_${x}_c`
                    })
                }
            }
        }
    }

    result.sort((a, b) => a.initX - b.initX)

    function checkPlateJoints(x: number, len: number, type:number, length?:number) {
        for (let i = 0; i < plateJoints.length; i++) {
            const pj = plateJoints[i]
            const prev = i ? plateJoints[i - 1] : {left: -1, right: -1}
            if (type === 3) {
                if ((x + 1500 > pj.left && x + 1500 < pj.right)
                || (x + 3000 > pj.left && x + 3000 < pj.right)) {
                    if (x + 1500 <= pj.left || x + 1500 >= pj.right) {
                        result.push({
                            name: 'RegularSection1500',
                            initX: x,
                            initY: startY,
                            length: 1500,
                            key: `section1500_${x}_b`
                        })
                        x += 1500
                        len -= 1500
                    } else {
                        setData(pj, prev)
                    }
                    if (len >= 4000) [x, len] = checkPlateJoints(x, len, 3)
                }
            } if (type === 4) {
                if (x + 1500 > pj.left && x + 1500 < pj.right) {
                    result.push({
                        name: 'UniqStartSection',
                        initX: x,
                        initY: startY,
                        length: pj.left - x,
                        key: `section_start`
                    })
                    x += pj.left - x
                    len -= (pj.left - x)
                }
            } else if (type === 1.5) {
                if (x + 1500 > pj.left && x + 1500 < pj.right) {
                    setData(pj, prev)
                    if (len >= 2500) [x, len] = checkPlateJoints(x, len, 1.5)
                }
            } else if (type === 1) {
                if (x + 1000 > pj.left && x + 1000 < pj.right) {
                    if (x + 1500 > pj.left && x + 1500 < pj.right) {
                    result.push({
                        name: 'UniqSection',
                        initX: x,
                        initY: startY,
                        length: pj.right - x,
                        key: `unicSection_${x}`
                    })
                    len -= (pj.right - x)
                    x = pj.right
                    } else {
                        if (len > 2000) {
                            console.log(x)
                            result.push({
                                name: 'RegularSection1500',
                                initX: x,
                                initY: startY,
                                length: 1500,
                                key: `section1500_${x}_a`
                            })
                            x += 1500
                            len -= 1500
                        } else if(length && length < 2500) {
                            console.log(len)
                            result.push({
                                name: 'UniqSection',
                                initX: x,
                                initY: startY,
                                length: length,
                                addedStatePos: x + 1000,
                                key: `uniqSection_${x}_b`
                            })
                            len = 0
                            x += len
                        }
                    }
                }
            } else if (type === 0) {
                const rLength = length ? length : len
                if ((x + len > pj.left && x + len < pj.right)
                || (x + 1500 > pj.left && x + 1500 < pj.right)
                || (x + 1000 > pj.left && x + 1000 < pj.right)) {
                    let addPos = pj.left - x
                    // console.log(rLength - (pj.right - x), rLength - addPos)

                    if (rLength - addPos >= 1500 || rLength - addPos > 1000) {
                        addPos = pj.right - x
                    }
                    if (rLength - addPos > 1000) {
                        addPos += (rLength - addPos - 1000)
                    }
                    result.push({
                        name: 'UniqSection',
                        initX: x,
                        initY: startY,
                        length: rLength,
                        addedStatePos: addPos,
                        key: `uniqSection_${x}_a`
                    })
                    len = 0
                }
            }
        }

        function setData(pj: {left: number, right: number}, prev: {left: number, right: number}) {

            if ((x + 1000 > pj.left && x + 1000 < pj.right)
            || (x + 1000 > prev.left && x + 1000 < prev.right)
            // || (pj.left - x >= 1000 && pj.left - x < 1500)) 
            ){

            // uniq
            result.push({
                name: 'UniqSection',
                initX: x,
                initY: startY,
                length: pj.left - x,
                key: `uniqSection_${x}_c`
            })
            len -= (pj.left - x)
            x = pj.left
            } else {
                //  push 1000
                result.push({
                    name: 'RegularSection1000',
                    initX: x,
                    initY: startY,
                    length: 1000,
                    key: `section1000_${x}`
                })
                x += 1000
                len -= 1000
            }
        }
        
        return [x, len]
    }

    return result

}

export default calc