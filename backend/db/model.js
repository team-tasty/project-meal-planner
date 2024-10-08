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
        }
    }
)