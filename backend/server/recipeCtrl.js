import axios from "axios";
import { User } from "../db/model.js";

export const recipeFns = {
  recipeSearch: async (req, res) => {
    console.log();
    console.log('request received')
    console.log();

    const userId = req.session.userId;

    // TODO: uncomment once fn is complete
    // if (!userId) {
    //   return res.send({
    //     message: 'No user in session',
    //     success: false
    //   });
    // };

    const { searchInput } = req.body;

    const searchRes = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);

    console.log(`themealdb API response:`, searchRes.data)

    res.send({
      message: 'request was successful',
      recipeData: searchRes.data
    });
  }
};