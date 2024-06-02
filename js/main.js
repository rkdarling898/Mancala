import { Board } from "./board.js"
import { getScale, scaleCanvas } from "./canvasScaling.js"
import { renderBoard } from "./mancalaRender.js"

// Global variables

const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

const board = new Board()
const gameLoop = mainLoop()

let scale

size()

// Event Listeners

addEventListener('resize', size)

// Main code

gameLoop()

window.board = board

// Functions

function mainLoop () {
    // Variables

    function loop () {
        renderBoard(ctx, board, scale)
    }

    return loop
}

function size () {
    scale = getScale(canvas)
    scaleCanvas(canvas, scale)

    renderBoard(ctx, board, scale)
}