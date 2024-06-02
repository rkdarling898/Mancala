import { Board } from "./board.js"
import { getScale, scaleCanvas } from "./canvasScaling.js"
import { renderBoard } from "./mancalaRender.js"

// Global variables

const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')
const gameLoop = mainLoop()

let scale

size()

// Event Listeners

addEventListener('resize', size)

// Main code

gameLoop()

// Functions

function mainLoop () {
    // Variables
    const board = new Board()

    function loop () {
        renderBoard(ctx, board, scale)
    }

    return loop
}

function size () {
    scale = getScale(canvas)
    scaleCanvas(canvas, scale)
}