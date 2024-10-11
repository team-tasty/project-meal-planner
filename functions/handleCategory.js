// List of words to check, already placed into Regex for readability of functionality

const processedRegex = new RegExp (/process|mashed/i)
const produceRegex = new RegExp (/(lentils|apple|banana|pear|orange|lemon|lime|grapefruit|watermelon|cantaloupe|honeydew|strawberry|blueberry|raspberry|blackberry|grape|cherry|peach|plum|nectarine|kiwi|pineapple|mango|avocado|papaya|passionfruit|pomegranate|dragonfruit|coconut|tomato|cucumber|lettuce|spinach|arugula|romaine|iceberg|cabbage|broccoli|cauliflower|carrot|potato|zucchini|squash|pumpkin|eggplant|pepper|jalapeno|habanero|onion|scallion|shallot|garlic|ginger|radish|beet|turnip|parsnip|brussels sprouts|asparagus|celery|corn|mushroom|leek|fennel|artichoke|peas|green beans|okra|rhubarb|radicchio|endive|chicory|basil|parsley|cilantro|rosemary|thyme|oregano|chives|tarragon|bay leaves|lemongrass|watercress)/i)
const dairyRegex = new RegExp (/(whole milk|skim milk|low fat milk|2% milk|heavy cream|whipping cream|half and half|buttermilk|yogurt|greek yogurt|cream cheese|cottage cheese|sour cream|butter|cheddar|mozzarella|parmesan|provolone|swiss|american cheese|gouda|blue cheese|goat cheese|ricotta|monterey jack|pepper jack|colby|havarti|gruyere|camembert|halloumi|mascarpone|quark|paneer|queso fresco|queso blanco|whey|curds)/i)
const proteinRegex = new RegExp (/(chicken breast|chicken thigh|chicken drumstick|whole chicken|ground chicken|ground beef|steak|ribeye|sirloin|tenderloin|roast beef|pork chop|pork tenderloin|ground pork|bacon|sausage|ground turkey|turkey breast|ground lamb|lamb chop|venison|rabbit|goat|bison|buffalo|veal|salmon|tuna|tilapia|halibut|trout|sardine|mackerel|catfish|haddock|flounder|shrimp|prawn|lobster|crab|scallop|oyster|clam|mussel|octopus|squid|calamari|tofu|tempeh|seitan|edamame|hummus|quinoa|egg| ham)/i)
const bakingRegex = new RegExp (/(flour|cornmeal| powder| soda| oil|yeast|granulated sugar|brown sugar|light brown sugar|dark brown sugar|powdered sugar|confectioners sugar|icing sugar|honey|syrup|molasses|vanilla extract|almond extract|cocoa powder|chocolate chips|semi sweet chocolate|unsweetened chocolate|bittersweet chocolate|white chocolate|milk chocolate|shredded coconut|margarine|shortening|lard|salt|cinnamon|nutmeg|ginger|cloves|allspice|pumpkin spice|baking spice|cardamom|vanilla bean|cream of tartar|cornstarch|gelatin|pudding mix|custard powder|evaporated milk|condensed milk|almond milk|soy milk|oat milk|rice milk|coconut milk|pudding)/i)

const handleCategory = (convertedArr) => {
    for (let i=0; i < convertedArr.length; i++) {
        if (
            convertedArr[i].ingredient.match(/canned/i) || 
            convertedArr.unit === "can" || 
            convertedArr.unit === "cans"
        ) {
            convertedArr[i].category = "canned"
        } else if (
            convertedArr[i].ingredient.match(/frozen/i) || 
            convertedArr.unit === "frozen"
        ) {
            convertedArr[i].category = "frozen"
        } else if (
            convertedArr[i].ingredient.match(processedRegex)
        ) {
            convertedArr[i].category = "processed"
        } else if (
            convertedArr[i].ingredient.match(bakingRegex) || 
            convertedArr[i].ingredient === "sugar" ||
            convertedArr[i].ingredient === "pepper" ||
            convertedArr[i].ingredient === "black pepper"
        ) {
            convertedArr[i].category = "baking"
        } else if (
            convertedArr[i].ingredient.match(produceRegex) || 
            convertedArr[i].ingredient === "kale" || 
            convertedArr[i].ingredient === "yam" || 
            convertedArr[i].ingredient === "dill" || 
            convertedArr[i].ingredient === "mint" || 
            convertedArr[i].ingredient === "sage"
        ) {
            convertedArr[i].category = "produce"
        } else if (
            convertedArr[i].ingredient.match(dairyRegex) || 
            convertedArr[i].ingredient === "milk" || 
            convertedArr[i].ingredient === "cream" || 
            convertedArr[i].ingredient === "ghee" || 
            convertedArr[i].ingredient === "feta" || 
            convertedArr[i].ingredient === "bree" || 
            convertedArr[i].ingredient === "cheese"
        ) {
            convertedArr[i].category = "dairy"
        } else if (
            convertedArr[i].ingredient.match(proteinRegex) || 
            convertedArr[i].ingredient === "chicken" || 
            convertedArr[i].ingredient === "beef" || 
            convertedArr[i].ingredient === "pork" ||  
            convertedArr[i].ingredient === "turkey" || 
            convertedArr[i].ingredient === "duck" || 
            convertedArr[i].ingredient === "lamb" || 
            convertedArr[i].ingredient === "fish" || 
            convertedArr[i].ingredient === "cod" || 
            convertedArr[i].ingredient === "bass"
        ) {
            convertedArr[i].category = "protein"
        } else {
            convertedArr[i].category = "other"
        }
    }
    return convertedArr
}

export default handleCategory