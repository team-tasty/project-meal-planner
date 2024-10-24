// List of words to check, already placed into Regex for readability of functionality
const prelimRegex = new RegExp (/( stock|ketchup|catsup| jam| jelly|peanut butter)/i)
const processedRegex = new RegExp (/process|mashed/i)
const produceRegex = new RegExp (/(lentils|apple|banana|pear|orange|lemon|lime|grapefruit|watermelon|cantaloupe|honeydew|strawberr|blueberr|raspberr|blackberr|grape|cherr|peach|plum|nectarine|kiwi|pineapple|mango|raisin|avocado|papaya|passionfruit|pomegranate|dragonfruit|coconut|tomato|cucumber|lettuce|spinach|arugula|romaine|iceberg|cabbage|broccoli|cauliflower|carrot|potato|zucchini|squash|pumpkin|eggplant|pepper|jalapeno|habanero|onion|scallion|shallot|garlic|ginger|radish|beet|turnip|parsnip|brussels sprouts|asparagus|celery|corn|mushroom|leek|fennel|artichoke|peas| green beans|okra|rhubarb|radicchio|endive|chicory|basil|parsley|cilantro|coriander|rosemary|thyme|oregano|chives|tarragon|bay leaf|bay leaves|lemongrass|watercress|apricot|swede|celeriac|currant| nut|pecan|almond|cashew|walnut|hazelnut|pistachio|peanut| fruit|ackee|tamarind|scotch bonnet|chilli)/i)
const dairyRegex = new RegExp (/(whole milk|skim milk|low fat milk|2% milk|heavy cream|double cream|whipping cream|half and half|buttermilk|yogurt|greek yogurt|cream cheese|cottage cheese|sour cream|butter|cheddar|mozzarella|parmesan|provolone|swiss|american cheese|gouda|blue cheese|goat cheese|ricotta|monterey jack|pepper jack|colby|havarti|gruyere|camembert|halloumi|mascarpone|quark|paneer|queso fresco|queso blanco|whey|curds|gruy[èe]re)/i)
const proteinRegex = new RegExp (/(chickens|chicken breast|chicken thigh|chicken drumstick|whole chicken|ground chicken|ground beef|steak|ribeye|sirloin|tenderloin|roast beef|pork chop|pork tenderloin|ground pork|bacon|sausage|ground turkey|turkey breast|ground lamb|lamb chop|venison|rabbit|goat|bison|buffalo|veal|salmon|tuna|tilapia|halibut|trout|sardine|mackerel|catfish|haddock|flounder|shrimp|prawn|lobster|crab|scallop|oyster|clam|mussel|octopus|squid|calamari|tofu|tempeh|seitan|edamame|hummus|quinoa|egg| ham|chorizo|brisket|beef|loin chops| fish| cod)/i)
const bakingRegex = new RegExp (/(flour|cornmeal| powder| soda| oil|yeast|granulated sugar| sugar|brown sugar|light brown sugar|dark brown sugar|powdered sugar|confectioners sugar|icing sugar|honey|syrup|molasses|vanilla extract|almond extract|cocoa powder|chocolate chips|semi sweet chocolate|unsweetened chocolate|bittersweet chocolate|white chocolate|milk chocolate|shredded coconut|margarine|shortening|lard| salt|cinnamon|nutmeg|ginger|cloves|all ?spice|pumpkin spice|baking spice|cardamom|vanilla bean|cream of tartar|cornstarch|gelatin|pudding mix|custard powder|evaporated milk|condensed milk|almond milk|soy milk|oat milk|rice milk|coconut milk|pudding|vinegar|cumin|star anise|mixed spice)/i)

const handleCategory = (convertedArr) => {
    for (let i=0; i < convertedArr.length; i++) {
        if (convertedArr[i].ingredient.match(prelimRegex) || convertedArr[i].unit.match(prelimRegex)
        ) {
            convertedArr[i].category = "other"
        } else if (
            convertedArr[i].ingredient.match(/(canned| cans?$| tins?$)/i) ||
            convertedArr[i].unit.match(/(canned|cans? |tins? | cans?$| tins?$)/i) ||
            convertedArr.unit === "can" || 
            convertedArr.unit === "cans" ||
            convertedArr.unit === "tin" ||
            convertedArr.unit === "tins"
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
            convertedArr[i].ingredient === "black pepper"  ||
            convertedArr[i].ingredient === "clove" ||
            convertedArr[i].ingredient === "salt"
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