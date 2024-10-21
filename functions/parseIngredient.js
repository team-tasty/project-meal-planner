import parseFunction from "./parseFunction.js"

const numSet = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])
const letterSet = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])

const convertIngredient = (str) => {
    // This stores changes that we've made to the original string and allows it to pass down
    let finalStr = str
    // This checks for ingredients that list multiple conversions in the same line, and cuts them down to the first entry ex: "175g/6oz" should return "175g"
    let updatedStr = ""
    for (let i = 0; i < finalStr.length; i++) {
        if (finalStr[i] === "/" && (letterSet.has(finalStr[i-1]) || letterSet.has(finalStr[i+1]) || finalStr[i-1] === " " || finalStr[i+1] === " ")) {
            updatedStr += "?"
        } else {
            updatedStr += finalStr[i]
        }
    }
    finalStr = (updatedStr.split("?"))[0]
    // This checks for ranges given by a user, and converts them to the minimum. Ex: 2-3 tsp should return 2 tsp
    finalStr = finalStr.replace(/-[ \d]+/g, "")
    // This removes multiplicative entries for ingredient quantities. Ex: 1 x 400 ml should return 400 ml; 2 x 400 ml should return 800 ml
    finalStr = finalStr.replace(/\d+ ?[x\*] ?\d+/g, (multEntry) => {
        const multArr = multEntry.match(/\d+/g)
        return `${multArr[0] * multArr[1]}`
    })
    // This adds spaces between quantities and units. Ex: "175g" should return "175 g"
    let spaceStr = ""
    for (let i = 0; i < finalStr.length; i++) {
        if (numSet.has(finalStr[i]) && letterSet.has(finalStr[i+1])) {
            spaceStr += finalStr[i] + " "
        } else {
            spaceStr += finalStr[i]
        }
    }
    finalStr = spaceStr

    // return finalStr
    return parseFunction(finalStr.toLowerCase())
}

export default convertIngredient