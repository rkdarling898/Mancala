export class MancalaRenderer {
    #backgroundColor = "white"
    #lineColor = "black"
    
    constructor (canvas) {
        this.canvas = canvas.element
        this.ctx = canvas.ctx
        this.objects = new Map()
    }

    drawBoard () {
        const board = getBoardSize(this.canvas.width, this.canvas.height)

        this.ctx.fillStyle = this.#backgroundColor
        this.ctx.strokeStyle = this.#lineColor

        this.ctx.beginPath()
        this.ctx.roundRect(board.x, board.y, board.width, board.height, board.radii)
        this.ctx.stroke()
        this.ctx.fill()
        this.ctx.closePath()

        // Draw pits and stores

        for (let i = 0; i < 8; i++) {
            this.ctx.beginPath()
            this.ctx.arc(board.x + (33.75 * i) + (33.75 * (i + 1)) + (20 * i) + 20, board.y + 33.75 + 20, 33.75, 0, Math.PI * 2)
            this.ctx.stroke()
            this.ctx.closePath()
        }
    }

    drawStones () {
        // I'll get to you soon bitch
    }

    render () {
        this.drawBoard()
    }
}

// Helper functions

function getBoardSize (width, height) {
    const wMargin = width/20
    const hMargin = height * 0.23
    
    return {
        x: wMargin,
        y: hMargin,
        width: width - (wMargin * 2),
        height: height - (hMargin * 2),
        radii: wMargin/2
    }
}