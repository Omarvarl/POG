const SVGtoPDF = require('svg-to-pdfkit');
const PDFDocument = require('pdfkit');
const fs = require('fs');


module.exports = async function PDF(data) {

    const doc = new PDFDocument({size: [594, 420]})
    const stream = fs.createWriteStream('file.pdf')
    const svg = `<svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5940 4200" style="width: 100%; height: 100%;"><g><path d="M200 50
    L5890 50
    L5890 4150
    L200 4150Z" fill="none" stroke="blue" stroke-width="3"></path></g><g><path d="M5890 3600
L4040 3600
L4040 4150" fill="none" stroke="blue" stroke-width="3"></path><path d="M4690 3600
L4690 4150" fill="none" stroke="blue" stroke-width="3"></path><path d="M4690 3750
L5890 3750" fill="none" stroke="blue" stroke-width="3"></path><path d="M4690 4000
L5890 4000" fill="none" stroke="blue" stroke-width="3"></path><path d="M5390 3750
L5390 4150" fill="none" stroke="blue" stroke-width="3"></path><path d="M5390 3800
L5890 3800" fill="none" stroke="blue" stroke-width="3"></path><path d="M5390 3950
L5890 3950" fill="none" stroke="blue" stroke-width="3"></path><path d="M5710 3750
L5710 3950" fill="none" stroke="blue" stroke-width="3"></path><path d="M5540 3750
L5540 3950" fill="none" stroke="blue" stroke-width="3"></path><path d="M5490 3800
L5490 3950" fill="none" stroke="blue" stroke-width="3"></path><path d="M5440 3800
L5440 3950" fill="none" stroke="blue" stroke-width="3"></path><path d="M5590 3950
L5590 4000" fill="none" stroke="blue" stroke-width="3"></path><path d="M4040 3650
              L4690 3650" fill="none" stroke="blue" stroke-width="1"></path><path d="M4040 3700
              L4690 3700" fill="none" stroke="blue" stroke-width="1"></path><path d="M4040 3750
              L4690 3750" fill="none" stroke="blue" stroke-width="1"></path><path d="M4040 3800
              L4690 3800" fill="none" stroke="blue" stroke-width="3"></path><path d="M4040 3850
              L4690 3850" fill="none" stroke="blue" stroke-width="3"></path><path d="M4040 3900
              L4690 3900" fill="none" stroke="blue" stroke-width="1"></path><path d="M4040 3950
              L4690 3950" fill="none" stroke="blue" stroke-width="1"></path><path d="M4040 4000
              L4690 4000" fill="none" stroke="blue" stroke-width="1"></path><path d="M4040 4050
              L4690 4050" fill="none" stroke="blue" stroke-width="1"></path><path d="M4040 4100
              L4690 4100" fill="none" stroke="blue" stroke-width="1"></path><path d="M4110 3600
              L4110 3850" fill="none" stroke="blue" stroke-width="3"></path><path d="M4210 3600
              L4210 4150" fill="none" stroke="blue" stroke-width="3"></path><path d="M4440 3600
              L4440 4150" fill="none" stroke="blue" stroke-width="3"></path><path d="M4590 3600
              L4590 4150" fill="none" stroke="blue" stroke-width="3"></path></g><g><g id="plate_0"><defs><pattern id="concrete" patternUnits="userSpaceOnUse" width="25" height="25" viewBox="0 0 10 10"><path class="ground" d="M 0 5 L 5 0" fill="none" stroke-width="1"></path></pattern></defs><path class="ground" d="M700 910
    L700 850
    L4700 850
    L4700 910
  " fill="url('#concrete')" stroke-width="3"></path></g><g class="dim-arrow"><path d="M700 850
          L700 130
      "></path><path d="M4700 850
          L4700 130
      "></path><path d="M700 150
          L4700 150
      "></path><path d="M700 150
          L750 143.42
          L745 150
          L750 156.58Z
      "></path><path d="M4700 150
          L4650 143.42
          L4655 150
          L4650 156.58Z
      "></path><text x="2650" y="140" font-size="70px">10000</text></g><g class="dim-arrow"><path d="M700 850
          L700 1130
      "></path><path d="M800 850
          L800 1130
      "></path><path d="M700 1110
          L800 1110
      "></path><path d="M700 1110
              L650 1103.42
              L655 1110
              L650 1116.58Z
          "></path><path d="M800 1110
              L850 1103.42
              L845 1110
              L850 1116.58Z
          "></path><path d="M655 1110
              L480 1110
          "></path><path d="M845 1110
              L900 1110
          "></path><text x="500" y="1100" font-size="70px">250</text></g><g class="dim-arrow"><path d="M4600 850
          L4600 1020
      "></path><path d="M4700 850
          L4700 1020
      "></path><path d="M4600 1000
          L4700 1000
      "></path><path d="M4600 1000
              L4550 993.42
              L4555 1000
              L4550 1006.58Z
          "></path><path d="M4700 1000
              L4750 993.42
              L4745 1000
              L4750 1006.58Z
          "></path><path d="M4555 1000
              L4380 1000
          "></path><path d="M4745 1000
              L4800 1000
          "></path><text x="4400" y="990" font-size="70px">250</text></g></g><g class="s1500"><g><g><g><path class="base-line" d="M875.2 782.4
  L888 782.4
  L888 501.2
  L875.2 501.2Z
"></path><path class="dashed-line" d="M881.6 784.4
  L881.6 499.2
"></path></g><g><path class="base-line" d="M948.0000000000001 782.4
  L960.8000000000001 782.4
  L960.8000000000001 501.2
  L948.0000000000001 501.2Z
"></path><path class="dashed-line" d="M954.4000000000001 784.4
  L954.4000000000001 499.2
"></path></g><g><path class="base-line" d="M1020.8000000000001 782.4
  L1033.6000000000001 782.4
  L1033.6000000000001 501.2
  L1020.8000000000001 501.2Z
"></path><path class="dashed-line" d="M1027.2 784.4
  L1027.2 499.2
"></path></g><g><path class="base-line" d="M1093.6 782.4
  L1106.4 782.4
  L1106.4 501.2
  L1093.6 501.2Z
"></path><path class="dashed-line" d="M1100 784.4
  L1100 499.2
"></path></g><g><path class="base-line" d="M1166.4 782.4
  L1179.2000000000003 782.4
  L1179.2000000000003 501.2
  L1166.4 501.2Z
"></path><path class="dashed-line" d="M1172.8000000000002 784.4
  L1172.8000000000002 499.2
"></path></g><g><path class="base-line" d="M1239.2 782.4
  L1252.0000000000002 782.4
  L1252.0000000000002 501.2
  L1239.2 501.2Z
"></path><path class="dashed-line" d="M1245.6000000000001 784.4
  L1245.6000000000001 499.2
"></path></g><g><path class="base-line" d="M1312 782.4
  L1324.8000000000002 782.4
  L1324.8000000000002 501.2
  L1312 501.2Z
"></path><path class="dashed-line" d="M1318.4 784.4
  L1318.4 499.2
"></path></g></g><g><path class="base-line-fill" d="M800 790.4
  L800 774.4
  L1400 774.4
  L1400 790.4Z
"></path></g><g><path class="base-line-fill" d="M800 509.2
  L800 493.2
  L1400 493.2
  L1400 509.2Z
"></path></g><g><path class="base-line-fill" d="M782.4 850
  L817.6 850
  L817.6 410
  L782.4 410Z
"></path><path class="dashed-line" d="M800 852
  L800 408
"></path></g><g><path class="base-line-fill" d="M800 431.8
  L800 408.6
  L1400 408.6
  L1400 431.8Z
"></path></g><g><path class="base-line-fill" d="M769.4 850
  L830.6 850
  L830.6 832
  L825.6 795.2
  L774.4 795.2
  L769.4 832Z
"></path><path class="base-line" d="M769.4 846
  L830.6 846

"></path><path class="base-line" d="M783.4 846
  L783.4 795.2

"></path><path class="base-line" d="M787.4 846
  L787.4 795.2

"></path><path class="base-line" d="M816.6 846
  L816.6 795.2

"></path><path class="base-line" d="M812.6 846
  L812.6 795.2

"></path><path class="dashed-line" d="M800 852
  L800 797.2
"></path></g><g><path class="base-line-fill" d="M772.4 408
  L827.6 408
  L827.6 435.2
  L820 435.2
  L820 440
  L780 440
  L780 435.2
  L772.4 435.2
  Z
"></path><path class="dashed-line" d="M800 406
  L800 441.2
"></path></g></g><g><path class="base-line-fill" d="M817.6 794
L700 794
L723.2 770.8
L817.6 770.8Z
"></path><path class="base-line" d="M723.2 770.8
L723.2 541.5999999999999
L700 537.5999999999999
L700 794Z
"></path><path class="base-line-fill" d="M800 408.6
L746.4 408.6
L762.8 431.8
L800 431.8Z
"></path><path class="base-line" d="M746.4 408.6
L700 537.5999999999999
L723.2 541.5999999999999
L762.8 431.8Z
"></path></g><g><path class="base-line-fill" d="M772.4 408
  L827.6 408
  L827.6 435.2
  L820 435.2
  L820 440
  L780 440
  L780 435.2
  L772.4 435.2
  Z
"></path><path class="dashed-line" d="M800 406
  L800 441.2
"></path></g></g><g class="r3000"><g><g><g><path class="base-line" d="M1475.1999999999998 782.4
  L1488 782.4
  L1488 501.2
  L1475.1999999999998 501.2Z
"></path><path class="dashed-line" d="M1481.6 784.4
  L1481.6 499.2
"></path></g><g><path class="base-line" d="M1548 782.4
  L1560.8000000000002 782.4
  L1560.8000000000002 501.2
  L1548 501.2Z
"></path><path class="dashed-line" d="M1554.4 784.4
  L1554.4 499.2
"></path></g><g><path class="base-line" d="M1620.8 782.4
  L1633.6000000000001 782.4
  L1633.6000000000001 501.2
  L1620.8 501.2Z
"></path><path class="dashed-line" d="M1627.2 784.4
  L1627.2 499.2
"></path></g><g><path class="base-line" d="M1693.6 782.4
  L1706.4 782.4
  L1706.4 501.2
  L1693.6 501.2Z
"></path><path class="dashed-line" d="M1700 784.4
  L1700 499.2
"></path></g><g><path class="base-line" d="M1766.4 782.4
  L1779.2000000000003 782.4
  L1779.2000000000003 501.2
  L1766.4 501.2Z
"></path><path class="dashed-line" d="M1772.8000000000002 784.4
  L1772.8000000000002 499.2
"></path></g><g><path class="base-line" d="M1839.2 782.4
  L1852.0000000000002 782.4
  L1852.0000000000002 501.2
  L1839.2 501.2Z
"></path><path class="dashed-line" d="M1845.6000000000001 784.4
  L1845.6000000000001 499.2
"></path></g><g><path class="base-line" d="M1912 782.4
  L1924.8000000000002 782.4
  L1924.8000000000002 501.2
  L1912 501.2Z
"></path><path class="dashed-line" d="M1918.4 784.4
  L1918.4 499.2
"></path></g></g><g><path class="base-line-fill" d="M1400 790.4
  L1400 774.4
  L2000 774.4
  L2000 790.4Z
"></path></g><g><path class="base-line-fill" d="M1400 509.2
  L1400 493.2
  L2000 493.2
  L2000 509.2Z
"></path></g><g><path class="base-line-fill" d="M1382.4 850
  L1417.6 850
  L1417.6 410
  L1382.4 410Z
"></path><path class="dashed-line" d="M1400 852
  L1400 408
"></path></g><g><path class="base-line-fill" d="M1400 431.8
  L1400 408.6
  L2000 408.6
  L2000 431.8Z
"></path></g><g><path class="base-line-fill" d="M1369.4 850
  L1430.6 850
  L1430.6 832
  L1425.6 795.2
  L1374.4 795.2
  L1369.4 832Z
"></path><path class="base-line" d="M1369.4 846
  L1430.6 846

"></path><path class="base-line" d="M1383.4 846
  L1383.4 795.2

"></path><path class="base-line" d="M1387.4 846
  L1387.4 795.2

"></path><path class="base-line" d="M1416.6 846
  L1416.6 795.2

"></path><path class="base-line" d="M1412.6 846
  L1412.6 795.2

"></path><path class="dashed-line" d="M1400 852
  L1400 797.2
"></path></g><g><path class="base-line-fill" d="M1372.4 408
  L1427.6 408
  L1427.6 435.2
  L1420 435.2
  L1420 440
  L1380 440
  L1380 435.2
  L1372.4 435.2
  Z
"></path><path class="dashed-line" d="M1400 406
  L1400 441.2
"></path></g></g><g><g><g><path class="base-line" d="M2075.2 782.4
  L2088 782.4
  L2088 501.2
  L2075.2 501.2Z
"></path><path class="dashed-line" d="M2081.6 784.4
  L2081.6 499.2
"></path></g><g><path class="base-line" d="M2148 782.4
  L2160.8 782.4
  L2160.8 501.2
  L2148 501.2Z
"></path><path class="dashed-line" d="M2154.4 784.4
  L2154.4 499.2
"></path></g><g><path class="base-line" d="M2220.7999999999997 782.4
  L2233.6 782.4
  L2233.6 501.2
  L2220.7999999999997 501.2Z
"></path><path class="dashed-line" d="M2227.2 784.4
  L2227.2 499.2
"></path></g><g><path class="base-line" d="M2293.6 782.4
  L2306.4 782.4
  L2306.4 501.2
  L2293.6 501.2Z
"></path><path class="dashed-line" d="M2300 784.4
  L2300 499.2
"></path></g><g><path class="base-line" d="M2366.4 782.4
  L2379.2000000000003 782.4
  L2379.2000000000003 501.2
  L2366.4 501.2Z
"></path><path class="dashed-line" d="M2372.8 784.4
  L2372.8 499.2
"></path></g><g><path class="base-line" d="M2439.2 782.4
  L2452 782.4
  L2452 501.2
  L2439.2 501.2Z
"></path><path class="dashed-line" d="M2445.6 784.4
  L2445.6 499.2
"></path></g><g><path class="base-line" d="M2512 782.4
  L2524.8 782.4
  L2524.8 501.2
  L2512 501.2Z
"></path><path class="dashed-line" d="M2518.4 784.4
  L2518.4 499.2
"></path></g></g><g><path class="base-line-fill" d="M2000 790.4
  L2000 774.4
  L2600 774.4
  L2600 790.4Z
"></path></g><g><path class="base-line-fill" d="M2000 509.2
  L2000 493.2
  L2600 493.2
  L2600 509.2Z
"></path></g><g><path class="base-line-fill" d="M1982.4 850
  L2017.6 850
  L2017.6 410
  L1982.4 410Z
"></path><path class="dashed-line" d="M2000 852
  L2000 408
"></path></g><g><path class="base-line-fill" d="M2000 431.8
  L2000 408.6
  L2600 408.6
  L2600 431.8Z
"></path></g><g><path class="base-line-fill" d="M1969.4 850
  L2030.6 850
  L2030.6 832
  L2025.6 795.2
  L1974.4 795.2
  L1969.4 832Z
"></path><path class="base-line" d="M1969.4 846
  L2030.6 846

"></path><path class="base-line" d="M1983.4 846
  L1983.4 795.2

"></path><path class="base-line" d="M1987.4 846
  L1987.4 795.2

"></path><path class="base-line" d="M2016.6 846
  L2016.6 795.2

"></path><path class="base-line" d="M2012.6 846
  L2012.6 795.2

"></path><path class="dashed-line" d="M2000 852
  L2000 797.2
"></path></g><g><path class="base-line-fill" d="M1972.4 408
  L2027.6 408
  L2027.6 435.2
  L2020 435.2
  L2020 440
  L1980 440
  L1980 435.2
  L1972.4 435.2
  Z
"></path><path class="dashed-line" d="M2000 406
  L2000 441.2
"></path></g></g></g><g><g><g><path class="base-line" d="M2675.2 782.4
  L2688 782.4
  L2688 501.2
  L2675.2 501.2Z
"></path><path class="dashed-line" d="M2681.6 784.4
  L2681.6 499.2
"></path></g><g><path class="base-line" d="M2748 782.4
  L2760.8 782.4
  L2760.8 501.2
  L2748 501.2Z
"></path><path class="dashed-line" d="M2754.4 784.4
  L2754.4 499.2
"></path></g><g><path class="base-line" d="M2820.7999999999997 782.4
  L2833.6 782.4
  L2833.6 501.2
  L2820.7999999999997 501.2Z
"></path><path class="dashed-line" d="M2827.2 784.4
  L2827.2 499.2
"></path></g><g><path class="base-line" d="M2893.6 782.4
  L2906.4 782.4
  L2906.4 501.2
  L2893.6 501.2Z
"></path><path class="dashed-line" d="M2900 784.4
  L2900 499.2
"></path></g><g><path class="base-line" d="M2966.4 782.4
  L2979.2000000000003 782.4
  L2979.2000000000003 501.2
  L2966.4 501.2Z
"></path><path class="dashed-line" d="M2972.8 784.4
  L2972.8 499.2
"></path></g><g><path class="base-line" d="M3039.2 782.4
  L3052 782.4
  L3052 501.2
  L3039.2 501.2Z
"></path><path class="dashed-line" d="M3045.6 784.4
  L3045.6 499.2
"></path></g><g><path class="base-line" d="M3112 782.4
  L3124.8 782.4
  L3124.8 501.2
  L3112 501.2Z
"></path><path class="dashed-line" d="M3118.4 784.4
  L3118.4 499.2
"></path></g></g><g><path class="base-line-fill" d="M2600 790.4
  L2600 774.4
  L3200 774.4
  L3200 790.4Z
"></path></g><g><path class="base-line-fill" d="M2600 509.2
  L2600 493.2
  L3200 493.2
  L3200 509.2Z
"></path></g><g><path class="base-line-fill" d="M2582.4 850
  L2617.6 850
  L2617.6 410
  L2582.4 410Z
"></path><path class="dashed-line" d="M2600 852
  L2600 408
"></path></g><g><path class="base-line-fill" d="M2600 431.8
  L2600 408.6
  L3200 408.6
  L3200 431.8Z
"></path></g><g><path class="base-line-fill" d="M2569.4 850
  L2630.6 850
  L2630.6 832
  L2625.6 795.2
  L2574.4 795.2
  L2569.4 832Z
"></path><path class="base-line" d="M2569.4 846
  L2630.6 846

"></path><path class="base-line" d="M2583.4 846
  L2583.4 795.2

"></path><path class="base-line" d="M2587.4 846
  L2587.4 795.2

"></path><path class="base-line" d="M2616.6 846
  L2616.6 795.2

"></path><path class="base-line" d="M2612.6 846
  L2612.6 795.2

"></path><path class="dashed-line" d="M2600 852
  L2600 797.2
"></path></g><g><path class="base-line-fill" d="M2572.4 408
  L2627.6 408
  L2627.6 435.2
  L2620 435.2
  L2620 440
  L2580 440
  L2580 435.2
  L2572.4 435.2
  Z
"></path><path class="dashed-line" d="M2600 406
  L2600 441.2
"></path></g></g><g class="u"><g><path class="base-line" d="M3248 782.4
  L3260.8 782.4
  L3260.8 501.2
  L3248 501.2Z
"></path><path class="dashed-line" d="M3254.4 784.4
  L3254.4 499.2
"></path></g><g><path class="base-line" d="M3320.7999999999997 782.4
  L3333.6 782.4
  L3333.6 501.2
  L3320.7999999999997 501.2Z
"></path><path class="dashed-line" d="M3327.2 784.4
  L3327.2 499.2
"></path></g><g><path class="base-line" d="M3393.6 782.4
  L3406.4 782.4
  L3406.4 501.2
  L3393.6 501.2Z
"></path><path class="dashed-line" d="M3400 784.4
  L3400 499.2
"></path></g><g><path class="base-line" d="M3466.4 782.4
  L3479.2000000000003 782.4
  L3479.2000000000003 501.2
  L3466.4 501.2Z
"></path><path class="dashed-line" d="M3472.8 784.4
  L3472.8 499.2
"></path></g><g><path class="base-line" d="M3539.2 782.4
  L3552 782.4
  L3552 501.2
  L3539.2 501.2Z
"></path><path class="dashed-line" d="M3545.6 784.4
  L3545.6 499.2
"></path></g><g><path class="base-line" d="M3648 782.4
  L3660.8 782.4
  L3660.8 501.2
  L3648 501.2Z
"></path><path class="dashed-line" d="M3654.4 784.4
  L3654.4 499.2
"></path></g><g><path class="base-line" d="M3720.7999999999997 782.4
  L3733.6 782.4
  L3733.6 501.2
  L3720.7999999999997 501.2Z
"></path><path class="dashed-line" d="M3727.2 784.4
  L3727.2 499.2
"></path></g><g><path class="base-line" d="M3793.6 782.4
  L3806.4 782.4
  L3806.4 501.2
  L3793.6 501.2Z
"></path><path class="dashed-line" d="M3800 784.4
  L3800 499.2
"></path></g><g><path class="base-line" d="M3866.4 782.4
  L3879.2000000000003 782.4
  L3879.2000000000003 501.2
  L3866.4 501.2Z
"></path><path class="dashed-line" d="M3872.8 784.4
  L3872.8 499.2
"></path></g><g><path class="base-line" d="M3939.2 782.4
  L3952 782.4
  L3952 501.2
  L3939.2 501.2Z
"></path><path class="dashed-line" d="M3945.6 784.4
  L3945.6 499.2
"></path></g><g><path class="base-line-fill" d="M3200 790.4
  L3200 774.4
  L4000 774.4
  L4000 790.4Z
"></path></g><g><path class="base-line-fill" d="M3200 509.2
  L3200 493.2
  L4000 493.2
  L4000 509.2Z
"></path></g><g><path class="base-line-fill" d="M3182.4 850
  L3217.6 850
  L3217.6 410
  L3182.4 410Z
"></path><path class="dashed-line" d="M3200 852
  L3200 408
"></path></g><g><path class="base-line-fill" d="M3582.4 850
  L3617.6 850
  L3617.6 410
  L3582.4 410Z
"></path><path class="dashed-line" d="M3600 852
  L3600 408
"></path></g><g><path class="base-line-fill" d="M3200 431.8
  L3200 408.6
  L4000 408.6
  L4000 431.8Z
"></path></g><g><path class="base-line-fill" d="M3169.4 850
  L3230.6 850
  L3230.6 832
  L3225.6 795.2
  L3174.4 795.2
  L3169.4 832Z
"></path><path class="base-line" d="M3169.4 846
  L3230.6 846

"></path><path class="base-line" d="M3183.4 846
  L3183.4 795.2

"></path><path class="base-line" d="M3187.4 846
  L3187.4 795.2

"></path><path class="base-line" d="M3216.6 846
  L3216.6 795.2

"></path><path class="base-line" d="M3212.6 846
  L3212.6 795.2

"></path><path class="dashed-line" d="M3200 852
  L3200 797.2
"></path></g><g><path class="base-line-fill" d="M3172.4 408
  L3227.6 408
  L3227.6 435.2
  L3220 435.2
  L3220 440
  L3180 440
  L3180 435.2
  L3172.4 435.2
  Z
"></path><path class="dashed-line" d="M3200 406
  L3200 441.2
"></path></g><g><path class="base-line-fill" d="M3569.4 850
  L3630.6 850
  L3630.6 832
  L3625.6 795.2
  L3574.4 795.2
  L3569.4 832Z
"></path><path class="base-line" d="M3569.4 846
  L3630.6 846

"></path><path class="base-line" d="M3583.4 846
  L3583.4 795.2

"></path><path class="base-line" d="M3587.4 846
  L3587.4 795.2

"></path><path class="base-line" d="M3616.6 846
  L3616.6 795.2

"></path><path class="base-line" d="M3612.6 846
  L3612.6 795.2

"></path><path class="dashed-line" d="M3600 852
  L3600 797.2
"></path></g><g><path class="base-line-fill" d="M3572.4 408
  L3627.6 408
  L3627.6 435.2
  L3620 435.2
  L3620 440
  L3580 440
  L3580 435.2
  L3572.4 435.2
  Z
"></path><path class="dashed-line" d="M3600 406
  L3600 441.2
"></path></g></g><g class="e1500"><g><g><g><path class="base-line" d="M4075.2 782.4
  L4088 782.4
  L4088 501.2
  L4075.2 501.2Z
"></path><path class="dashed-line" d="M4081.6 784.4
  L4081.6 499.2
"></path></g><g><path class="base-line" d="M4148 782.4
  L4160.799999999999 782.4
  L4160.799999999999 501.2
  L4148 501.2Z
"></path><path class="dashed-line" d="M4154.4 784.4
  L4154.4 499.2
"></path></g><g><path class="base-line" d="M4220.8 782.4
  L4233.599999999999 782.4
  L4233.599999999999 501.2
  L4220.8 501.2Z
"></path><path class="dashed-line" d="M4227.2 784.4
  L4227.2 499.2
"></path></g><g><path class="base-line" d="M4293.6 782.4
  L4306.4 782.4
  L4306.4 501.2
  L4293.6 501.2Z
"></path><path class="dashed-line" d="M4300 784.4
  L4300 499.2
"></path></g><g><path class="base-line" d="M4366.400000000001 782.4
  L4379.2 782.4
  L4379.2 501.2
  L4366.400000000001 501.2Z
"></path><path class="dashed-line" d="M4372.8 784.4
  L4372.8 499.2
"></path></g><g><path class="base-line" d="M4439.200000000001 782.4
  L4452 782.4
  L4452 501.2
  L4439.200000000001 501.2Z
"></path><path class="dashed-line" d="M4445.6 784.4
  L4445.6 499.2
"></path></g><g><path class="base-line" d="M4512 782.4
  L4524.799999999999 782.4
  L4524.799999999999 501.2
  L4512 501.2Z
"></path><path class="dashed-line" d="M4518.4 784.4
  L4518.4 499.2
"></path></g></g><g><path class="base-line-fill" d="M4000 790.4
  L4000 774.4
  L4600 774.4
  L4600 790.4Z
"></path></g><g><path class="base-line-fill" d="M4000 509.2
  L4000 493.2
  L4600 493.2
  L4600 509.2Z
"></path></g><g><path class="base-line-fill" d="M4582.4 850
  L4617.6 850
  L4617.6 410
  L4582.4 410Z
"></path><path class="dashed-line" d="M4600 852
  L4600 408
"></path></g><g><path class="base-line-fill" d="M4000 431.8
  L4000 408.6
  L4600 408.6
  L4600 431.8Z
"></path></g><g><path class="base-line-fill" d="M4569.4 850
  L4630.6 850
  L4630.6 832
  L4625.6 795.2
  L4574.4 795.2
  L4569.4 832Z
"></path><path class="base-line" d="M4569.4 846
  L4630.6 846

"></path><path class="base-line" d="M4583.4 846
  L4583.4 795.2

"></path><path class="base-line" d="M4587.4 846
  L4587.4 795.2

"></path><path class="base-line" d="M4616.6 846
  L4616.6 795.2

"></path><path class="base-line" d="M4612.6 846
  L4612.6 795.2

"></path><path class="dashed-line" d="M4600 852
  L4600 797.2
"></path></g><g><path class="base-line-fill" d="M4572.4 408
  L4627.6 408
  L4627.6 435.2
  L4620 435.2
  L4620 440
  L4580 440
  L4580 435.2
  L4572.4 435.2
  Z
"></path><path class="dashed-line" d="M4600 406
  L4600 441.2
"></path></g></g><g><path class="base-line-fill" d="M4582.4 794
L4700 794
L4676.8 770.8
L4582.4 770.8Z
"></path><path class="base-line" d="M4676.8 770.8
L4676.8 541.5999999999999
L4700 537.5999999999999
L4700 794Z
"></path><path class="base-line-fill" d="M4600 408.6
L4653.6 408.6
L4637.2 431.8
L4600 431.8Z
"></path><path class="base-line" d="M4653.6 408.6
L4700 537.5999999999999
L4676.8 541.5999999999999
L4637.2 431.8Z
"></path></g><g><path class="base-line-fill" d="M3982.4 850
  L4017.6 850
  L4017.6 410
  L3982.4 410Z
"></path><path class="dashed-line" d="M4000 852
  L4000 408
"></path></g><g><path class="base-line-fill" d="M4572.4 408
  L4627.6 408
  L4627.6 435.2
  L4620 435.2
  L4620 440
  L4580 440
  L4580 435.2
  L4572.4 435.2
  Z
"></path><path class="dashed-line" d="M4600 406
  L4600 441.2
"></path></g><g><path class="base-line-fill" d="M3972.4 408
  L4027.6 408
  L4027.6 435.2
  L4020 435.2
  L4020 440
  L3980 440
  L3980 435.2
  L3972.4 435.2
  Z
"></path><path class="dashed-line" d="M4000 406
  L4000 441.2
"></path></g><g><path class="base-line-fill" d="M3969.4 850
  L4030.6 850
  L4030.6 832
  L4025.6 795.2
  L3974.4 795.2
  L3969.4 832Z
"></path><path class="base-line" d="M3969.4 846
  L4030.6 846

"></path><path class="base-line" d="M3983.4 846
  L3983.4 795.2

"></path><path class="base-line" d="M3987.4 846
  L3987.4 795.2

"></path><path class="base-line" d="M4016.6 846
  L4016.6 795.2

"></path><path class="base-line" d="M4012.6 846
  L4012.6 795.2

"></path><path class="dashed-line" d="M4000 852
  L4000 797.2
"></path></g></g></svg>`


    SVGtoPDF(doc, svg, 0, 0, {width: 594, height: 420});

    stream.on('finish', function() {
        console.log(fs.readFileSync('file.pdf'))
    });
    doc.pipe(stream);
    doc.end();
}
