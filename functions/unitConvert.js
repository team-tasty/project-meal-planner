// Americanized measurements
const cupSet = new Set(["cups", "cup", "c"])
const pintSet = new Set(["pints", "pint", "pt"])
const quartSet = new Set(["quarts", "quart", "qt"])
const gallonSet = new Set(["gallons", "gallon", "gal"])
const poundSet = new Set(["pounds", "pound", "lbs", "lb"])
const ounceSet = new Set(["ounces", "ounce", "oz"])
const tspSet = new Set(["teaspoons", "teaspoon", "tsp", "t"])
const tbspSet = new Set(["tablespoons", "tablespoon", "tbls", "tbsps", "tbsp", "tbs", "tb", "t"])

// Metric measurements
const gramSet = new Set(["grams", "gram", "g"])
const kilogramSet = new Set(["kilograms", "kilogram", "kilo grams", "kilo gram", "kgs", "kg"])
const mlSet = new Set(["milliliters", "milliliter", "mls", "ml"])
const literSet = new Set(["liters", "liter", "l"])

const unitConvert = (arr) => {
    let finalArr = []

    // If there are no units, then return null for the DB    
    if (!Array.isArray(arr)) {
        return null
    }
    for (let i=0; i < arr.length; i++) {
        let arrLC = arr[i].toLowerCase()
        if (cupSet.has(arrLC)) {
            finalArr.push("C")
        } else if (pintSet.has(arrLC)) {
            finalArr.push("pt")
        } else if (quartSet.has(arrLC)) {
            finalArr.push("qt")
        } else if (gallonSet.has(arrLC)) {
            finalArr.push("gal")
        } else if (poundSet.has(arrLC)) {
            finalArr.push("lb")
        } else if (ounceSet.has(arrLC)) {
            finalArr.push("oz")
        } else if (tspSet.has(arrLC)) {
            finalArr.push("tsp")
        } else if (tbspSet.has(arrLC)) {
            finalArr.push("Tbsp")
        } else if (gramSet.has(arrLC)) {
            finalArr.push("g")
        } else if (kilogramSet.has(arrLC)) {
            finalArr.push("kg")
        } else if (mlSet.has(arrLC)) {
            finalArr.push("ml")
        } else if (literSet.has("arrLC")) {
            finalArr.push("L")
        } else {
            finalArr.push(arr[i])
        }
    }
    return finalArr.join(" ")
}

export default unitConvert