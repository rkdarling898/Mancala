import { Board } from "./board.js"
import { getScale, scaleCanvas } from "./canvasScaling.js"
import { gameClickHandler } from "./clickEvent.js"
import { renderBoard } from "./mancalaRender.js"

// Global variables

const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

const board = new Board()

let scale
const clickHandler = gameClickHandler(board, canvas)

size()

// Event Listeners

addEventListener('resize', size)
canvas.addEventListener('click', clickHandler)

// Main code

mainLoop()

window.board = board

// Functions

function mainLoop () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update function
    
    renderBoard(ctx, board, scale)

    requestAnimationFrame(mainLoop)
}

function size () {
    scale = getScale(canvas)
    scaleCanvas(canvas, scale)
}