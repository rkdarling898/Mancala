export class MancalaRenderer {
    #backgroundColor = "white"
    #lineColor = "black"
    #scale = 1
    
    constructor (ctx) {
        this.ctx = ctx
    }

    drawBoard (bData) {
        const board = bData.getBoardSpecs(this.#scale)
        const radius = 45 * this.#scale
        const margin = 20 * this.#scale

        this.ctx.fillStyle = this.#backgroundColor
        this.ctx.strokeStyle = this.#lineColor

        this.ctx.beginPath()
        this.ctx.roundRect(board.x, board.y, board.width, board.height, board.radii)
        this.ctx.stroke()
        this.ctx.fill()
        this.ctx.closePath()
        
        this.drawPits(bData.pits, {height: board.height/2, radius, margin})
    }

    drawCircle (x, y, radius) {
        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, 0, Math.PI * 2)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawPits (pitArray, {height, radius, margin}) {
        pitArray.forEach(pit => pit.type === 'store' ? 
            this.drawStore(pit.x * this.#scale, pit.y * this.#scale, radius, height - margin) :
            this.drawCircle(pit.x * this.#scale, pit.y * this.#scale, radius)
        )
    }

    drawStones (bData) {
        const pitRadius = 45 * this.#scale

        bData.stones.forEach(stone => {
            this.drawCircle(stone.x * this.#scale, stone.y * this.#scale, pitRadius/4)
        });
    }

    drawStore (x, y, radiusX, radiusY) {
        this.ctx.beginPath()
        this.ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    render (bData) {
        this.drawBoard(bData)
    }

    set scale (newScale) {
        if (isNaN(newScale) || newScale == undefined || newScale < 0.5) {
            console.error(`Invalid scale "${newScale}" was used. Please use a number greater than .5`)
        }

        this.#scale = newScale
    }
}

// Helper functions