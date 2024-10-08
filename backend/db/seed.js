import bcrypt from 'bcrypt'
import { User, UserRecipe, Recipe, RecipeIngredient, MeasurementUnit, MeasurementQuantity, Ingredient, Week, Day, WeekMeal, db} from 'model.js'

console.log('Syncing database...')
await db.sync({ force: true })

console.log('Seeding database...')

// // Creation of Users in DB
const usersToCreate = []
const fakeUserFirst = [John, Barbara, Penny]
const fakeUserLast = 'Danger'
const password = 'test'
let hashedPassword

// Creates 3 users to add
for (let i = 0; i < 3; i++) {
    const username = `user${i}`
    usersToCreate.push(User.create({ 
        firstName: fakeUserFirst[i],
        lastName: fakeUserLast,
        userName: username,
        password: password,
    }))
}
// Creates the Admin User
usersToCreate.push(User.create({
    firstName: 'Admin',
    lastName: 'Istrator',
    userName: '1',
    password: 'test',
}))
// Actually creates the user entries and places them within the DB
const usersInDB = await Promise.all(usersToCreate)
