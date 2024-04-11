import { BoardData } from "./boarddata.js";
import { Canvas } from "./canvas.js";
import { MancalaRenderer } from "./mancalarenderer.js";

const canvas = new Canvas(document.getElementById("game-canvas"))
const bData = new BoardData(canvas)
const mRend = new MancalaRenderer(canvas.ctx)

let scale = 1

function getCanvasSize () {
    if (innerWidth < 500 || innerHeight < 250) return {width: 500, height: 250}
    
    let width, height

    if ((innerWidth / 2) > innerHeight) {
        height = innerHeight
        width = height * 2
    } else {
        width = innerWidth
        height = width / 2
    }

    return {width, height}
}

function init () {
    let pit, stone, offset
    let stoneCounter = 0

    for (let i = 0; i < bData.pits.length; i++) {
        pit = bData.pits[i]

        if (pit.type === 'store') continue

        for (let j = 0; j < 4; j++) {
            stone = bData.stones[stoneCounter]
            offset = randomOffset()
            
            stone.x = pit.x + offset.x
            stone.y = pit.y + offset.y

            pit.stones.set(stone.id, stone)

            stoneCounter++
        }
    }

    mRend.drawBoard(bData)
    mRend.render(bData) 
}

function randomOffset () {
    let newOffset = {x: 99, y:99}
    let offsetLength;

    do {
        newOffset.x = (Math.random() * 60) - 30
        newOffset.y = (Math.random() * 60) - 30

        offsetLength = Math.sqrt(Math.pow(newOffset.x, 2) + Math.pow(newOffset.y, 2))
    } while (offsetLength > 30);

    return newOffset
}

function sizeGame () {
    canvas.size = getCanvasSize()
    scale = (canvas.width / 1000) > 0.5 ? (canvas.width / 1000) : 0.5

    mRend.scale = scale
}

// Main code starts here

sizeGame()

init()

addEventListener('resize', e => {
    sizeGame()

    mRend.clearCanvas(canvas)
    mRend.drawBoard(bData)
    mRend.render(bData)
})

canvas.element.addEventListener('click', e => {
    // Add ability to discern whether pit was clicked or not

    // Animation handling
})

window.bData = bData