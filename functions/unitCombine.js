import handleConversion from "./handleConversion.js"
import handleCategory from "./handleCategory.js"

const conversionVolSet = new Set (["C", "pt", "qt", "gal", "oz", "tsp", "Tbsp", "ml", "L"])
const conversionWeightSet = new Set(["lb", "g", "kg"])

const unitCombine = (arrIng) => {
    let convertedArr = []
    for (let i = 0; i < arrIng.length; i++) {
        if (
            i + 1 < arrIng.length 
            &&
            (arrIng[i].ingredient === arrIng[i+1].ingredient || `${arrIng[i].ingredient}s` === arrIng[i+1].ingredient || arrIng[i].ingredient === `${arrIng[i+1].ingredient}s` || `${arrIng[i].ingredient}es` === arrIng[i+1].ingredient || arrIng[i].ingredient === `${arrIng[i+1].ingredient}es`) 
            &&
            ((conversionVolSet.has(arrIng[i].unit) && conversionVolSet.has(arrIng[i+1].unit)) || (conversionWeightSet.has(arrIng[i].unit) && conversionWeightSet.has(arrIng[i+1].unit)))
        ) {
            let finalConvert = handleConversion(arrIng[i].quantity, arrIng[i].unit, arrIng[i+1].quantity, arrIng[i+1].unit)

            arrIng.splice((i), 2, {
                ...arrIng[i],
                quantity: finalConvert[0],
                unit: finalConvert[1]
            })
            i--
        } else {
            convertedArr.push(arrIng[i])
        }
    }
    // return convertedArr
    return handleCategory(convertedArr)
} 

export default unitCombine