export class MancalaRenderer {
    #backgroundColor = "white"
    #lineColor = "black"
    
    constructor (canvas) {
        this.canvas = canvas.element
        this.ctx = canvas.ctx
        this.objects = new Map()
    }

    drawBoard () {
        const board = sizeBoard(this.canvas.width, this.canvas.height) // getBoardSize???

        this.ctx.fillStyle = this.#backgroundColor
        this.ctx.strokeStyle = this.#lineColor

        this.ctx.beginPath()
        this.ctx.roundRect(board.x, board.y, board.width, board.height, board.radii)
        this.ctx.stroke()
        this.ctx.fill()
        this.ctx.closePath()
    }

    drawPits () {
        // SVG possibly???
    }

    drawStones () {
        // I'll get to you soon bitch
    }

    render () {
        this.drawBoard()
    }
}

// Helper functions

function sizeBoard (width, height) {
    const wMargin = width/15
    const hMargin = height/6
    
    return {
        x: wMargin,
        y: hMargin,
        width: width - (wMargin * 2),
        height: height - (hMargin * 2),
        radii: wMargin/2
    }
}