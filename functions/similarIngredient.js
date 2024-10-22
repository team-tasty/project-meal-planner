import levenshtein from "js-levenshtein"

const similarIngredient = (str1, str2, threshold = 1.5) => {
    // tokenize, or split the string into words for comparison
    const tokens1 = str1.split(/\s+/)
    const tokens2 = str2.split(/\s+/)
    // Check if tokenized versions contain matching tokens
    const allTokensMatch = tokens1.every(token1 => {
        return tokens2.some(token2 => {
            return levenshtein(token1, token2) <= threshold
        })
    })
    // return true if the token-based match is close enough
    return allTokensMatch
}

console.log(similarIngredient("leek", "bay leaf", 1.5))

export default similarIngredient