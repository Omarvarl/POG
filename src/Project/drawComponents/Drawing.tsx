import Border from "./Border";
import BaseTable from "./BaseTable";
import {IExpansionJoints } from "../../Types/Types";
import Ground from "./Ground";
import { useAppDispatch, useAppSelector } from "../../hooks";
import './Drawing.css'
import StartSection1500 from "./Sections/StartSection1500";
import EndSection1500 from "./Sections/EndSection1500";
import RegularSection3000 from "./Sections/RegularSection3000";
import RegularSection1500 from "./Sections/RegularSection1500";
import RegularSection1000 from "./Sections/RegularSection1000";
import UniqSection from "./Sections/UniqSection";
import UniqStartSection from "./Sections/UniqStartSection";
import UniqEndSection from "./Sections/UniqEndSection";
import { useEffect } from "react";
import ReducedSection from "./Sections/ReducedSection";
import { setSections, removeSames } from "../../store/platesSlice";
import { setReducedLength } from "../../store/POLengthSlice";
import calc from "../../Logic/calc";
import ExJointSection13 from "./Sections/ExJointSection13";
import ExJointSection5 from "./Sections/ExJointSection5";
import ExJointSection6 from "./Sections/ExJointSection6";
import ExJointSection19 from "./Sections/ExJointSection19";
import ExJointSection20 from "./Sections/ExJointSection20";
import ExJointSection11 from "./Sections/ExJointSection11";
import ExJointSection12 from "./Sections/ExJointSection12";
import ExJointSection23 from "./Sections/ExJointSection23";
import ExJointSection24 from "./Sections/ExJointSection24";
import ExJointSection14 from "./Sections/ExJointSection14";
import ExJointSection15 from "./Sections/ExJointSection15";
import UpFiting from "./Profiles/UpFiting";



export default function Drawing() {
    const dispatch = useAppDispatch()
    const {width, height, factor} = useAppSelector(state => state.realPageSize);
    const initX = 700
    const upFitingState = useAppSelector(state => state.upFitingState)

    var upFiting = upFitingState  //  Верхний фитинг вынесен в отдельную функцию для управления его стейтом
      ? ((initX: number, initY: number, scale: number) => <UpFiting initX={initX} initY={initY} scale={scale} />)
      : (() => <></>)
    const POLengthData = useAppSelector(state => state.POLength)
    const currentPlate = useAppSelector(state => state.currentPlate)
    const POLength = POLengthData.POLength
    const expansionJoints = useAppSelector((state) => state.expansionJoints);
    const plateJoints = useAppSelector(state => state.platesJoints)
    const plates = useAppSelector(state => state.plates)
    const expansionsArr:IExpansionJoints[] = structuredClone(expansionJoints);
    const viewBreak = useAppSelector(state => state.viewBreak)
    const realPageSize = useAppSelector(state => state.realPageSize)
    const pageSize = useAppSelector(state => state.pageSize)
    var {start, end} = useAppSelector(state => state.overnahgs)
    var stamp = useAppSelector(state => state.stamp)
    var doubleSectionsState = useAppSelector(state => state.doubleSectionsState)

    const pageParams = useAppSelector(state => state.realPageSize)

    useEffect(() => {  //  Юзэффект позволяет контролировать рендеринг
        dispatch(setSections({POLength, expansionJoints, plateJoints, doubleSectionsState}))
    }, [  //   Страница перерендеривается только если изменяется что-то из квадратных скобок
      expansionJoints,
      plateJoints,
      dispatch,
      viewBreak,
      currentPlate,
      realPageSize,
      pageSize,
      doubleSectionsState
    ])

    expansionsArr.sort((a, b) => a.position - b.position)

    useEffect(() => {  //  Юзэффект позволяет контролировать рендеринг
       viewBreak && dispatch(removeSames())
    }, [  //   Страница перерендеривается только если изменяется что-то из квадратных скобок
        viewBreak,
        dispatch,
        expansionJoints,
        plateJoints,
        currentPlate,
        realPageSize,
        doubleSectionsState
      ])

    useEffect(() => {  //  Юзэффект позволяет контролировать рендеринг
      if (viewBreak) {
        const reducedLength = plates[0].reducedPosition
          + plates.reduce(
            (acc, plate) => acc += plate.sections
              .reduce(
              (acc2, section) => acc2 += section.length
            , 0)
          , 500)
        dispatch(setReducedLength(reducedLength))
      }
    }, [  //   Страница перерендеривается только если изменяется что-то из квадратных скобок
        plates,
        dispatch,
        viewBreak,
        currentPlate
      ])

    const scale = (viewBreak) ? POLengthData.reducedScale : POLengthData.scale

    const initY = realPageSize.height / 2 * (realPageSize.factor > 1 ? 2 : 1)

    const drawSections = plates.map(plate => {  //  Создаем новый массив компонентов секций, опираясь на их имена. Новый массив нужен для рендера
      if (plate.sections && plate.sections.length > 0) {
        return plate.sections.map(section => {
          if (section.name === 'StartSection1500') {
            return <StartSection1500
              initX={initX + section.initX / scale}
              initY={initY} scale={scale}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'EndSection1500') {
            return <EndSection1500
              initX={initX + section.initX / scale}
              initY={initY}
              scale={scale}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'RegularSection3000') {
            return <RegularSection3000
              initX={initX + section.initX / scale}
              initY={initY} scale={scale}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'RegularSection1500') {
            return <RegularSection1500
              initX={initX + section.initX / scale}
              initY={initY}
              scale={scale}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'RegularSection1000') {
            return <RegularSection1000
              initX={initX + section.initX / scale}
              initY={initY}
              scale={scale}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'UniqSection') {
            return <UniqSection
              initX={initX + section.initX / scale}
              initY={initY} scale={scale}
              length={section.length}
              addedStatePos={section.addedStatePos}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'ExJoint5') {
            return <ExJointSection5
              initX={initX + section.initX / scale}
              initY={initY} scale={scale}
              length={section.length}
              addedStatePos={section.addedStatePos}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'ExJoint11') {
            return <ExJointSection11
              initX={initX + section.initX / scale}
              initY={initY} scale={scale}
              length={section.length}
              addedStatePos={section.addedStatePos}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'ExJoint6') {
            return <ExJointSection6
              initX={initX + section.initX / scale}
              initY={initY} scale={scale}
              length={section.length / scale}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'ExJoint12') {
            return <ExJointSection12
              initX={initX + section.initX / scale}
              initY={initY} scale={scale}
              length={section.length / scale}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'ExJoint20') {
            return <ExJointSection20
              initX={initX + section.initX / scale}
              initY={initY} scale={scale}
              length={section.length / scale}
              end={section.end ? section.end / scale : 0}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'ExJoint24') {
            return <ExJointSection24
              initX={initX + section.initX / scale}
              initY={initY} scale={scale}
              length={section.length / scale}
              end={section.end ? section.end / scale : 0}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'ExJoint19') {
            return <ExJointSection19
              initX={initX + section.initX / scale}
              initY={initY} scale={scale}
              length={section.length}
              addedStatePos={section.addedStatePos}
              end={section.end ? section.end / scale : 0}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'ExJoint23') {
            return <ExJointSection23
              initX={initX + section.initX / scale}
              initY={initY} scale={scale}
              length={section.length}
              addedStatePos={section.addedStatePos}
              end={section.end ? section.end / scale : 0}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'UniqStartSection') {
            return <UniqStartSection
              initX={initX + section.initX / scale}
              initY={initY} scale={scale} length={section.length}
              addedStatePos={section.addedStatePos}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'UniqEndSection') {
            return <UniqEndSection
              initX={initX + section.initX / scale}
              initY={initY} scale={scale}
              length={section.length}
              addedStatePos={section.addedStatePos}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'ReducedSection') {
            return <ReducedSection
              initX={initX + section.initX / scale}
              initY={initY} scale={scale}
              countOfReducedSections={plate.countOfReducedSections}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'ExJoint13') {
            return <ExJointSection13
              initX={initX + section.initX / scale}
              initY={initY}
              scale={scale}
              length={section.length / scale}
              lengthBefore={section.lengthBefore ? section.lengthBefore / scale : 0}
              lengthAfter={section.lengthAfter ? section.lengthAfter / scale : 0}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'ExJoint14') {
            return <ExJointSection14
              initX={initX + section.initX / scale}
              initY={initY}
              scale={scale}
              length={section.length / scale}
              lengthBefore={section.lengthBefore ? section.lengthBefore / scale : 0}
              lengthAfter={section.lengthAfter ? section.lengthAfter / scale : 0}
              key={section.key}
              upFiting={upFiting}
            />
          } else if (section.name === 'ExJoint15') {
            return <ExJointSection15
              initX={initX + section.initX / scale}
              initY={initY}
              scale={scale}
              length={section.length / scale}
              lengthBefore={section.lengthBefore ? section.lengthBefore / scale : 0}
              lengthAfter={section.lengthAfter ? section.lengthAfter / scale : 0}
              key={section.key}
              upFiting={upFiting}
            />
          } else return <></>
        })
      } else {
        return []
      }
    })

    const SVG = <svg className="svg"  //  SVG вытащил в отдельную переменную. Возможно в будущем пригодится
      xmlns="http://www.w3.org/2000/svg"

      viewBox={`0 0 ${width * factor} ${(factor === 1) ? height : height * 2}`}
      style={{ width: "100%", height: "100%"}}
    >
      <Border />
      
      <BaseTable scale={scale}/>

      <Ground />
      { drawSections }  {/* Массив секций для рендера */}

    </svg>

    var exJointMark = 0
    var exJointsCount = 0
    var move = 32
    function getDesignation(  //  функция определяет обозначение и имя секции в зависимости от отношения к деф. шву
      name: string,
      position: number,
      length: number,
      index: number,
      len: number
    ): {number: string, name:string} | undefined {
      var pattern = 'ЦРНС.305112.001.'
      var count = 0
      for (let ej of expansionJoints) {
        const leftPosOfjoint = ej.position - ej.left
        if (exJointMark) {
          exJointMark = 0
          if (move <= 32)
            if (index === len - 1) {
              return {number: ((exJointsCount < 10) ? pattern + '12-0' + exJointsCount : pattern + '12-' + exJointsCount), name: 'ПО-12'}
            } else {
              return {number: ((exJointsCount < 10) ? pattern + '06-0' + exJointsCount : pattern + '06-' + exJointsCount), name: 'ПО-6'}
            }
          else if (move > 32 && move <= 55)
            if (index === len - 1) {
              return {number: ((exJointsCount < 10) ? pattern + '24-0' + exJointsCount : pattern + '24-' + exJointsCount), name: 'ПО-24'}
            } else {
              return {number: ((exJointsCount < 10) ? pattern + '20-0' + exJointsCount : pattern + '20-' + exJointsCount), name: 'ПО-20'}
            }
        }
        if (position < leftPosOfjoint && position + length > leftPosOfjoint) {
          exJointMark = 1
          exJointsCount++
          if (ej.move) move = ej.move
          if (ej.move && ej.move <= 32)
            if (!index) {
              return {number: ((exJointsCount< 10) ? pattern + '11-0' + exJointsCount : pattern + '11-' + exJointsCount), name: 'ПО-11'}
            } else {
              return {number: ((exJointsCount< 10) ? pattern + '05-0' + exJointsCount : pattern + '05-' + exJointsCount), name: 'ПО-5'}
            }
          else if (ej.move && ej.move > 32 && ej.move <= 55)
          if (!index) {
            return {number: ((exJointsCount< 10) ? pattern + '23-0' + exJointsCount : pattern + '23-' + exJointsCount), name: 'ПО-23'}
          } else {
            return {number: ((exJointsCount< 10) ? pattern + '19-0' + exJointsCount : pattern + '19-' + exJointsCount), name: 'ПО-19'}
          }
          else if (ej.move && ej.move > 55) {
            exJointMark = 0
            if (index === len - 1) {
              return {number: ((exJointsCount< 10) ? pattern + '15-0' + exJointsCount : pattern + '15-' + exJointsCount), name: 'ПО-15'}
            } else {
              if (!index) {
                return {number: ((exJointsCount< 10) ? pattern + '14-0' + exJointsCount : pattern + '14-' + exJointsCount), name: 'ПО-14'}
              } else {
                return {number: ((exJointsCount< 10) ? pattern + '13-0' + exJointsCount : pattern + '13-' + exJointsCount), name: 'ПО-13'}
              }
            }
          }
        }
      }

      if (name.includes('StartSection')) {  //  назначение имени и обозначения секции в зависимости от типа свеса
        if (start.type === 'withBevel') {
          if (!start.filling) {
            return {number: pattern + '01', name: 'ПО-1'}
          } else {
            return {number: pattern + '01', name: 'ПО-1 Lout'}
          }
        } else {
          if (!start.filling) {
            return {number: pattern + '07', name: 'ПО-7'}
          } else {
            return {number: pattern + '07', name: 'ПО-7 Lout'}
          }
        }
      } else if (name.includes('RegularSection3000')) return {number: pattern + '04', name: 'ПО-4'}
      else if (name.includes('RegularSection')) return {number: pattern + '03', name: 'ПО-3'}
      else if (name.includes('EndSection')) {
        if (end.type === 'withBevel') {
          if (!end.filling) {
            return {number: pattern + '02', name: 'ПО-2'}
          } else {
            return {number: pattern + '02', name: 'ПО-2 Lout'}
          }
        } else {
          if (!end.filling) {
            return {number: pattern + '08', name: 'ПО-8'}
          } else {
            return {number: pattern + '08', name: 'ПО-8 Lout'}
          }
        }
      }
      else if (name.includes('UniqSection')) {
        count++
        return {number: ((count < 10) ? pattern + '03-0' + count : pattern + '03-' + count), name: 'ПО-3'}
      }
      else return undefined
    }


  function makeJSON() {  //  Функция для создания JSON и отправки его на сервер
    const fullPlatesList = calc(POLength, expansionJoints, plateJoints, plates, doubleSectionsState)
    console.log(fullPlatesList)

    const sections = fullPlatesList.map((section, index, arr) => {
      const {number, name} = getDesignation(section.name, section.initX, section.length, index, arr.length) || {number: 'null', name: 'null'}
      return {
        id: index + 1,
        number: number,  //  обозначение секции
        name: name,  //  наименование секции
        x: section.initX,  //  X координата секции
        y: section.initY,  //  Y координата секции
        lTotal: section.length,
        //  Длина свеса (если есть)
        lOut: section.name.includes('StartSection') || section.name.includes('11') || section.name.includes('23')|| section.name.includes('14')
          ? start.length
          : section.name.includes('EndSection')|| section.name.includes('12')|| section.name.includes('24')|| section.name.includes('15')
            ? end.length
            : undefined,
        l: section.addedStatePos || section.length,  //  расстояние от начала секции до дополнительной стойки
        lBefore: section.lengthBefore,  //  для секций 13, 14, 15. Расстояние от начала секции до стойки, после которой начинается деф. шов
        lAfter: section.lengthAfter,  //  для секций 13, 14, 15. Расстояние от стойки, после которой начинается деф. шов до конца секции
        lAdded: section.end  //  для секций 6, 19, 20. Длина части над деф. швом
      }
    })
    const result = {
      page: {
        format: pageParams.format,
        factor: pageParams.factor
      },
      shortView: viewBreak,
      stamp: {...stamp, scale:`1:${scale * 10}`},
      expansionJoints: expansionJoints,
      plateJoints: plateJoints,
      sections: sections
    }
    const url = 'http://localhost:5000'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(result),
      headers: {
        "Content-Type": "application/json",
      },
    })
    return result
  }

  return (
    <div
      className="drawing"
    >
      { SVG }
      <button onClick={() => console.log(makeJSON())}>
        send</button>
    </div>
  );
}


