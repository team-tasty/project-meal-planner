import bcryptjs from 'bcryptjs'
import { User, UserRecipe, Recipe, RecipeIngredient, MeasurementUnit, MeasurementQuantity, Ingredient, Week, Day, WeekMeal, db} from './model.js'

console.log('Syncing database...')
await db.sync({ force: true })

console.log('Seeding database...')

// // Creation of Users in DB
// const usersToCreate = []
const fakeUserFirst = ['John', 'Barbara', 'Penny']
const fakeUserLast = 'Danger'
const password = 'test'
let hashedPassword

// Creates 3 users to add
for (let i = 0; i < 3; i++) {
    const username = `user${i}`
    await User.create({ 
        firstName: fakeUserFirst[i],
        lastName: fakeUserLast,
        userName: username,
        password: password,
    })
}
// Creates the Admin User
await User.create({
    firstName: 'Admin',
    lastName: 'Istrator',
    userName: '1',
    password: 'test',
})

await db.close()
console.log('Finished seeding database!')

