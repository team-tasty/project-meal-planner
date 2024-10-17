import bcryptjs from 'bcryptjs'
import { User, UserRecipe, Recipe, RecipeIngredient, MeasurementUnit, MeasurementQuantity, Ingredient, Week, Day, WeekMeal, db} from './model.js'
import seedRecipeData from './seedRecipeData.js'
import convertIngredient from '../../functions/parseIngredient.js'

console.log('Syncing database...')
await db.sync({ force: true })

console.log('Seeding database...')

// // Creation of Users in DB
const fakeUserFirst = ['John', 'Barbara', 'Penny']
const fakeUserLast = 'Danger'
// const password = 'test'
let hashedPassword = bcryptjs.hashSync("test", bcryptjs.genSaltSync(10))

// Creates 3 users to add
for (let i = 0; i < 3; i++) {
    const username = `user${i}`
    const newUser = await User.create({ 
        firstName: fakeUserFirst[i],
        lastName: fakeUserLast,
        userName: username,
        password: hashedPassword,
    })

    const newWeek = await Week.create({
        userId: newUser.userId
    })
}
// Creates the Admin User
const admin = await User.create({
    firstName: 'Admin',
    lastName: 'Istrator',
    userName: '1',
    password: hashedPassword,
})

const adminWeek1 = await Week.create({
    userId: admin.userId,
})

const adminWeek2 = await Week.create({
    userId: admin.userId,
})

// Add the Days to our DB
for (let i = 1; i <= 7; i++) {
    await Day.create({
        day: `Day ${i}`
    })
}

// Add 8 recipes to the DB
const recipeData = seedRecipeData.meals
let recipeCreated
let ingredientCreated
let measurementQuantityCreated
let measurementUnitCreated

for (let i=0; i < recipeData.length; i++) {
    // Basic recipe info
    let userCalc = Math.floor((i/2) + 1)
    recipeCreated = await Recipe.create({
        externalRecipeId: recipeData[i].idMeal,
        title: recipeData[i].strMeal,
        instruction: recipeData[i].strInstructions,
        image: recipeData[i].strMealThumb,
        category: recipeData[i].strCategory,
        area: recipeData[i].strArea,
        tag: recipeData.strTags
    })
    // Create userRecipe connections
    await UserRecipe.create({
        userId: userCalc,
        recipeId: recipeCreated.recipeId,
    })
    // Basic ingredient info, measurement info, parsing, and relationship creation on RecipeIngredient
    for (let j=1; j <= 20; j++) {
        let ingredient = `strIngredient${j}`
        let measurement = `strMeasure${j}`
        if (recipeData[i][ingredient]) {
            const measureParsed = convertIngredient(recipeData[i][measurement])
            ingredientCreated = await Ingredient.create({
                ingredient: recipeData[i][ingredient].toLowerCase()
            })
            measurementQuantityCreated = await MeasurementQuantity.create({
                quantity: measureParsed[0]
            })
            measurementUnitCreated = await MeasurementUnit.create({
                unit: measureParsed[1]
            })
            await RecipeIngredient.create({
                recipeId: recipeCreated.recipeId,
                ingredientId: ingredientCreated.ingredientId,
                measurementQuantityId: measurementQuantityCreated.measurementQuantityId,
                measurementUnitId: measurementUnitCreated.measurementUnitId,
            })
        } else {
            break
        }
    }

    if (userCalc === 1) {
        await WeekMeal.create({
            weekId: 1,
            dayId: 2,
            recipeId: recipeCreated.recipeId,
        })
    } else if (userCalc === 2) {
        if (recipeCreated.recipeId === 3) {
            await WeekMeal.create({
                weekId: 2,
                dayId: 1,
                recipeId: recipeCreated.recipeId,
            })
        } else {
            await WeekMeal.create({
                weekId: 2,
                dayId: 6,
                recipeId: recipeCreated.recipeId,
            })
        }
    } else if (userCalc === 3) {
        await WeekMeal.create({
            weekId: 3,
            dayId: 4,
            recipeId: recipeCreated.recipeId,
        })
    } else {
        if (recipeCreated.recipeId === 7) {
            await WeekMeal.create({
                weekId: 4,
                dayId: 1,
                recipeId: recipeCreated.recipeId,
            })
        } else {
            await WeekMeal.create({
                weekId: 5,
                dayId: 6,
                recipeId: recipeCreated.recipeId,
            })
        }
    }
}

await db.close()
console.log('Finished seeding database!')

