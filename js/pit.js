export class Pit {
    constructor (id, x, y, type = "pit") {
        this.id = id
        this.type = type
        this.x = x
        this.y = y
        this.stones = new Map()
    }
}