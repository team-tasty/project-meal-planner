import { User, UserRecipe, Recipe } from "../backend/db/model.js";
import { Op } from "sequelize";

const getExternalIds = async (userId) => {
  const externalIds = await User.findByPk(userId, {
    attributes: ['userId'],
    include: [
      {
        model: UserRecipe,
        attributes: ['userRecipeId'],
        include: [
          {
            model: Recipe,
            where: {
              externalRecipeId: {
                [Op.not]: null
              }
            },
            attributes: ["externalRecipeId"],
          },
        ],
      },
    ],
  });

  if (externalIds.userRecipes.length === 0) {
    return {
      message: `No saved recipes found for this user`,
      success: false
    }
  }

  return {
    success: true,
    externalIds: externalIds.userRecipes
  }
};

export default getExternalIds;