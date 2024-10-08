import { DataTypes, Model } from "sequelize";
import util from 'util'
import url from 'url'
import connectToDB from "./db.js";

export const db = await connectToDB('postgresql:///meal_planner')

export class User extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    },
    {
        modelName: 'user',
        sequelize: db,
    }
)

export class UserRecipe extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

UserRecipe.init(
    {
        userRecipeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    },
    {
        modelName: 'userRecipe',
        sequelize: db,
    }
)

export class Recipe extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

Recipe.init(
    {
        recipeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,            
        },
        instruction: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
        },
        area: {
            type: DataTypes.STRING,
        },
        tag: {
            type: DataTypes.STRING,
        }
    },
    {
        modelName: 'recipe',
        sequelize: db,
    }
)

export class RecipeIngredient extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

RecipeIngredient.init(
    {
        recipeIngredientId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    },
    {
        modelName: 'recipeIngredient',
        sequelize: db,
    }
)

export class MeasurementUnit extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

MeasurementUnit.init(
    {
        measurementUnitID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        unit: {
            type: DataTypes.STRING,
        },
    },
    {
        modelName: 'measurementUnit',
        sequelize: db,
    }
)

export class MeasurementQuantity extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

MeasurementQuantity.init(
    {
        measurementQuantityId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        modelName: 'measurementQuantity',
        sequelize: db,
    }
)

export class Ingredient extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

Ingredient.init(
    {
        ingredientId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ingredient: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        modelName: 'ingredient',
        sequelize: db,
    }
)

export class Week extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

Week.init(
    {
        weekId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    },
    {
        modelName: 'week',
        sequelize: db,
    }
)

export class Day extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

Day.init(
    {
        dayId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        day: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        modelName: 'day',
        sequelize: db,
    }
)

export class WeekMeal extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}

WeekMeal.init(
    {
        weekMealId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    },
    {
        modelName: 'weekMeal',
        sequelize: db,
    }
)

// Relationships here

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
    console.log('Syncing database...');
    await db.sync();
    console.log('Finished syncing database!');
  }