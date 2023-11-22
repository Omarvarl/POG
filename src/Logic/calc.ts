import EndSection1500 from "../Project/drawComponents/Sections/EndSection1500"
import { IPOLength, IExpansionJoints, IPOParts, ISection } from "../Types/Types"
// import StartSection1500 from "../Project/drawComponents/Sections/StartSection1500"

const calc = (POLengthData:IPOLength, expansionJoints:IExpansionJoints[]):ISection[] => {
    const {POLength, scaledPOLength, screenWidth, scale} = POLengthData

    const startX = (screenWidth - scaledPOLength) / 2
    const startY = (500 + 1100) / scale

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
                    length: (expansionJoints[i + 1].position - expansionJoints[i].position - expansionJoints[i].length - expansionJoints[i + 1].left) / scale
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

    // console.log(parts)
    let name = 'RegularSection3000'

    for (let i = 0; i < parts.length; i++) {
        let len = parts[i].length
        let x = parts[i].startX

        if (i === 0) {
            result.push({
                name: 'StartSection1500',
                initX: x,
                initY: startY,
                length: 1500,
                key: `section_first`
            })
            x += 1500 / scale
            len -= 1500 / scale
        }

        if (i === parts.length - 1) {
            result.push({
                name: 'EndSection1500',
                initX: x + len,
                initY: startY,
                length: 1500,
                key: `section_last`
            })
            len -= 1500 / scale
        }
        name = 'RegularSection3000'
        if (i !== parts.length - 1) {
            if (parts[i + 1].startX - len - parts[i].startX > 4000 / scale) {
                while (len > 4000 / scale) {
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
        } else {
            if (len > 4000 / scale || len === 3000 / scale) {
                while (len > 4000 / scale) {
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
            if (parts[i + 1].startX - len - parts[i].startX > 2500 / scale) {
                while (len > 2500 / scale) {
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
        } else {
            if (len > 2000 / scale || len === 1500 / scale) {
                while (len > 2500 / scale) {
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
            if (parts[i + 1].startX - parts[i].startX - len > 2000 / scale) {
                while (len > 2000 / scale) {
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
        } else {
            if (len > 2000 / scale || len === 1000 / scale) {
                while (len > 2000 / scale) {
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
                result.push({
                    name: 'UniqSection',
                    initX: x,
                    initY: startY,
                    length: (parts[i + 1].startX - parts[i].startX - parts[i].length + len) * scale,
                    key: `section_${count}`
                })
            } else {
                result.push({
                    name: 'UniqSection',
                    initX: x,
                    initY: startY,
                    length: len * scale,
                    key: `section_${count}`
                })
            }
        }

    }

    result.sort((a, b) => a.initX - b.initX)

    return result

}

export default calc