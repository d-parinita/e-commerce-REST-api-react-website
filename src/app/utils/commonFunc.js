export const getPrice = (prices) => {
    let lowestPrice = prices[0]?.price
    for (let i = 0; i < prices.length; i++) {
        if (prices[i].price < lowestPrice) {
            lowestPrice = prices[i].price
        }
    }
    return lowestPrice
}
