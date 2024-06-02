import { Pit } from "./pit.js"

export class Board {
    constructor () {
        this.pits = [
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
}