export class Canvas {
    #width = 300
    #height = 300

    constructor (canvas) {
        this.element = canvas // Later go in and change this to a getter to validate canvas
        this.ctx = canvas.getContext("2d")
    }

    set size ({width, height}) {
        if  (!isNaN(width) || Number(width) > 10) {
            this.#width = width
            this.element.width = this.#width
        }

        if  (!isNaN(height) || Number(height) > 10) {
            this.#height = height
            this.element.height = this.#height
        }
    }

    get width () {
        return this.#width
    }

    get height () {
        return this.#height
    }
}