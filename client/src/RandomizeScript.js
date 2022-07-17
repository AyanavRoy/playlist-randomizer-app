//Implementation of the Fisher-Yates Shuffling Algorithm, found here: https://en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

async function randomizeScript(playlistIds) {
    let inputArray = [];
    try {
        const setOfIds = playlistIds.split(',')
        for (const id of setOfIds) {
            const idMinusSpaces = id.replace(/\s/g, '')
            let res = await fetch(`http://localhost:1337/api/youtube/${idMinusSpaces}`)
            const data = await res.json()
            inputArray = inputArray.concat(data)
            
        }
        shuffleArray(inputArray)
        return inputArray.join(',')
    } catch (err) {
        return undefined;
    }
}

export default randomizeScript