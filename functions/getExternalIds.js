import { User, UserRecipe, Recipe } from "../backend/db/model.js";
import { Op } from "sequelize";
import getUserRecipes from "./getUserRecipes.js";

const getExternalIds = async (userId) => {
  // Get user recipes data and recipe ids from TheMealDb (for user saved status on recipes page)
  const userRecipeResObj = await getUserRecipes(userId);

  if (!userRecipeResObj.success) {
    return {
      message: `Error when getting userRecipes from db`,
      success: false,
    }
  }

  try {
    const externalIds = await User.findByPk(userId, {
      attributes: ["userId"],
      include: [
        {
          model: UserRecipe,
          attributes: ["userRecipeId"],
          include: [
            {
              model: Recipe,
              where: {
                externalRecipeId: {
                  [Op.not]: null,
                },
              },
              attributes: ["externalRecipeId"],
            },
          ],
        },
      ],
    });

    // Returns object to be used for response object (Message will be added by individual controller functions)
    return {
      success: true,
      externalIds: externalIds.userRecipes,
      updatedUserRecipes: userRecipeResObj.userRecipes
    };
  } catch (error) {
    console.error(error);

    return {
      message: `Error when getting external ids from db`,
      success: false,
    };
  }
};

export default getExternalIds;
