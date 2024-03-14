export class Stone {
    #velocity = {x: 0, y: 0}

    constructor (id) {
        this.id = id
        this.x = 0
        this.y = 0
    }

    get velocity () {
        return this.#velocity
    }

    set velocity (velocityObj) {
        if (typeof(velocityObj) !== 'object') return

        const velXQualifies = (!isNaN(velocityObj.x) || typeof(velocityObj.x) === 'number')
        const velYQualifies = (!isNaN(velocityObj.y) || typeof(velocityObj.y) === 'number')

        if (velXQualifies && velYQualifies) {
            this.#velocity.x = velocityObj.x
            this.#velocity.y = velocityObj.y
        }
    }
}