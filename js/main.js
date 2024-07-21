import { Board } from "./board.js"
import { getScale, scaleCanvas } from "./canvasScaling.js"
import { gameClickHandler } from "./clickEvent.js"
import { renderBoard, update } from "./mancalaRender.js"
import { deltaClosure } from "./utils.js"

// Global variables

const canvas = document.getElementById('game-canvas')
const ctx = canvas.getContext('2d')

const board = new Board()

let scale

const clickHandler = gameClickHandler(board, canvas)
const getDelta = deltaClosure()

const s22 = board.pits[2].stones[3]
// Event Listeners

addEventListener('resize', size)
canvas.addEventListener('click', clickHandler)

addEventListener("keydown", () => console.log(s22))

// Main code
size()

mainLoop()

window.board = board

// Functions

function mainLoop () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update function
    
    update(board, getDelta())
    renderBoard(ctx, board, scale)

    requestAnimationFrame(mainLoop)
}

function size () {
    scale = getScale(canvas)
    scaleCanvas(canvas, scale)
}