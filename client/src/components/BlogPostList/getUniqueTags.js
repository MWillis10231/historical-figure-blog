export function getUniqueTags(array) {
    let uniqueArray = [];
    array.forEach(arr => {
        arr.forEach(element => {
            if (uniqueArray.includes(element)) {
                return
            } else {
                uniqueArray.push(element)
            }
        })
    });
    return uniqueArray;
}