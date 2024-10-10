import groceryListPracticeData from "./groceryListPracticeData.js"
import unitCombine from "./unitCombine.js"

const groceryList = (arrRecipes) => {
    let ingredientArr = []
    let finalArr = []

    if (!Array.isArray(arrRecipes)) {
        arrRecipes = []
        console.error("Non-array entered into groceryList function")
    }

    for (let i=0; i < arrRecipes.length; i++) {
        for (let j=0; j < arrRecipes[i].recipeIngredients.length; j++) {
            ingredientArr.push({
                quantity: arrRecipes[i].recipeIngredients[j].measurementQuantity.quantity,
                unit: arrRecipes[i].recipeIngredients[j].measurementUnit.unit,
                ingredient: arrRecipes[i].recipeIngredients[j].ingredient.ingredient
            })
        }       
    }
    ingredientArr.sort((a, b) => {
        // Removes the 's' at the end of a pluralized word to normalize singular/plural forms
        const singularA = a.ingredient.replace(/s$/, '')
        const singularB = b.ingredient.replace(/s$/, '')

        // Compare the singular forms alphabetically
        if (singularA < singularB) return -1
        if (singularA > singularB) return 1

        // If the singular forms are the same, prioritize singular over plural
        if (a.ingredient.length < b.ingredient.length) return -1
        if (a.ingredient.length > b.ingredient.length) return 1

        // If both are the same length, check the unit and organize alphabetically
        return a.unit - b.unit
    })

    // If the ingredient is the same (or pluralized), and the units are equivalent, combine the quantities
    let qtySum = 0
    for (let i = 0; i < ingredientArr.length; i++) {
        if (
        // Check if it's the first entry, or a unique entry. Pass by the last entry
        (
            i !== ingredientArr.length &&
            ( i === 0 || 
            (ingredientArr[i].ingredient !== ingredientArr[(i-1)].ingredient && ingredientArr[i].ingredient !== `${ingredientArr[(i-1)].ingredient}s`)
            )
        )
        && 
        // Check if the next ingredient matches
        (
            i+1 < ingredientArr.length && 
            (ingredientArr[i].ingredient === ingredientArr[(i+1)].ingredient || `${ingredientArr[i].ingredient}s` === ingredientArr[(i+1)].ingredient))
        &&
        // Check if the units are the same
        (ingredientArr[i].unit === ingredientArr[(i+1)].unit)
        ) 
        {
            for (let j = i; j < ingredientArr.length; j++) {
                // sums the quantities of all matching ingredients
                if (j === i || ingredientArr[j].ingredient === ingredientArr[(j-1)].ingredient || ingredientArr[j].ingredient === `${ingredientArr[(j-1)].ingredient}s`) {
                    qtySum += ingredientArr[j].quantity
                } else {
                    break
                }
            }
            // Checks whether quantity needs to worry about pluralization. Checks whether the ingredient is already pluralized

            if (qtySum !== 1) {
                if (ingredientArr[i].ingredient.match(/s$/)) {
                    finalArr.push({
                        ...ingredientArr[i],
                        quantity: qtySum,
                    })
                    qtySum = 0
                } else {
                    finalArr.push({
                        ...ingredientArr[i],
                        quantity: qtySum,
                        ingredient: `${ingredientArr[i].ingredient}s`
                    })
                    qtySum = 0
                }
            } else {
                finalArr.push({
                    ...ingredientArr[i],
                    quantity: qtySum
                })
                qtySum = 0
            }

            // if (ingredientArr[i].unit === 'null' && qtySum !== 1) {
            //     if (ingredientArr[i].ingredient.match(/s$/)) {
            //         finalArr.push(`${qtySum} ${ingredientArr[i].ingredient}`)
            //         qtySum = 0
            //     } else {
            //         finalArr.push(`${qtySum} ${ingredientArr[i].ingredient}s`)
            //         qtySum = 0
            //     }
            // } else if (ingredientArr[i].unit === 'null') {
            //     finalArr.push(`${qtySum} ${ingredientArr[i].ingredient}`)
            //     qtySum = 0
            // } else if (ingredientArr[i].unit !== 'null' && qtySum !== 1) {
            //     if (ingredientArr[i].ingredient.match(/s$/)) {
            //         finalArr.push(`${qtySum} ${ingredientArr[i].unit} ${ingredientArr[i].ingredient}`)
            //         qtySum = 0
            //     } else {
            //         finalArr.push(`${qtySum} ${ingredientArr[i].unit} ${ingredientArr[i].ingredient}s`)
            //         qtySum = 0
            //     }
            // } else {
            //     finalArr.push(`${qtySum} ${ingredientArr[i].unit} ${ingredientArr[i].ingredient}`)
            // }

        // If we don't match the above, then just place the entry into the array
        } else if (
            ingredientArr[i].unit !== ingredientArr[i-1].unit) {
                finalArr.push({...ingredientArr[i]})
        }
    }
    return finalArr
    // return unitCombine(finalArr)
}

console.log(groceryList(groceryListPracticeData))

export default groceryList

