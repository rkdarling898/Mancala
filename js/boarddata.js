import { Pit } from "./pit.js"
import { Stone } from "./stone.js"

export class BoardData {
    constructor (canvas) {
        this.canvas = canvas.element
        this.pits = [
            new Pit(1, 775, 180),
            new Pit(2, 665, 180),
            new Pit(3, 555, 180),
            new Pit(4, 445, 180),
            new Pit(5, 335, 180),
            new Pit(6, 225, 180),
            new Pit(7, 115, 250, 'store'),
            new Pit(8, 225, 320),
            new Pit(9, 335, 320),
            new Pit(10, 445, 320),
            new Pit(11, 555, 320),
            new Pit(12, 665, 320),
            new Pit(13, 775, 320),
            new Pit(14, 885, 250, 'store'),
        ]
        this.stones = initStoneArray()
    }

    getBoardSpecs (scale = 1) {
        return {
            x: 50 * scale,
            y: 115 * scale,
            width: 900 * scale,
            height: 270 * scale,
            radii: (50/3) * scale
        }
    }
}

function initStoneArray () {
    const array = []
            
    for (let i = 0; i < 48; i++) {
        array.push(new Stone(i))
    }

    return array
}

function getStonePosition (pit) {

}