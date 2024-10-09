import unitConvert from "./unitConvert.js"

const numSet = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])
const letterSet = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])

const convertIngredient = (str) => {
    // This stores changes that we've made to the original string and allows it to pass down
    let finalStr = str
    // This checks for ingredients that list multiple conversions in the same line, and cuts them down to the first entry ex: "175g/6oz" should return "175g"
    let updatedStr = ""
    for (let i = 0; i < finalStr.length; i++) {
        if (finalStr[i] === "/" && (letterSet.has(finalStr[i-1]) || letterSet.has(finalStr[i+1]) || finalStr[i-1] === " " || finalStr[i+1] === " ")) {
            console.log("Inside check")
            updatedStr += "?"
        } else {
            updatedStr += finalStr[i]
        }
    }
    finalStr = (updatedStr.split("?"))[0]
    // This adds spaces between quantities and units. Ex: "175g" should return "175 g"
    let spaceStr = ""
    for (let i = 0; i < finalStr.length; i++) {
        if (numSet.has(finalStr[i]) && letterSet.has(finalStr[i+1])) {
            console.log("space check")
            spaceStr += finalStr[i] + " "
        } else {
            spaceStr += finalStr[i]
        }
    }
    finalStr = spaceStr
    // This checks for ranges given by a user, and converts them to the minimum. Ex: 2-3 tsp should return 2 tsp
    finalStr = finalStr.replace(/-\d+/g, "")

    // return finalStr
    return parseFunction(finalStr)
}


// This function will separate the quantities from the units and manipulate them into consistent, usable data for the DB
const parseFunction = (str) => {
    // First we'll grab the unit, which we can then convert into a consistent unit within another function
    const strUnitArr = str.match(/[a-z]+/gi)
    const finalUnit = unitConvert(strUnitArr)

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

export default convertIngredient