const getRandomInt = (min, max) => {
    return ~~((max - min + 1)*Math.random()) + min;
}

const getColor = (value) => {
    return `rgb(${~~(value*25)}, ${255 - ~~(value*25)}, 0)`;
}

export {getRandomInt, getColor}