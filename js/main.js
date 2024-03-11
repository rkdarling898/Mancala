import { BoardData } from "./boarddata.js";
import { Canvas } from "./canvas.js";
import { MancalaRenderer } from "./mancalarenderer.js";

const canvas = new Canvas(document.getElementById("game-canvas"))
const bData = new BoardData(canvas)
const mRend = new MancalaRenderer(canvas.ctx)

function getCanvasSize () {
    if (innerWidth >= 1000) return {width: 1000, height: 500}

    const width = innerWidth > 350 ? innerWidth : 350
    const height = width * 0.5

    return {width, height}
}

// Main code starts here

canvas.size = getCanvasSize()

mRend.render(bData)