export class MancalaRenderer {
    #backgroundColor = "white"
    #lineColor = "black"
    
    constructor (ctx) {
        this.ctx = ctx
    }

    drawBoard (bData) {
        const board = bData.getBoardSpecs()
        const radius = bData.getPitRadius()
        const margin = bData.getPitMargin()
        let pit

        this.ctx.fillStyle = this.#backgroundColor
        this.ctx.strokeStyle = this.#lineColor

        this.ctx.beginPath()
        this.ctx.roundRect(board.x, board.y, board.width, board.height, board.radii)
        this.ctx.stroke()
        this.ctx.fill()
        this.ctx.closePath()

        // Draw pits and stores
        bData.updatePitLocations()
        
        for (let i = 0; i < 14; i++) {
            pit = bData.pits[i]

            if (pit.id % 7 === 0) {
                this.drawStore(pit.x, pit.y, radius, board.height/2 - margin)
                continue
            }

            this.drawCircle(pit.x, pit.y, radius)
        }

    }

    drawCircle (x, y, radius) {
        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, 0, Math.PI * 2)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawStones (bData) {
        const radius = bData.getPitRadius() / 4

        bData.stones.forEach(stone => {
            this.drawCircle(stone.x, stone.y, radius)
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
}

// Helper functions