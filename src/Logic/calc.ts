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

    // console.log(plates)

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
            length: expansionJoints[0].position - plates[0].left - plates[0].right,
            move: expansionJoints[0].move
        })
    
        for(let i = 0; i < expansionJoints.length; i++) {
            if (i === expansionJoints.length - 1) {
                parts.push({
                    startX: expansionJoints[i].position + expansionJoints[i].length + expansionJoints[i].right,
                    startY: startY,
                    length: POLength - expansionJoints[i].position - expansionJoints[i].length - expansionJoints[i].right - plates[plates.length - 1].right,
                    move: undefined
                })
                
            } else {
                parts.push({
                    startX: expansionJoints[i].position + expansionJoints[i].length + expansionJoints[i].right,
                    startY: startY,
                    length: expansionJoints[i + 1].position - expansionJoints[i].position - expansionJoints[i].length - expansionJoints[i + 1].left - expansionJoints[i].right,
                    move: expansionJoints[i + 1].move

                })
            }
        }
    } else {
        parts.push({
            startX: startX,
            startY: startY,
            length: POLength - plates[plates.length - 1].right - plates[0].left,
            move: undefined
        })
    }

    let name = 'RegularSection3000'

    for (let i = 0; i < parts.length; i++) {

        let len = parts[i].length
        let x = parts[i].startX
        var move = parts[i].move

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
                    } else if (len > 1600) {
                        result.push({
                            name: 'UniqStartSection',
                            initX: x,
                            initY: startY,
                            length: 1000,
                            key: `section_start`
                        })
                        x += 1000
                        len -= 1000
                    } else if (len > 1400) {
                        result.push({
                            name: 'UniqStartSection',
                            initX: x,
                            initY: startY,
                            length: 800,
                            key: `section_start`
                        })
                        x += 800
                        len -= 800
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
                }
                
                // else {
                //     result.push({
                //         name: 'UniqEndSection',
                //         initX: x + len,
                //         initY: startY,
                //         length: x + len - right,
                //         key: `section_last`
                //     })
                //     len -= (x + len - right)
                // }

            } else {
                if (len > 0) result.push({
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
                if (move && move >= 75) {
                    var nextPos = parts[i + 1].startX
                    var exJointLength = nextPos - x - len
                    var delta = 0

                    var lengthAfter = parts[i + 1].length % 1500
                    if (parts[i + 1].length === lengthAfter) lengthAfter /= 2
                    if (lengthAfter < 600 && parts[i + 1].length > 1700) lengthAfter += 600

                    if (exJointLength < 1000
                        && lengthAfter - (1000 - exJointLength) / 2 >= 600
                        && len - (1000 - exJointLength) / 2 >= 600) {
                        delta = (1000 - exJointLength) / 2
                        len -= delta
                        exJointLength = 1000
                    }

                    if (len > 1500) {
                        exJointLength += len - 1500
                        len = 1500
                    }
                    if (len < 600) {
                        exJointLength += len - 600
                        len = 600
                    }

                    result.push({
                        name: result.length ? 'ExJoint13' : 'ExJoint14',
                        initX: x,
                        initY: startY,
                        length: len + exJointLength + lengthAfter - delta,
                        lengthBefore: len,
                        lengthAfter: lengthAfter - delta,
                        key: result.length ? `ExJoint13_${x}a` : `ExJoint14_${x}a`
                    })

                    var newStart = x + len + exJointLength + lengthAfter - delta
                    parts[i + 1].length += (parts[i + 1].startX - newStart)
                    parts[i + 1].startX = newStart
                    len = 0

                    if (parts[i + 1].startX + startX === POLength) {
                        result[result.length - 1].name = 'ExJoint15'
                        result[result.length - 1].key = `ExJoint15_${x}a`
                    }

                } else if (move && move <= 32) {
                    if (parts[i + 1].startX - x > 2500 && len > 1500) {
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
                    result.push({
                        name: result.length ? 'ExJoint5' : 'ExJoint11',
                        initX: x,
                        initY: startY,
                        length: parts[i + 1].startX - x,
                        addedStatePos: len,
                        key: result.length ? `ExJoint5_${x}a` : `ExJoint11_${x}a`
                    })
                    
                    var part6Length = parts[i + 1].length % 1500
                    if (part6Length < 500) {
                        if (parts[i + 1].length > 1500
                            && parts[i + 1].length < 2000) {
                            part6Length = parts[i + 1].length - 1000
                        } else {
                            part6Length = 1500
                        }
                    }
                    if (parts[i + 1].length <= 1500
                        && i + 1 === parts.length - 1) {
                        result.push({
                            name: 'ExJoint12',
                            initX: parts[i + 1].startX + part6Length,
                            initY: startY,
                            length: part6Length,
                            key: `ExJoint12_${x}a`
                        })
                        parts[i + 1].length = 0
                    } else {
                        if (part6Length === parts[i + 1].length) part6Length /= 2
                        result.push({
                            name: 'ExJoint6',
                            initX: parts[i + 1].startX,
                            initY: startY,
                            length: part6Length,
                            key: `ExJoint6_${x}a`
                        })
                    }
                    var newStart = parts[i + 1].startX + part6Length
                    parts[i + 1].length -= part6Length
                    parts[i + 1].startX = newStart
                    len = 0

                } else if (move && move > 32 && move < 75) {
                    var exJointLength = parts[i + 1].startX - x - len
                    if (parts[i + 1].startX - x > 2500 && len > 1500) {
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
                    result.push({
                        name: result.length ? 'ExJoint19' : 'ExJoint23',
                        initX: x,
                        initY: startY,
                        length: parts[i + 1].startX - x,
                        addedStatePos: len,
                        end: exJointLength / 2,
                        key: result.length ? `ExJoint19_${x}a` : `ExJoint23_${x}a`
                    })

                    var part20Length = parts[i + 1].length % 1500
                    if (part20Length < 500) {
                        if (parts[i + 1].length > 1500
                            && parts[i + 1].length < 2000) {
                            part20Length = parts[i + 1].length - 1000
                        } else {
                            part20Length = 1500
                        }
                    }
                    if (parts[i + 1].length <= 1500
                        && i + 1 === parts.length - 1) {
                        result.push({
                            name: 'ExJoint24',
                            initX: parts[i + 1].startX + part20Length,
                            initY: startY,
                            length: part20Length,
                            end: exJointLength / 2,
                            key: `ExJoint24_${x}a`
                        })
                        parts[i + 1].length = 0
                    } else {
                        if (part20Length === parts[i + 1].length) part20Length /= 2
                        result.push({
                            name: 'ExJoint20',
                            initX: parts[i + 1].startX,
                            initY: startY,
                            length: part20Length,
                            end: exJointLength / 2,
                            key: `ExJoint20_${x}a`
                        })
                    }
                    var newStart = parts[i + 1].startX + part20Length
                    parts[i + 1].length -= part20Length
                    parts[i + 1].startX = newStart
                    len = 0

                } else if (len > 0) {
                    result.push({
                        name: 'UniqSection',
                        initX: x,
                        initY: startY,
                        length: parts[i + 1].startX - x,
                        addedStatePos: len,
                        key: `uniqSection_${x}_d`
                    })
                }
            } else {
                len = checkPlateJoints(x, len, 0)[1]
                if (len > 0) {
                    if (x + len + startX === POLength) {
                        result.push({
                            name: 'UniqEndSection',
                            initX: x + len,
                            initY: startY,
                            length: len,
                            key: `section_last`
                        })
                    } else {
                        result.push({
                            name: 'UniqSection',
                            initX: x,
                            initY: startY,
                            length: len,
                            addedStatePos: 0,
                            key: `uniqSection_${x}_e`
                        })
                    }
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
                // console.log(x, pj.left, pj.right)

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
    // console.log(result)
    return result

}

export default calc