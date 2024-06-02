export class Pit {
    constructor (x, y, id, type = 'pit') {
        this.x = x
        this.y = y
        this.id = id
        this.type = type
        this.stones = []
    }

    get position () {
        return {x: this.x, y: this.y}
    }
}