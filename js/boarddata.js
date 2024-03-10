import { Pit } from "./pit.js"

export class BoardData {
    constructor (canvas) {
        this.canvas = canvas.element
        this.pits = [
            new Pit(1),
            new Pit(2),
            new Pit(3),
            new Pit(4),
            new Pit(5),
            new Pit(6),
            new Pit(7, 'store'),
            new Pit(8),
            new Pit(9),
            new Pit(10),
            new Pit(11),
            new Pit(12),
            new Pit(13),
            new Pit(14, 'store'),
        ]
    }

    getBoardSpecs () {
        const wMargin = this.canvas.width/20
        const hMargin = this.canvas.height * 0.23
        
        return {
            x: wMargin,
            y: hMargin,
            width: this.canvas.width - (wMargin * 2),
            height: this.canvas.height - (hMargin * 2),
            radii: wMargin/3
        }
    }

    getPitRadius () {
        return this.canvas.width * 0.045
    }

    getPitMargin () {
        return this.canvas.width/50
    }

    updatePitLocations () {
        const board = this.getBoardSpecs()
        const margin = this.getPitMargin()
        const radius = this.getPitRadius()

        this.pits.forEach(pit => setPitLocation(pit, board, margin, radius))
    }
}

function setPitLocation (pit, board, margin, radius) {
    if (pit.id % 7 === 0) return setStoreLocation(pit, board, margin, radius)

    const multiplier = pit.id < 7 ? (7 - pit.id) : (pit.id - 7)
    const height = pit.id < 7 ? board.y + radius + margin : board.y + board.height - radius - margin

    pit.x = board.x + (radius * multiplier) + (radius * (multiplier + 1)) + (margin * multiplier) + margin
    pit.y = height
}

function setStoreLocation (pit, board, margin, radius) {
    pit.x = pit.id === 7 ? board.x + margin + radius : board.x + board.width - radius - margin
    pit.y = board.y + (board.height/2)
}