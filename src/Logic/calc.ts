import { IPOLength, IExpansionJoints, IPOParts, ISection } from "../Types/Types"


const calc = (
    POLengthData:IPOLength,
    expansionJoints:IExpansionJoints[],
    plateJointsData:IExpansionJoints[]
    ):ISection[] => {
    const {POLength, scaledPOLength, screenWidth, scale} = POLengthData

    const startX = (screenWidth - scaledPOLength) / 2 + 300 / scale
    const startY = 1100 * 2 / scale

    let plateJoints:{ left:number, right:number }[] = plateJointsData.map(pj => {
        return {
            left: (pj.position - pj.left) / scale + startX,
            right: (pj.position + pj.length + pj.right) / scale + startX
        }
    })

    const parts:IPOParts[] = []
    if (expansionJoints && expansionJoints.length) {
        parts.push({
            startX: startX,
            startY: startY,
            length: (expansionJoints[0].position - expansionJoints[0].left) / scale
        })
    
        for(let i = 0; i < expansionJoints.length; i++) {
            if (i === expansionJoints.length - 1) {
                parts.push({
                   startX: (expansionJoints[i].position + expansionJoints[i].length + expansionJoints[i].right) / scale + startX,
                    startY: startY,
                    length: (POLength - expansionJoints[i].position - expansionJoints[i].length - expansionJoints[i].right) / scale
                })
                
            } else {
                parts.push({
                    startX: (expansionJoints[i].position + expansionJoints[i].length + expansionJoints[i].right) / scale + startX,
                    startY: startY,
                    length: (expansionJoints[i + 1].position - expansionJoints[i].position - expansionJoints[i].length - expansionJoints[i + 1].left - expansionJoints[i].right) / scale
                })
            }
        }
    } else {
        parts.push({
            startX: startX,
            startY: startY,
            length: scaledPOLength
        })
    }

    let count = 1

    const result: ISection[] = []

    // console.log((parts[2].startX - startX) * scale)
    let name = 'RegularSection3000'

    for (let i = 0; i < parts.length; i++) {
        let len = parts[i].length
        let x = parts[i].startX
        // console.log(startX * scale)

        if (i === 0) {
            if (i !== parts.length - 1) {
                if (parts[i + 1].startX - parts[i].length - parts[i].startX + len > 2500 / scale) {
                    result.push({
                        name: 'StartSection1500',
                        initX: x,
                        initY: startY,
                        length: 1500,
                        key: `section_start`
                    })
                    x += 1500 / scale
                    len -= 1500 / scale
                } else {
                    result.push({
                        name: 'UniqStartSection',
                        initX: x,
                        initY: startY,
                        length: (parts[i + 1].startX - parts[i].startX - parts[i].length + len) * scale,
                        addedStatePos: len * scale,
                        key: `section_start`
                    })
                    x += parts[i + 1].startX - parts[i].startX - parts[i].length + len
                    len -= parts[i + 1].startX - parts[i].startX - parts[i].length + len
                }
            } else {
                if (len > 2500 / scale || len === 1500 / scale) {
                    let mark = 1
                    plateJoints.forEach(pj => {
                        if (x + 1500 / scale > pj.left && x + 1500 / scale < pj.right) {
                            mark = 0;
                        }  
                    })
                    if (mark) result.push({
                        name: 'StartSection1500',
                        initX: x,
                        initY: startY,
                        length: 1500,
                        key: `section_start`
                    })
                    x += 1500 / scale
                    len -= 1500 / scale
                }
            }
        }

        if (i === parts.length - 1) {
            if (parts[i].length > 2500 / scale) {
                
                result.push({
                    name: 'EndSection1500',
                    initX: x + len,
                    initY: startY,
                    length: 1500,
                    key: `section_last`
                })
                len -= 1500 / scale
            } else {
                result.push({
                    name: 'UniqEndSection',
                    initX: x + len,
                    initY: startY,
                    length: len * scale,
                    key: `section_last`
                })
                x += len
                len -= len
            }
        }

        name = 'RegularSection3000'
        if (i !== parts.length - 1) {
            if (parts[i + 1].startX - parts[i].length - parts[i].startX + len > 4000 / scale) {

                while (len > 4000 / scale) {
                    [x, len] = checkPlateJoints(x, len, 3)
                    if (len > 4000 / scale) {
                        result.push({
                            name: name,
                            initX: x,
                            initY: startY,
                            length: 3000,
                            key: `section_${count}`
                        })
                        x += 3000 / scale
                        len -= 3000 / scale
                        count++
                    }
                }
            }
        } else {
            if (len >= 4000 / scale) {
                // console.log(len * scale)
                while (len >= 4000 / scale) {
                    [x, len] = checkPlateJoints(x, len, 3)
                    if (len >= 4000 / scale) {
                        result.push({
                            name: name,
                            initX: x,
                            initY: startY,
                            length: 3000,
                            key: `section_${count}`
                        })
                        x += 3000 / scale
                        len -= 3000 / scale
                        count++
                    }
                }
            }
            if (len === 3000 / scale && i !== 0) {
                [x, len] = checkPlateJoints(x, len, 3)
                if (len === 3000 / scale) {
                    result.push({
                        name: name,
                        initX: x,
                        initY: startY,
                        length: 3000,
                        key: `section_${count}`
                    })
                    x += 3000 / scale
                    len -= 3000 / scale
                    count++
                }
            }
        }

        name = 'RegularSection1500'
        if (i !== parts.length - 1) {
            if (parts[i + 1].startX + len - parts[i].startX - parts[i].length > 2500 / scale) {
                while (len > 2500 / scale) {
                    [x, len] = checkPlateJoints(x, len, 1.5)
                    if (len > 2500 / scale) {
                        result.push({
                            name: name,
                            initX: x,
                            initY: startY,
                            length: 1500,
                            key: `section_${count}`
                        })
                        x += 1500 / scale
                        len -= 1500 / scale
                        count++
                    }
                }
            }
        } else {
            if (len >= 2500 / scale) {
                while (len >= 2500 / scale) {
                    [x, len] = checkPlateJoints(x, len, 1.5)
                    if (len >= 2500 / scale) {
                        result.push({
                            name: name,
                            initX: x,
                            initY: startY,
                            length: 1500,
                            key: `section_${count}`
                        })
                        x += 1500 / scale
                        len -= 1500 / scale
                        count++
                    }
                }
            }
            if (len === 1500 / scale && i !== 0) {
                [x, len] = checkPlateJoints(x, len, 1.5)
                if (len === 1500 / scale) {
                    result.push({
                        name: name,
                        initX: x,
                        initY: startY,
                        length: 1500,
                        key: `section_${count}`
                    })
                    x += 1500 / scale
                    len -= 1500 / scale
                    count++
                }
            }
        }

        name = 'RegularSection1000'
        if (i !== parts.length - 1) {
            if (parts[i + 1].startX - parts[i].startX + len - parts[i].length > 2000 / scale) {
                while (len > 2000 / scale) {
                    [x, len] = checkPlateJoints(x, len, 1)
                    if (len > 2000 / scale) {
                        result.push({
                            name: name,
                            initX: x,
                            initY: startY,
                            length: 1000,
                            key: `section_${count}`
                        })
                        x += 1000 / scale
                        len -= 1000 / scale
                        count++
                    }
                }
            }
        } else {
            if (len >= 2000 / scale) {
                while (len >= 2000 / scale) {
                    [x, len] = checkPlateJoints(x, len, 1)
                    if (len >= 2000 / scale) {
                        result.push({
                            name: name,
                            initX: x,
                            initY: startY,
                            length: 1000,
                            key: `section_${count}`
                        })
                        x += 1000 / scale
                        len -= 1000 / scale
                        count++
                    }
                }
            }
            if (len === 1000 / scale && i !== 0) {
                [x, len] = checkPlateJoints(x, len, 1)
                if (len === 1000 / scale) {
                    result.push({
                        name: name,
                        initX: x,
                        initY: startY,
                        length: 1000,
                        key: `section_${count}`
                    })
                    x += 1000 / scale
                    len -= 1000 / scale
                    count++
                }
            }
        }
        
        if (len > 0) {
            if (i !== parts.length - 1) {
                len = checkPlateJoints(x, len, 0, (parts[i + 1].startX - parts[i].startX - parts[i].length + len) * scale)[1]
                if (len > 0) {
                    result.push({
                        name: 'UniqSection',
                        initX: x,
                        initY: startY,
                        length: (parts[i + 1].startX - parts[i].startX - parts[i].length + len) * scale,
                        addedStatePos: len * scale,
                        key: `section_${count}`
                    })
                }
            } else {
                len = checkPlateJoints(x, len, 0)[1]
                if (len > 0) {
                    result.push({
                        name: 'UniqSection',
                        initX: x,
                        initY: startY,
                        length: len * scale,
                        addedStatePos: 0,
                        key: `section_${count}`
                    })
                }
            }
            count++
        }

    }

    result.sort((a, b) => a.initX - b.initX)

    function checkPlateJoints(x: number, len: number, type:number, length?:number) {
        let count = 0
        for (let i = 0; i < plateJoints.length; i++) {
            const pj = plateJoints[i]
            const prev = i ? plateJoints[i - 1] : {left: -1, right: -1}
            if (type === 3) {
                if ((x + 1500 / scale > pj.left && x + 1500 / scale < pj.right)
                || (x + 3000 / scale > pj.left && x + 3000 / scale < pj.right)) {
                   setData(pj, prev)
                }
            } else if (type === 1.5) {
                if (x + 1500 / scale > pj.left && x + 1500 / scale < pj.right) {
                    setData(pj, prev)
                }
            } else if (type === 1) {
                if (x + 1000 / scale > pj.left && x + 1000 / scale < pj.right) {
                    if (x + 1500 / scale > pj.left && x + 1500 / scale < pj.right) {
                    // uniq
                    result.push({
                        name: 'UniqSection',
                        initX: x,
                        initY: startY,
                        length: (pj.right - x) * scale,
                        key: `section_${count}`
                    })
                    len -= (pj.right - x)
                    x = pj.right
                    count++
                    } else {
                        //  push 1000
                        if (len > 2500 / scale) {
                            result.push({
                                name: 'RegularSection1500',
                                initX: x,
                                initY: startY,
                                length: 1500,
                                key: `section_${count}`
                            })
                            x += 1500 / scale
                            len -= 1500 / scale
                            count++
                        } else {
                            result.push({
                                name: 'UniqSection',
                                initX: x,
                                initY: startY,
                                length: len * scale,
                                addedStatePos: x,
                                key: `section_${count}`
                            })
                            len = 0
                            x += len
                            count++
                        }
                    }
                }
            } else if (type === 0) {
                const rLength = length ? length : 0
                if ((x + len > pj.left && x + len < pj.right)
                || (x + 1500 / scale > pj.left && x + 1500 / scale < pj.right)
                || (x + 1000 / scale > pj.left && x + 1000 / scale < pj.right)) {
                    // console.log(x, pj.left)
                    result.push({
                        name: 'UniqSection',
                        initX: x,
                        initY: startY,
                        length: rLength,
                        addedStatePos: (pj.left - x) * scale,
                        key: `section_${count}`
                    })
                    len = 0
                }
            }
        }

        function setData(pj: {left: number, right: number}, prev: {left: number, right: number}) {
            if ((x + 1000 / scale > pj.left && x + 1000 / scale < pj.right)
            || (x + 1000 / scale > prev.left && x + 1000 / scale < prev.right)) {
            // uniq
            result.push({
                name: 'UniqSection',
                initX: x,
                initY: startY,
                length: (pj.left - x) * scale,
                key: `section_${count}`
            })
            len -= (pj.left - x)
            x = pj.left
            count++
            } else {
                //  push 1000
                result.push({
                    name: 'RegularSection1000',
                    initX: x,
                    initY: startY,
                    length: 1000,
                    key: `section_${count}`
                })
                x += 1000 / scale
                len -= 1000 / scale
                count++
            }
        }
        
        return [x, len]
    }

    // console.log(result)

    return result

}

export default calc