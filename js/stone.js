export class Stone {
    constructor (x, y, id) {
        this.x = x
        this.y = y
        this.id = id
        this.offset = getRandomOffset()
        this.velocity = {x: 0, y: 0}
    }

    get position () {
        return {x: this.x, y: this.y}
    }
}

function getRandomOffset () {
    let x = negTenToTen()
    let y = negTenToTen()

    while (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) > 10) {
        x = negTenToTen()
        y = negTenToTen()
    }

    return {x, y}
}

function negTenToTen () {
    return (Math.random() * 20) - 10
}
