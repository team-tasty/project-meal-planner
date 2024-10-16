import getUserWeeks from "../../functions/getUserWeeks.js";
import groceryList from "../../functions/groceryList.js";
import { User } from "../db/model.js";

export const gListFns = {
  groceryList: async (req, res) => {
    const userId = req.session.userId;

    if (!userId) {
      return res.send({
        message: `No user in session`,
        success: false,
      });
    }

    const { weekId } = req.params;

    let objRecipes;

    try {
      objRecipes = await getUserWeeks(userId, weekId);
    } catch (error) {
      console.log();
      console.error(error);
      console.log();

      return res.send({
        message: `Error when getting userWeeks data`,
        success: false,
      });
    }

    let groceryListData;

    try {
      groceryListData = groceryList(objRecipes);
    } catch (error) {
      console.log();
      console.error(error);
      console.log();

      return res.send({
        message: `Error when invoking groceryList fn`,
        success: false,
      });
    }

    return res.send({
      message: `Successfully created grocery list data`,
      success: true,
      groceryList: groceryListData,
    });
  },
};
