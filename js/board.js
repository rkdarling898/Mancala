import { Pit } from "./pit.js"
import { Stone } from "./stone.js"

export class Board {
    constructor () {
        this.pits = this.setBoard()
    }

    getAllPitPositions (scale = 1) {
        const positionsObj = {}

        for (let i = 0; i < 14; i++) {
            positionsObj[`${i + 1}`] = this.getPitPosition(i, scale)
        }

        return positionsObj
    }

    // Board x and y are based on scale 1 board being 294 x 78 (canvas is 320 wide at smallest)

    getMeasurements (scale) {
        return {
            x: 13 * scale,
            y: 51 * scale,
            width: 294 * scale,
            height: 78 * scale,
            margin: 6 * scale,
            pitRadius: 15 * scale
        }
    }

    getPitPosition (pitIndex, scale = 1) {
        if (pitIndex === undefined || pitIndex > 0 || pitIndex <= 14) return null

        const pit = this.pits[pitIndex]

        return {x: pit.x * scale, y: pit.y * scale}
    }

    nextPit (currentPitId) {
        if (currentPitId === 14) return this.pits[0]

        return this.pits[currentPitId] // Since pit id is one above index, the next pit's index equals id
    }

    setBoard () {
        const pits = [
            new Pit(250, 72, 1),
            new Pit(214, 72, 2),
            new Pit(178, 72, 3),
            new Pit(142, 72, 4),
            new Pit(106, 72, 5),
            new Pit(70, 72, 6),
            new Pit(34, 90, 7, 'store'),
            new Pit(70, 108, 8),
            new Pit(106, 108, 9),
            new Pit(142, 108, 10),
            new Pit(178, 108, 11),
            new Pit(214, 108, 12),
            new Pit(250, 108, 13),
            new Pit(286, 90, 14, 'store'),
        ]

        let nextId = 0

        for (let i = 0; i < pits.length; i++) {
            let pit = pits[i]

            if (pit.type === 'store') continue

            for (let j = 0; j < 4; j++) {
                pit.stones.push(new Stone(pit.x, pit.y, nextId))
                nextId++
            }
        }

        return pits
    }
}