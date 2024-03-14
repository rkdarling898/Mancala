import { BoardData } from "./boarddata.js";
import { Canvas } from "./canvas.js";
import { MancalaRenderer } from "./mancalarenderer.js";

const canvas = new Canvas(document.getElementById("game-canvas"))
const bData = new BoardData(canvas)
const mRend = new MancalaRenderer(canvas.ctx)

function getCanvasSize () {
    if (innerWidth < 500) return {width: 500, height: 250}
    
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

// Main code starts here

canvas.size = getCanvasSize()

mRend.scale = canvas.width/1000

mRend.render(bData)

window.bData = bData