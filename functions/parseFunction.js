import unitConvert from "./unitConvert.js";

// This function will separate the quantities from the units and manipulate them into consistent, usable data for the DB
const parseFunction = (str) => {
    // First we'll grab the unit, which we can then convert into a consistent unit within another function
    const strUnitArr = str.match(/[a-z]+/gi)
    const finalUnit = unitConvert(strUnitArr)

    // We need to convert any Unicode fractions given into actual numbers
    const fractionObj = {
        '¼': 0.25,
        '½': 0.5,
        '¾': 0.75,
        '⅓': 0.333,
        '⅔': 0.666,
        '⅕': 0.2,
        '⅖': 0.4,
        '⅗': 0.6,
        '⅘': 0.8,
        '⅙': 0.166,
        '⅚': 0.833,
        '⅛': 0.125,
        '⅜': 0.375,
        '⅝': 0.625,
        '⅞': 0.875
      }
    str = str.replace(/[¼½¾⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g, (fraction) => {
        return fractionObj[fraction] ? ` ${fractionObj[fraction]}` : fraction;
    })
    // Next we can work with the numbers. We'll separate them, convert them to values we can use in javascript, and then sum them.
    const strQtyArr = str.match(/[0-9\/\.]{2,}|[0-9]+/g)
    let finalQty = 0
    if (Array.isArray(strQtyArr)) {
        for (let i=0; i < strQtyArr.length; i++) {
            if (strQtyArr[i].includes("/")) {
                let fractionArr = strQtyArr[i].split("/")
                strQtyArr[i] = (+fractionArr[0] / +fractionArr[1])
            } else {
                strQtyArr[i] = +strQtyArr[i]
            }
        }
        finalQty = strQtyArr.reduce((x,y) => x + y, 0)
    }
    try {
        return [Number(finalQty), String(finalUnit)]
    } catch (error) {
        console.error(error)
        return `Error occured: ${error}`
    }
}

export default parseFunction