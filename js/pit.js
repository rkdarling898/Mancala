export class Pit {
    constructor (id, type = "pit") {
        this.id = id
        this.type = type
        this.x = undefined
        this.y = undefined
        this.stones = new Map()
    }
}