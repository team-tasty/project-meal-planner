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

    // Get user weeks data (if weekId is not provided, it will get data for all weeks of that user)
    try {
      objRecipes = await getUserWeeks(userId, weekId);
    } catch (error) {
      console.error(error);

      return res.send({
        message: `Error when getting userWeeks data`,
        success: false,
      });
    }

    let groceryListData;

    // Generate grocery list to send in response
    // (Might be better to have frontend run groceryList fn to reduce work done in the backend)
    try {
      groceryListData = groceryList(objRecipes);
    } catch (error) {
      console.error(error);

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
